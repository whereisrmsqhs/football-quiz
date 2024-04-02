import express, { Application, Request, Response } from "express";
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const db = require("./mysql.js");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const app: Application = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const port: string | number = process.env.PORT || 3001;

const corsOption = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const quizBlock = [
  {
    id: 1,
    title: "축잘알 퀴즈1",
    brief_explain: "클럽 경력보고 선수 맞추기",
    thumbnail: "assets/default.jpg",
  },
  {
    id: 2,
    title: "축잘알 퀴즈2",
    brief_explain: "포메이션보고 팀맞추기",
    thumbnail: "assets/default.jpg",
  },
  {
    id: 3,
    title: "축잘알 퀴즈3",
    brief_explain: "랜덤 퀴즈!",
    thumbnail: "assets/default.jpg",
  },
];

const posts = [
  {
    id: 1,
    author: "관리자",
    title: "게시판1",
    time: "2024-03-27, 14:17",
  },
  {
    id: 2,
    author: "관리자",
    title: "게시판2",
    time: "2024-03-27, 14:23",
  },
];
app.get("/quiz", (req: Request, res: Response) => {
  db.query(
    `SELECT * from quiz_collection`,
    function (error: any, quiz_collection: any) {
      if (error) {
        throw error;
      }
      const quiz_list: {
        id: number;
        title: string;
        brief_explain: string;
        thumbnail: string;
      }[] = [];
      quiz_collection.map(
        (quiz: {
          pk: number;
          name: string;
          quiz_rule: string;
          thumbnail: string;
        }) => {
          quiz_list.push({
            id: quiz.pk,
            title: quiz.name,
            brief_explain: quiz.quiz_rule,
            thumbnail: quiz.thumbnail,
          });
        }
      );
      res.send(quiz_list);
    }
  );
});

app.get("/community", (req: Request, res: Response) => {
  res.send(posts);
});

app.get("/quiz/:quizId", (req: Request, res: Response) => {
  res.send("success");
});

app.post(
  "/quiz/post",
  upload.single("quiz_thumbnail"),
  (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.file);
    const post = req.body;
    const thumbnail = req.file;
    db.query(
      `SELECT * FROM quiz_collection`,
      function (error: any, quiz_collection: any) {
        console.log(quiz_collection);
      }
    );
    db.query(
      `INSERT INTO quiz_collection (name, type, thumbnail, quiz_rule, user_id) 
      VALUES (?, ?, ?, ?, ?);`,
      [post.quiz_title, post.quiz_type, thumbnail?.path, post.quiz_explain, 2],
      function (error: any, result: any) {
        if (error) {
          throw error;
        }
        const quiz_collection_id = result.insertId;
        const quiz_info = JSON.parse(post.quiz_info);
        console.log(quiz_collection_id);

        // 쿼리를 순차적으로 실행하고 모든 쿼리가 완료된 후에 응답을 보냄
        const promises = quiz_info.map((info: { team: any; answer: any }) => {
          return new Promise<void>((resolve, reject) => {
            db.query(
              `INSERT INTO type1 (club_array, answer, quiz_collection_pk) VALUES (?, ?, ?);`,
              [info.team, info.answer, quiz_collection_id],
              function (error: any, result: any) {
                if (error) {
                  reject(error);
                } else {
                  resolve();
                }
              }
            );
          });
        });

        Promise.all(promises)
          .then(() => {
            res.writeHead(302, { Location: `/quiz` });
            res.end();
          })
          .catch((error) => {
            console.error("Error executing queries:", error);
            res.status(500).send("Error executing queries");
          });
      }
    );
  }
);

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});

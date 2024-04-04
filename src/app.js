const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const db = require("./mysql.js");
const path = require("path");
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT || 3001;

const corsOption = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + "." + file.originalname.split(".")[1]);
    },
  }),
});

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

app.get("/quiz", (req, res) => {
  db.query(`SELECT * from quiz_collection`, function (error, quiz_collection) {
    if (error) {
      throw error;
    }
    const quiz_list = [];
    quiz_collection.map((quiz) => {
      quiz_list.push({
        id: quiz.pk,
        title: quiz.name,
        brief_explain: quiz.quiz_rule,
        thumbnail: quiz.thumbnail,
      });
    });
    res.send(quiz_list);
  });
});

app.get("/community", (req, res) => {
  res.send(posts);
});

app.get("/quiz/:quizId", (req, res) => {
  const quizId = req.params.quizId;
  db.query(
    `SELECT * FROM quiz_collection WHERE pk=?`,
    [quizId],
    function (error, result) {
      if (error) {
        throw error;
      }
      console.log(result);
      res.send(result.name);
    }
  );
});

app.post("/quiz/post", upload.single("quiz_thumbnail"), (req, res) => {
  const post = req.body;
  const thumbnail = req.file;
  console.log(thumbnail);
  db.query(
    `INSERT INTO quiz_collection (name, type, thumbnail, quiz_rule, user_id) 
      VALUES (?, ?, ?, ?, ?);`,
    [post.quiz_title, post.quiz_type, thumbnail?.path, post.quiz_explain, 2],
    function (error, result) {
      if (error) {
        throw error;
      }
      const quiz_collection_id = result.insertId;
      const quiz_info = JSON.parse(post.quiz_info);
      console.log(quiz_collection_id);

      // 쿼리를 순차적으로 실행하고 모든 쿼리가 완료된 후에 응답을 보냄
      const promises = quiz_info.map((info) => {
        return new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO type1 (club_array, answer, quiz_collection_pk) VALUES (?, ?, ?);`,
            [info.team, info.answer, quiz_collection_id],
            function (error, result) {
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
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});

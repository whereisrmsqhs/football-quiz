const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const db = require("./mysql.js");
const path = require("path");
const extractNames = require("./extract.js");
var session = require("express-session");
const { Strategy } = require("passport-local");
var FileStore = require("session-file-store")(session);
const app = express();

app.use(express.static("assets"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT || 3001;

const corsOption = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "asadlfkj!@#!@#dfgasdg",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log("serializeUser", user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.get("SELECT * FROM user WHERE id = ?", [id], function (err, user) {
    if (err) {
      return done(err);
    }
    return done(null, user[0]);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    function (username, password, done) {
      console.log("Localstorage", username, password);
      db.query(`SELECT * from user`, function (error, user) {
        if (error) {
          throw error;
        }
        if (username === user.login_id) {
          console.log(1);
          if (password === user.password) {
            console.log(2);
            return done(null, user[0]);
          } else {
            console.log(3);
            return done(null, false, {
              message: "Incorrect Password",
            });
          }
        } else {
          console.log(4);
          return done(null, false, {
            message: "Incorrect username",
          });
        }
      });
    }
  )
);

let all_info = [];

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
      db.query(
        `SELECT * FROM type1 WHERE quiz_collection_pk=?`,
        [quizId],
        function (error, result2) {
          if (error) {
            throw error;
          }
          const total_quiz = result2.length;
          result[0].total_quiz = total_quiz;

          res.send(JSON.stringify(result[0]));
        }
      );
    }
  );
});

app.post("/quiz/post", upload.single("quiz_thumbnail"), (req, res) => {
  const post = req.body;
  const thumbnail = req.file;
  console.log(thumbnail);
  db.query(
    `INSERT INTO quiz_collection (name, type, thumbnail, quiz_rule, user_id, difficulty, recommends) 
      VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [
      post.quiz_title,
      post.quiz_type,
      thumbnail?.path,
      post.quiz_explain,
      2,
      parseInt(post.difficulty),
      0,
    ],
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

app.get("/quiz/:quizId/solve/:order", (req, res) => {
  const quizId = req.params.quizId;
  const order = parseInt(req.params.order);

  if (order === 1) {
    db.query(
      `SELECT * FROM quiz_collection WHERE pk=?`,
      [quizId],
      function (error, result) {
        if (error) {
          throw error;
        }
        db.query(
          `SELECT * FROM type1 WHERE quiz_collection_pk=? ORDER BY RAND()`,
          [quizId],
          function (error, result2) {
            if (error) {
              throw error;
            }
            all_info = JSON.stringify(result2);
            const first_quiz = JSON.parse(all_info)[0];
            const second_quiz = JSON.parse(all_info)[1];

            const first_team = first_quiz.club_array.split(",");
            const second_team = second_quiz.club_array.split(",");

            const first_data = [
              {
                team: first_team,
                answer: first_quiz.answer,
              },
              {
                team: second_team,
                answer: second_quiz.answer,
              },
            ];
            console.log(first_data);
            res.send(first_data);
          }
        );
      }
    );
  } else {
    if (JSON.parse(all_info).length > order) {
      const all_info_list = JSON.parse(all_info)[order];
      const team_array = all_info_list.club_array.split(",");
      const next_quiz_data = [
        {
          team: team_array,
          answer: all_info_list.answer,
        },
      ];
      console.log(next_quiz_data);
      res.send(next_quiz_data);
    } else {
      console.log("last one");
      res.send("last quiz");
    }
  }
});

app.get("/playerList", (req, res) => {
  extractNames("output.json")
    .then((names) => {
      const responseName = JSON.stringify(names);
      res.send(responseName);
    })
    .catch((error) => console.error("Error: ", error));
});

app.get("/signup", (req, res) => {});

app.post("/signup_process", (req, res) => {});

app.get("/login", (req, res) => {});

app.post(
  "/login_process",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
  (req, res) => {
    res.send("login logic!");
  }
);

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});

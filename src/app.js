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
var shortid = require("shortid");
const app = express();

app.use(express.static("assets"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT || 3001;

const corsOption = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOption));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "asadlfkj!@#!@#dfgasdg",
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS를 사용하는 경우 true로 설정
      maxAge: 1000 * 60 * 60 * 24, // 쿠키 만료 시간 설정 (예: 1일)
    },
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
  console.log("deserializeUser", id);
  db.query("SELECT * FROM user WHERE id=?", [id], function (err, user) {
    if (err) {
      return done(err);
    }
    return done(null, user);
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
      db.query(
        `SELECT * from user WHERE login_id=?`,
        [username],
        function (error, user) {
          if (error) {
            throw error;
          }
          if (username === user[0].login_id) {
            console.log(1);
            if (password === user[0].password) {
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
        }
      );
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

// Date 객체를 MySQL DATETIME 형식으로 변환하는 함수
function formatDateToMySQL(datetime) {
  const year = datetime.getFullYear();
  const month = ("0" + (datetime.getMonth() + 1)).slice(-2);
  const day = ("0" + datetime.getDate()).slice(-2);
  const hours = ("0" + datetime.getHours()).slice(-2);
  const minutes = ("0" + datetime.getMinutes()).slice(-2);
  const seconds = ("0" + datetime.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 정적 파일을 서빙
app.use(express.static(path.join(__dirname, "build")));

// 루트 경로 처리
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  console.log(req.user);
});

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

app.post("/signup_process", (req, res) => {
  const info = req.body.state;

  const user_id = info.username;
  const id_check = info.id_check;
  const pwd1 = info.password;
  const pwd2 = info.password_check;
  const email = info.email;
  const nickname = info.nickname;
  const gender = info.gender;
  let birth = info.birth;
  const fan_team = info.fan_team;

  const regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{5,16}$/;
  const pwd_regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
  const email_regExp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const nickname_regExp = /^[가-힣a-zA-Z0-9/?]{1,16}$/;
  const birth_regExp =
    /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;

  if (!id_check) {
    res.send("아이디 중복 확인을 해주세요");
    return;
  }
  if (!regExp.test(user_id)) {
    res.send(
      "아이디: 5~16자의 영문 소문자, 숫자와 특수문자(._-)만 사용 가능합니다."
    );
    return;
  }
  if (!pwd_regExp.test(pwd1)) {
    res.send(
      "#영문과 숫자 조합의 8-20자의 비밀번호를 설정해주세요. 특수문자(!@#$%^&*)도 사용"
    );
    return;
  }
  if (pwd1 !== pwd2) {
    res.send("두 비밀번호가 다릅니다, 확인해주세요");
    return;
  }
  if (!email_regExp.test(email)) {
    res.send("잘못된 이메일 형식입니다.");
    return;
  }
  if (!nickname_regExp.test(nickname)) {
    res.send("닉네임의 최대 길이는 16글자입니다.");
    return;
  }
  if (!birth_regExp.test(birth)) {
    res.send("잘못된 생년월일 형식입니다.");
    return;
  }
  db.query(
    `SELECT kor_name FROM team WHERE kor_name=?`,
    [fan_team],
    function (error, result) {
      if (error) throw error;
      if (result.length === 0) {
        res.send("잘못된 팀정보");
        return;
      } else {
        const current_time = formatDateToMySQL(new Date());

        // 비번 암호화해야되요
        // 이메일 인증! 추후 mailgun 활용해보자!
        db.query(
          `INSERT INTO user (id, login_id, password, nickname, email, gender, birth, created_at, updated_at, fan_team, profile_image)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            shortid.generate(),
            user_id,
            pwd1,
            nickname,
            email,
            gender,
            birth,
            current_time,
            current_time,
            fan_team,
            "none",
          ],
          function (error, result) {
            if (error) throw error;
            console.log("성공?");
            res.send("회원가입 성공!");
            return;
          }
        );
      }
    }
  );
});

app.post("/check_user_id", (req, res) => {
  const user_id = req.body.user_id;

  db.query(
    `SELECT login_id FROM user WHERE login_id=?`,
    [user_id],
    function (error, result) {
      if (error) throw error;
      if (result.length > 0) {
        console.log("중복된 아이디");
        res.send({ msg: "중복된 아이디입니다." });
      } else {
        console.log("사용 가능한 아이디");
        res.send({ msg: "사용 가능한 아이디입니다." });
      }
    }
  );
});

app.post("/login", (req, res, next) => {
  console.log("뭐여");
  passport.authenticate(
    "local",
    {
      session: false,
    },
    (err, user, info) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.message);
      }
      return req.login(user, { session: true }, (loginErr) => {
        if (loginErr) return next(loginErr);

        const filteredUser = { ...user };
        console.log("지나감");
        delete filteredUser.password;
        return res.json(filteredUser);
      });
    }
  )(req, res, next);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});

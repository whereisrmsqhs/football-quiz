import express, { Application, Request, Response } from "express";
const cors = require("cors");

const app: Application = express();

const port: string | number = process.env.PORT || 3001;

const corsOption = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));

app.get("/toto", (req: Request, res: Response) => {
  res.send("Hello toto");
});

const quizBlock = [
  {
    id: 1,
    title: "축잘알 퀴즈1",
    brief_explain: "클럽 경력보고 선수 맞추기",
    thumbnail: "/",
  },
  {
    id: 2,
    title: "축잘알 퀴즈2",
    brief_explain: "포메이션보고 팀맞추기",
    thumbnail: "/",
  },
];
app.get("/quiz", (req: Request, res: Response) => {
  res.send(quizBlock);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});

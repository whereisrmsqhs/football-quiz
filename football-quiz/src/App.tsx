import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Quiz from "./routes/Quiz";
import Community from "./routes/Community";
import Contact from "./routes/Contact";
import QuizSolve from "./routes/QuizSolve";
import CreateQuiz from "./routes/CreateQuiz";
import EachSolve from "./routes/EachSolve";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/quiz/:quizId" element={<QuizSolve />}>
          <Route path="each/:order" element={<EachSolve />} />
        </Route>
        <Route path="/quiz/post" element={<CreateQuiz />}></Route>
        <Route path="/community" element={<Community />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

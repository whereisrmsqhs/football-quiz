"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors = require("cors");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
var corsOption = {
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOption));
app.get("/toto", function (req, res) {
    res.send("Hello toto");
});
var quizBlock = {
    id: 1,
    title: "Title",
    brief_explain: "설명",
    thumbnail: "/",
};
app.get("/quiz", function (req, res) {
    res.send(quizBlock);
});
app.listen(port, function () {
    console.log("App is listening on port ".concat(port, " !"));
});

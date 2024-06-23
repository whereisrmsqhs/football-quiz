import nodemailer from "nodemailer";

export const smtpTransport = nodemailer.createTransport({
  pool: true,
  maxConnection: 1,
  service: "naver",
});

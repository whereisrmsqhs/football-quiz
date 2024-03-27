import emailjs from "@emailjs/browser";
import { useEffect, useRef } from "react";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const currentForm = form.current;
    if (currentForm == null) return;
    emailjs
      .sendForm("service_b52twbf", "template_xlaoq7o", currentForm, {
        publicKey: "OP1lmxxgzSXqVtAGU",
      })
      .then(
        (result) => {
          alert("성공적으로 이메일이 전송되었습니다.");
        },
        (error) => {
          console.log(error.text);
          alert("이메일 전송 실패");
        }
      );
  };

  return (
    <div>
      <h1>퀴즈에 문제가 있나요? 연락주세요!</h1>
      <form ref={form} onSubmit={sendEmail}>
        <label>답변 받을 이메일</label>
        <input type="email" name="user_email" required />
        <label>문의 제목</label>
        <input type="text" name="ask_title" maxLength={20} required />
        <label>
          문의 내용
          <input
            name="ask_message"
            placeholder="제목을 입력해주세요."
            required
          />
        </label>
        <input type="submit" value="문의" />
      </form>
    </div>
  );
};

export default Contact;

const createElement = (domString) => {
  const $temp = document.createElement("template");
  $temp.innerHTML = domString;
  return $temp.content;
};

export const QuizMain = async () => {
  return createElement(`<h1>/QuizMain</h1>`);
};

export const Community = async () => {
  return createElement(`<h1>/Community</h1>`);
};

export const Contact = async () => {
  return createElement(`<h1>/Contact</h1>`);
};

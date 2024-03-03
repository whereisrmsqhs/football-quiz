import { QuizMain, Community, Contact } from "./components.js";

const $root = document.querySelector(".main");
const $navigation = document.querySelector(".navbar__menu");

const routes = [
  { path: "/quizMain", component: QuizMain },
  { path: "/community", component: Community },
  { path: "/contanct", component: Contact },
];

const render = async (path) => {
  const _path = path ?? window.location.pathname;

  try {
    const component =
      routes.find((route) => route.path === _path)?.component || NotFound;
    $root.replaceChildren(await component());
  } catch (err) {
    console.log(err);
  }
};

$navigation.addEventListener("click", (e) => {
  if (!e.target.matches("#navigation > li > a")) return;

  e.preventDefault();

  const path = e.target.getAttribute("href");
  if (window.location.pathname === path) return;

  window.history.pushState(null, null, path);
  render(path);
});

window.addEventListener("popstate", () => {
  console.log("[popstate]", window.location.pathname);
  render();
});

window.addEventListener("DOMContentLoaded", () => {
  render();
});

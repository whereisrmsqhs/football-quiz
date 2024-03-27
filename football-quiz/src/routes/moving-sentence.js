const movingItemContainer = document.querySelector(".main__moving-sentences");
const span = movingItemContainer.querySelectorAll("span");
const fontSize = span[0].style.fontSize;
let maxSpanWidth = 0;
let heightList = [];

function changeRandomNum(event) {
  const randomHeight = judgeHeight();
  event.target.style.top = `${randomHeight}vh`;
}

function judgeHeight() {
  let tempHeight = Math.random() * 50;
  if (heightList.length === 0) {
    heightList.push(tempHeight);
    return tempHeight;
  } else {
    const prevHeight = heightList[0];
    if (Math.abs(prevHeight - tempHeight) < fontSize) {
      tempHeight += fontSize;
    }
    heightList.pop();
    heightList.push(tempHeight);
    return tempHeight;
  }
}

span.forEach((item) => {
  if (item.offsetWidth > maxSpanWidth) {
    maxSpanWidth = item.offsetWidth;
  }
});

span.forEach((item) => {
  item.style.animationDelay = `${Math.random() * span.length * 4}s`;
  document.documentElement.style.setProperty(
    "--span-width",
    maxSpanWidth + "px"
  );

  let randomHeight = judgeHeight();
  item.style.top = `${randomHeight}vh`;
  item.addEventListener("animationiteration", changeRandomNum);
});

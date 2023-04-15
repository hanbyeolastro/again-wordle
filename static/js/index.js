const timerDiv = document.getElementById("timer");

let attempts = 0;
let index = 0;
let isExistLastWord = false;

let timer;
let 시작_시각;

function 타이머_시작() {
  시작_시각 = new Date().getTime();
  timer = setInterval(() => {
    const 현재_시각 = new Date().getTime();
    const 흐른_시간 = new Date(현재_시각 - 시작_시각);
    const 흐른_시간_분 = 흐른_시간.getMinutes();
    const 흐른_시간_초 = 흐른_시간.getSeconds();
    timerDiv.innerHTML = `시간: ${흐른_시간_분
      .toString()
      .padStart(2, "0")}:${흐른_시간_초.toString().padStart(2, "0")}`;
  }, 1000);
}

function 키보드_입력_시작() {
  const 타이머_종료 = () => clearInterval(timer);
  const 게임_종료 = () => {
    타이머_종료();
    window.removeEventListener("keydown", 키보드_입력_동작);
  };

  const 정답_확인 = async () => {
    const response = await fetch("/answer");
    const jsonRes = await response.json();
    const answer = jsonRes.answer;
    let thisWord = "";
    document
      .querySelectorAll(`.row-${attempts} .board-column`)
      .forEach((elem, i) => {
        const letter = elem.innerText.toLowerCase();
        thisWord += letter;
        if (letter === answer[i]) {
          elem.style.background = "#538d4e";
        } else if (answer.includes(letter)) {
          elem.style.background = "#b59f3b";
        }
      });

    if (thisWord === answer) 게임_종료();
  };

  const 다음_줄_변경 = () => {
    if (attempts === 5) return;
    index = 0;
    attempts++;
    isExistLastWord = false;
  };

  const 엔터키_처리 = async () => {
    if (index !== 4 || !isExistLastWord) return;
    await 정답_확인();
    다음_줄_변경();
  };

  const 알파벳_처리 = (str) => {
    const curBox = document.querySelector(
      `div[data-index="${attempts}${index}"`
    );
    curBox.innerText = str.toUpperCase();
    if (index === 4) isExistLastWord = true;
  };

  const 현재_위치_변경 = () => {
    if (index !== 4) index++;
  };

  const 백_키_처리 = () => {
    if (index === 4) isExistLastWord = false;
    index--;
    const curBox = document.querySelector(
      `div[data-index="${attempts}${index}"`
    );
    curBox.innerText = "";
  };

  const 키보드_입력_동작 = (e) => {
    if (e.key === "Enter") return 엔터키_처리();
    if (e.key === "Backspace") return 백_키_처리();
    else if (e.keyCode < 65 || e.keyCode > 90) return;
    else 알파벳_처리(e.key);

    현재_위치_변경();
  };

  window.addEventListener("keydown", 키보드_입력_동작);
}

function 게임_시작() {
  타이머_시작();
  키보드_입력_시작();
}

게임_시작();

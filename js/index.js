const timerDiv = document.getElementById("timer");

let 시작_시각;

function 타이머_시작() {
  시작_시각 = new Date().getTime();
  setInterval(() => {
    const 현재_시각 = new Date().getTime();
    const 흐른_시간 = new Date(현재_시각 - 시작_시각);
    const 흐른_시간_분 = 흐른_시간.getMinutes();
    const 흐른_시간_초 = 흐른_시간.getSeconds();
    timerDiv.innerHTML = `시간: ${흐른_시간_분
      .toString()
      .padStart(2, "0")}:${흐른_시간_초.toString().padStart(2, "0")}`;
  }, 1000);
}

function 게임_시작() {
  타이머_시작();
}

게임_시작();

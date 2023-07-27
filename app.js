document.addEventListener("DOMContentLoaded", () => {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.getElementById("alert");
  let isJumping = false;
  let isGameOver = false;
  let gravity = 0.9;

  function control(e) {
    if (e.keyCode === 32) {
      // space bar
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  }
  document.addEventListener("keyup", control);

  let position = 0;
  function jump() {
    let count = 0;
    let timerId = setInterval(() => {
      //move dowm
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(() => {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          position *= gravity;
          count--;
          dino.style.bottom = position + "px";
        }, 20);
      }
      //move up
      count++;
      position += 30;
      position *= gravity;
      dino.style.bottom = position + "px";
    }, 20);
  }

  function generateObstacles() {
    let randomTime = Math.random() * 4000;
    let obstablePosition = 1000;

    if (!isGameOver) {
      setTimeout(generateObstacles, randomTime);
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      grid.appendChild(obstacle);
      obstacle.style.left = obstablePosition + "px";

      let timerId = setInterval(() => {
        if (obstablePosition > 0 && obstablePosition < 60 && position < 60) {
          clearInterval(timerId);
          alert.innerHTML = "Game Over!";
          isGameOver = true;
          //remove all children
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }
        }
        obstablePosition -= 10;
        obstacle.style.left = obstablePosition + "px";
      }, 20);
    }
  }
  generateObstacles();
});

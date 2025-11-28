function rollDice() {
  var randomNumber1 = Math.floor(Math.random() * 6) + 1; // 1-6
  var randomNumber2 = Math.floor(Math.random() * 6) + 1;

  var img1 = document.querySelector('.img1');
  var img2 = document.querySelector('.img2');
  if (img1) img1.setAttribute('src', 'images/dice' + randomNumber1 + '.png');
  if (img2) img2.setAttribute('src', 'images/dice' + randomNumber2 + '.png');

  var title = document.querySelector('h1');
  if (title) {
    if (randomNumber1 === randomNumber2) {
      title.textContent = 'Draw!';
    } else if (randomNumber1 > randomNumber2) {
      title.textContent = '🚩 Player 1 Wins!';
    } else {
      title.textContent = 'Player 2 Wins! 🚩';
    }
  }
}

/* 注册点击事件：只有在用户点击按钮后才会执行 rollDice() */
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('refresh');
  if (btn) {
    btn.addEventListener('click', rollDice);
  }
});
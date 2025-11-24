var randomNumber1 = Math.floor((Math.random() * 6 +1));  //1-6
var randomNumber2 = Math.floor((Math.random() * 6 +1));

// pic on the left
document.querySelector('.img1').setAttribute('src',`images/dice${randomNumber1}.png`);
// pic on the right
document.querySelector('.img2').setAttribute('src',`images/dice${randomNumber2}.png`);

// change the title
if (randomNumber1 === randomNumber2){
    document.querySelector('h1').innerHTML = 'Draw!';
} else if (randomNumber1 > randomNumber2){
    document.querySelector('h1').innerHTML = '🚩Player 1 Wins!';
} else {
    document.querySelector('h1').innerHTML = 'Player 2 Wins! 🚩';
}
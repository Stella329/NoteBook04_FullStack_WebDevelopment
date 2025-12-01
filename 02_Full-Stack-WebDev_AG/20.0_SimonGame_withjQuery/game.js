var buttonColors = ['red', 'blue', 'yellow', 'green']
var gamePattern = []
var userChosedColor = []
var currentLevel = 0       // game level
var startOverFlag = true



function nextSequence() {

    console.log('nextSequence()启动')
    userChosedColor = [];   // 清零user click

    var randomNum = Math.floor(Math.random() * 4);       // 0-3

    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    // jQuery: add flash to the button with the same id as the randomChosenColour
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)

    // play sounds to the game pattern button
    soundPlay(randomChosenColor)

    // change h1 accroding to current game level
    $('h1').text('Level ' + currentLevel)
    currentLevel += 1

}


function soundPlay(color) {
    var audio = new Audio('./sounds/' + color + '.mp3');
    audio.play()
}

//添加press样式：add .pressed class inside the styles.css file to the button that gets clicked -> then reomove it after a 100 milliseconds
function animationPress(color) {
    $('#' + color).addClass('pressed');
    setTimeout(function () {
        $('#' + color).removeClass('pressed')
    }, 100)     // 100ms
}

//Game Over Background and H1
function gameOver() {
    $('body').addClass('game-over');
    setTimeout(function () {
        $('body').removeClass('game-over');
    }, 200);

    var audio = new Audio('./sounds/wrong.mp3')
    audio.play()
    
    $('h1').text('Game Over, Press Any Key to Restart')
}


// Restart: reset the values of level, gamePattern and started variables.
function restartGame() {
    currentLevel = 0;
    gamePattern = [];
    userChosedColor = [];
    startOverFlag = true;
}


function checkAnswer(currentLevel) {
    var inputTime = userChosedColor.length;
    if (userChosedColor[inputTime - 1] === gamePattern[inputTime - 1]) {
        if (inputTime !== currentLevel) {
            console.log('success');
        }
        else {      // 如果全部正确，执行nextSequence()
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else {
        gameOver();
        restartGame();
    }

    // // test
    // console.log(`currentLevel = ${currentLevel}`)
    // console.log(`gamePattern = ${gamePattern}`)
    // console.log(`userChosedColor = ${userChosedColor}`)
}




// Main: Record Game Start 
// NB1: auto-play is banned; need to bind with an user action
// NB2: $(document).on('keydown', ...) 是一个独立的监听器，它会在每次按键时触发回调函数。即使你在回调函数中修改了 flag 的值，监听器本身并不会被移除，因此它仍然会响应按键事件。

$(document).on('keydown', function () {
    // 首次按键时执行
    if (startOverFlag) {
        nextSequence();
        // $(document).off('keydown'); // 移除事件监听器(后续press不再触发) -->这里的功能由startGame flag代替了，因此不需要，否则需要重复触发添加监听事件。
    }
    startOverFlag = false
})


/* 后续执行：基于用户click触发；调试笔记：
1. 每次用户点击按钮时，事件监听器会触发回调函数，这相当于一次循环的迭代。
2. 游戏的逻辑是基于用户的操作触发的，而不是通过显式的 while 或 for 循环来实现。
3. $('.btn').on('click') 只被执行了一次：是在脚本加载时执行的，并且没有在其他地方重复调用。只要 $('.btn').on('click') 没有被多次调用，就不会出现重复绑定的问题。--NB 浏览器不会自动清除之前绑定的监听器，除非你显式地调用 off('click') 来移除它们。
--NB: 因此$('.btn').on('click', function ()只能写在body主体中（而非函数中），保证脚本加载时添加监听函数唯一执行一次并不会重复调用*/

// check which button got clicked by user; 添加本次至array（记录次数）; 并播放声音
$('.btn').on('click', function () {
    if (!startOverFlag) {
        var userClickedColorID = $(this).attr('id');      //i.e. "green"
        userChosedColor.push(userClickedColorID)
        soundPlay(userClickedColorID)
        animationPress(userClickedColorID)

        checkAnswer(currentLevel)
    }
})


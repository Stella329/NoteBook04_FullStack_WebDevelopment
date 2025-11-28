var itemNum = document.querySelectorAll('.drum').length;

// Click

for (var i = 0; i < itemNum; i++) {
    document.querySelectorAll('.drum')[i].addEventListener('click', function () {   //add listener to each button; return >>> <button class="a drum">a</button>
        playSound(this.innerHTML); 
        clickAnimation(this.innerHTML);
    })
}

// Keypress

document.addEventListener('keydown', function(event){
    playSound(event.key)
    clickAnimation(event.key)
})


// play sound function

function playSound(key){
    switch (key) {
            case 'w':
                var audio = new Audio('sounds/crash.mp3'); // create a new audio object
                audio.play();   // object.method()
                break;
            case 'a':
                var audio = new Audio('sounds/kick-bass.mp3');
                audio.play();
                break;
            case 's':
                var audio = new Audio('sounds/snare.mp3');
                audio.play();
                break;
            case 'd':
                var audio = new Audio('sounds/tom-1.mp3');
                audio.play();
                break;
            case 'j':
                var audio = new Audio('sounds/tom-2.mp3');
                audio.play();
                break;
            case 'k':
                var audio = new Audio('sounds/tom-3.mp3');
                audio.play();
                break;
            case 'l':
                var audio = new Audio('sounds/tom-4.mp3');
                audio.play();
                break;

            default: console.log(buttonLetter); // 查看谁触发了default
                break;
        }
}


// animation function

function clickAnimation(keyLetter){

    var activeButton = document.querySelector('.' + keyLetter);       // by class; return <button class="a drum">a</button>

    activeButton.classList.add('pressed');       // .pressed style in css
    setTimeout(function(){
        activeButton.classList.remove('pressed')
    }, 100)

}
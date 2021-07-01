const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#ff0a5c', '#ea01ff', '#ff0138', '#08ffca', 'ff00f2'];


let score = 0;
let time = 0;


startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});
timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }

});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();

    }
});


function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}
function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}
function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчет: <span class='primary'>${score}</span></h1>`;
}
function createRandomCircle() {
    const circle = document.createElement('div');

    const size = getRandowNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandowNumber(0, width - size);
    const y = getRandowNumber(0, height - size);
    circle.classList.add('circle');
    setColor(circle);
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    setColor(circle);
    board.append(circle);
    setColor(circle);
}
function getRandowNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
}
function setColor(element) {
    let color = getRandomColor();
    element.style.backgroundColor = color;
    return element
}
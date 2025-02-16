'use strict'
{

const player = document.querySelector('#player');

let playerX = window.innerWidth / 2 ;

const speed = 40 ;



document.addEventListener("keydown", (event) => {
if(event.key === "ArrowLeft"){
  playerX -= speed;
} else if (event.key === "ArrowRight"){
  playerX += speed;
}

const maxRight = window.innerWidth ;


if(playerX < 0){
  playerX = 0;
}
if(playerX > maxRight){
  playerX = maxRight;
}

player.style.left = playerX + "px";

});

const relord = document.querySelector('#reload');

const re1 = document.querySelector('#re1');
const re2 = document.querySelector('#re2');
const re3 = document.querySelector('#re3');
const re4 = document.querySelector('#re4');
const re5 = document.querySelector('#re5');
const re6 = document.querySelector('#re6');

let re = [re6, re5, re4, re3, re2, re1];

let index = 0;




let timeSet;
let time;
let endTime;
let intervalId;
const timer = document.createElement('div');
timer.id = "timer";



document.addEventListener('keydown' , (event) =>{


  if(event.key === " "){

    console.log("残りの弾:", re.length, "現在のインデックス:", index);
    if(index < re.length){
      re[index].remove();
      index ++;

    if(index === re.length){

    const re0 = document.createElement('div');
    re0.innerHTML = 'RELOAD...';
    re0.classList.add('re0');
    re0.style.fontSize = '24'+'px';
    document.body.appendChild(re0);
    // re[index].remove();

  timeSet = 5
  time = 5 * 1000;
  endTime = new Date().getTime() + time;
  timer.classList.add('timer');
  document.body.appendChild(timer);
  intervalId = setInterval(check, 100);
    return;
    }

    shootBullet();

    }



}}
);

function check(){
  let countdown = Math.ceil((endTime - new Date().getTime())/1000);
  timer.innerHTML = countdown;
  if(countdown <= 0){
   clearInterval(intervalId);
   timer.remove();
   const reloadConteiner = document.querySelector('#relord');
   reloadConteiner.innerHTML = "";

   re = [];

   for(let i = 6; i >= 1; i--){
    let newRe = document.createElement("div");
    newRe.classList.add('re');
    newRe.id = `re${i}`;
    reloadConteiner.appendChild(newRe);
    re.push(newRe);
   }
   const re0 = document.querySelector('.re0');
   if(re0) {
    re0.remove();
   };
   re = Array.from(document.querySelectorAll(".re"));
   index = 0;
  //  console.log("re 配列:", re);
  // console.log("reの中身:", re);
  }
}


function shootBullet(){
  const bullet = document.createElement("div");
  bullet.classList.add('bullet');

  const playerRect = player.getBoundingClientRect();
  bullet.style.left = (playerRect.left + playerRect.width / 2 - 2.5) + "px";
  bullet.style.top =(playerRect.top - 10) + "px";

  document.body.appendChild(bullet);

  let bulletInterval = setInterval(() => {
   let bulletTop = parseInt(bullet.style.top);
   bullet.style.top = (bulletTop - 5) + "px";

   if(bulletTop < 0){
    clearInterval(bulletInterval);
    bullet.remove("bullet");
   }
  },20);
}

function isHit(bullet, enemy) {
  const bulletRect = bullet.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();

  return (
  bulletRect.left < enemyRect.right &&
  bulletRect.right > enemyRect.left &&
  bulletRect.top < enemyRect.bottom &&
  bulletRect.bottom > enemyRect.top
  );
}

function bust(obj1, obj2){
  const Rect1 = obj1.getBoundingClientRect();
  const Rect2 = obj2.getBoundingClientRect();

  return (
  Rect1.left < Rect2.right &&
  Rect1.right > Rect2.left &&
  Rect1.top < Rect2.bottom &&
  Rect1.bottom > Rect2.top
  );
}


const score = document.querySelector('.addscore');

let addscore = 0;




function createEnemy() {
  if(isGameover) return;

  const enemy = document.createElement('div');
  enemy.classList.add('enemy');

  document.body.appendChild(enemy);

  let enemyX = Math.random() * (window.innerWidth - 40);
  enemy.style.left = enemyX + "px";
  enemy.style.top = "0px";


  let enemyInterval = setInterval(() => {
   let enemyTop = parseInt(enemy.style.top);
   enemy.style.top = (enemyTop + 5) + "px";


   document.querySelectorAll('.bullet').forEach( e =>{
    if(isHit(e, enemy)){
      e.remove();
      enemy.remove();
      clearInterval(enemyInterval);

      addscore += 1;
      score.textContent = `${addscore}`

    }
   });

   if(bust(player,enemy)){
    gameover();
    enemy.remove();

   }

   if(enemyTop > window.innerHeight){
    clearInterval(enemyInterval);
    enemy.remove();
   }
  },10);
}

setInterval(createEnemy, 400);

let isGameover = false;

function gameover() {
  isGameover = true;

  document.querySelectorAll('.enemy').forEach( enemy => enemy.remove());
  document.querySelectorAll('.bullet').forEach( bullet => bullet.remove());

  const gameoverScreen = document.createElement('div');
  gameoverScreen.id = 'game-over';
  gameoverScreen.innerHTML = "GAME OVER"
  document.body.appendChild(gameoverScreen);
  player.style.opacity = "0";


  document.addEventListener('keydown' , (event) =>{
    if(event.key === "s"){
      gameStart();
    }
  });
}

function gameStart(){
isGameover = false;
document.querySelector('#game-over').remove();
player.style.opacity = "1";


addscore = 0;
score.textContent = `${addscore}`;


};

//スマホ用ボタン

const leftBtn = document.querySelector('#leftBtn');
const rightBtn = document.querySelector('#rightBtn');
const shootBtn = document.querySelector('#shootBtn');

leftBtn.addEventListener('touchstart', () => {
playerX -= speed;
if (playerX < 0) playerX = 0;
    player.style.left = playerX + "px";

});

rightBtn.addEventListener('touchstart', () =>{
  playerX += speed;
    const maxRight = window.innerWidth - player.clientWidth;
    if (playerX > maxRight) playerX = maxRight;
    player.style.left = playerX + "px";
});

shootBtn.addEventListener('touchstart', () => {

  if(index < re.length){
    re[index].remove();
    index ++;

  if(index === re.length){

  const re0 = document.createElement('div');
  re0.innerHTML = 'RELOAD...';
  re0.classList.add('re0');
  re0.style.fontSize = '24'+'px';
  document.body.appendChild(re0);
  // re[index].remove();

timeSet = 5
time = 5 * 1000;
endTime = new Date().getTime() + time;
timer.classList.add('timer');
document.body.appendChild(timer);
intervalId = setInterval(check, 100);
  return;
  }
  shootBullet();
}
});

document.addEventListener("touchstart", function(event) {
  if (event.touches.length > 1) {  // ✅ 2本指以上のタップを検出！
      event.preventDefault();  // ✅ デフォルトのズーム動作を防ぐ！
  }
}, { passive: false });

document.addEventListener("dblclick", function(event) {
  event.preventDefault();  // ✅ ダブルクリックによる拡大を防ぐ！
});
}

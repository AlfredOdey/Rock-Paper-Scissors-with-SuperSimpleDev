let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
  };
  
  document.querySelector(".rock-move-button").addEventListener('click', ()=>{playGame('Rock');});
  document.querySelector(".paper-move-button").addEventListener('click', ()=>{playGame('Paper');});
  document.querySelector(".scissors-move-button").addEventListener('click', ()=>{playGame('Scissors');});

  //document.querySelector('.resetbutton').addEventListener('keydown', (event)=>{console.log(event.key)})

  document.body.addEventListener('keydown',(event)=>{if (event.key === 'r') {
    playGame('Rock');
  }else if(event.key === 'p'){
    playGame('Paper');
  } else if (event.key === 's'){
    playGame('Scissors');
  } else if(event.key === ' ') {
    autoPlay();
  } else if(event.key === ' ') {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.autoplay').innerHTML = 'Auto Play';
  }else if(event.key === 'Backspace'){
    resetScore();
  }
  else {
    console.log(event.key);
  }
  ;});
  updateScoreElement();
  updateGamesPlayed();
  
  function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  updateGamesPlayed();
  }
  
  let isAutoPlaying = false;
  let intervalId;

  function autoPlay(){

    if (!isAutoPlaying) {
      intervalId = setInterval(()=>{
        const playerMove = pickComputerMove();
        playGame(playerMove);
   
        document.querySelector('.autoplay').innerHTML = 'Stop Playing';
       },1000);
       isAutoPlaying = true;
    }
    else{
      clearInterval(intervalId);
      isAutoPlaying = false;
      document.querySelector('.autoplay').innerHTML = 'Auto Play';
    }
    
    
   }

  function playGame(playerMove){
  const computerMove = pickComputerMove();
  // If playerMove is Scissors
  if(playerMove === 'Scissors'){
  if(computerMove === 'Rock'){result = 'You lose!';}else if(computerMove === 'Paper'){result = 'You win!';}else if(computerMove === 'Scissors'){result = 'Tie!';}
  }
  // If playerMove is Rock
  else if(playerMove === 'Rock'){
  if(computerMove === 'Rock'){result = 'Tie!';}else if(computerMove === 'Paper'){result = 'You lose!';}else if(computerMove === 'Scissors'){result = 'You win!';}
  }
  // If playerMove is Paper
  else if(playerMove === 'Paper'){
  if(computerMove === 'Rock'){result = 'You win!';}else if(computerMove === 'Paper'){result = 'Tie!';}else if(computerMove === 'Scissors'){result = 'You lose!';}
  }
  
  //Score update
  if (result === 'You win!'){
  score.wins += 1;
  
  document.getElementById("progressUpdate").style.color = 'green';
  }
  else if(result === 'You lose!'){
  score.losses += 1;
  
  document.getElementById("progressUpdate").style.color = 'orangered';
  }
  else if(result === 'Tie!'){
  score.ties += 1;
  
  document.getElementById("progressUpdate").style.color = 'cornflowerblue';
  }
  
  localStorage.setItem('score', JSON.stringify(score));
  
  updateScoreElement();
  updateGamesPlayed();
  
  document.getElementById("movesDisplay").innerHTML = `You
    <img class="move-icon" src="icons/${playerMove}-emoji.png" alt="">
    <img class="move-icon" src="icons/${computerMove}-emoji.png" alt="">
    Computer`;
  document.getElementById("progressUpdate").innerHTML = `${result}`;
  }
  
  function updateScoreElement(){
  document.getElementById("scoreUpdate").innerHTML = `<span id="wins">Wins: ${score.wins}</span><br>
  <span id="losses">Losses: ${score.losses}</span><br>
  <span id="ties">Ties: ${score.ties}</span>`;
  }
  
  function updateGamesPlayed(){
  document.getElementById("gamesPlayed").innerHTML = `Games played: ${score.wins + score.losses + score.ties}`;
  document.getElementById("gamesPlayed").style.color = 'violet';
  }
  
  function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove;
  if(randomNumber >= 0 && randomNumber < 1/3){computerMove = 'Rock';
  }else if(randomNumber >= 1/3 && randomNumber < 2/3){computerMove = 'Paper';
  }else if (randomNumber >= 2/3 && randomNumber < 1){computerMove = 'Scissors';
  }
  return computerMove;
   }
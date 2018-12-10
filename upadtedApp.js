/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer, isPlaying, finalScore;

gamePlay();

var previousRoll;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(isPlaying) {
        var dice1 = Math.floor( Math.random() * 6 ) + 1;
        var dice2 = Math.floor( Math.random() * 6 ) + 1;
        var diceControl1 = document.getElementById('dice-1');
        diceControl1.style.display = 'block';
        diceControl1.src = 'dice-' + dice1 + '.png';
        
        var diceControl2 = document.getElementById('dice-2');
        diceControl2.style.display = 'block';
        diceControl2.src = 'dice-' + dice2 + '.png';
        
        if(dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            changeTurn();        
        }
        
        /*
        if(dice === 6 && previousRoll ===6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            changeTurn();
        } else if(dice != 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            previousRoll = dice;
        } else {
            changeTurn();        
        } 
        */
    } 
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(isPlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        var finalScore = document.querySelector('.final-score').value;
        if(finalScore) {
            var winningScore = finalScore;
        } else {
            var winningScore = 100;
        }
        
        if(scores[activePlayer] >= winningScore) {
            isPlaying = false;
            
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            changeTurn();
        }
    }
});

function changeTurn() {
    roundScore = 0;
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('#current-' + activePlayer).textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}


document.querySelector('.btn-new').addEventListener('click', gamePlay);


function gamePlay() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    isPlaying = true;
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

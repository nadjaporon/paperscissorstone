'use strict'

// Scramble Async Function
function scramble(icons) {
    return new Promise((resolve) => {
        const compIcon = document.querySelector(".comp p:first-child");

        icons.forEach((element, i) => {
            setTimeout(
                function () {
                    compIcon.innerHTML = element[1];
                }, i * 200);
        });
        setTimeout(resolve, 500);

    });
}


const init = (() => {

    const playType = [
        "Schere",   // Hase             // Schere
        "Stein",    // Schiessgewehr    // Stein
        "Papier"    // Karotte          // Papier
    ]

    const pIcons = [
        [playType[0], '<i class="fas fa-hand-scissors" id="scissors"></i>'],
        [playType[1], '<i class="fas fa-hand-rock" id="stone"></i>'],
        [playType[2], '<i class="fas fa-hand-paper" id ="paper"></i>']
    ]


    let playerPoints = 0;
    let compPoints = 0;

    // QUERY SELECTORS
    const play = document.querySelector(".icons p:first-child");        // Start Game Icon
    const icons = document.querySelector(".icons p:last-child");        // Players Icons
    const compIcon = document.querySelector(".comp p:first-child");     // Computer Icon Pick

    const playerResult = document.querySelector("#playerResult");   // Punktestand Player
    const compResult = document.querySelector("#compResult");       // Punktestand Computer

    const gameResult = document.querySelector("#gameResult p");   // Zwischenergebnis
    const endResult = document.querySelector(".result p");      // Endergebnis

    const score = document.querySelector(".score");             // Div Player Comp

    const restart = document.querySelector("p.restart");        // restart Game


    compIcon.style.display = 'none';
    icons.style.display = 'none';
    score.style.display = 'none';
    restart.style.display = 'none';


    // Reset Function
    function reset() {
        playerPoints = 0;
        compPoints = 0;

        playerResult.textContent = playerPoints;
        compResult.textContent = compPoints;

        compIcon.style.display = 'none';
        icons.style.display = 'none';
        score.style.display = 'none';
        gameResult.style.display = 'none';
        restart.style.display = 'none';
        play.style.display = 'block';

        icons.innerHTML = '';

        for (let i = 0; i < pIcons.length; i++) {    // show Player Icons 

            icons.innerHTML += pIcons[i][1];
        }

        addClasses('playerResult', 'black', 'black');
        compIcon.innerHTML = '<i class="fas fa-laptop" id="compSelect"></i>';
    }

    // Game Start -> Show Play Icons
    play.addEventListener("click", () => {

        reset();

        play.style.display = 'none';
        icons.style.display = 'block';
        compIcon.style.display = 'block';
        endResult.style.display = 'none';
        score.style.display = 'flex';

        const scissors = document.querySelector("#scissors");
        const paper = document.querySelector("#paper");
        const stone = document.querySelector("#stone");

        async function wait(playType) {         // Funktion game wartet bis scramble beendet ist.
            await scramble(pIcons);
            game(playType);
        }

        scissors.addEventListener("click", () => {    // Player took "Scissors"
            scissors.classList.add("selected");
            stone.classList.remove("selected");
            paper.classList.remove("selected");

            wait(playType[0]);
            restart.style.display = 'block';
        });


        stone.addEventListener("click", () => {       // Player took "Stone"
            stone.classList.add("selected");
            scissors.classList.remove("selected");
            paper.classList.remove("selected");

            wait(playType[1]);
            restart.style.display = 'block';

        });

        paper.addEventListener("click", () => {       // Player took "Paper"
            paper.classList.add("selected");
            scissors.classList.remove("selected");
            stone.classList.remove("selected");

            wait(playType[2]);
            restart.style.display = 'block';
        });
        
        restart.addEventListener("click", () => {       // click Restart
            reset();
        });

    });


    // Comp Move
    function computerPlay() {
        let zufallszahl = Math.floor(Math.random() * 3 + 1);

        if (zufallszahl == 1) return playType[0];        // Comp took Scissors
        if (zufallszahl == 2) return playType[1];         // Comp took Stone
        if (zufallszahl == 3) return playType[2];        // Comp took Paper
    }

    function result(r, comp, player) {              // Game Result
        let win = "Du gewinnst! ";
        let loose = "Du verlierst! ";

        if (r == 0) return loose + comp + " schlägt " + player;
        if (r == 1) return win + player + " schlägt " + comp;
        if (r == 2) return "Gleichstand: " + player + " gegen " + comp;

    }

    // what wins over
    const combinations = {
        Stein: playType[0],
        Papier: playType[1],
        Schere: playType[2]
    };

    function playRound(player, comp) {
        let ausgabetext = "";
        let r = 0;

        if (combinations[player] === comp) {    // Player wins
            r = 1;
            addClasses("gameResult", "green");
        } else if (player == comp) {            // Draw
            r = 2;
            addClasses("gameResult", "black");
        } else {                            // Computer wins
            addClasses("gameResult", "red");
        }

        for (let i = 0; i < pIcons.length; i++) {   // Computer Icon
            if (comp == pIcons[i][0]) {
                compIcon.innerHTML = pIcons[i][1];
            }
        }

        if (r <= 3) {
            ausgabetext = result(r, comp, player);
            gameResult.innerHTML = ausgabetext;
            gameResult.style.display = 'block';
        }

        return r;
    }


    function addClasses(cName, color1, color2) {

        if (cName == 'playerResult') {
            playerResult.className = '';
            playerResult.classList.add(color1);
            compResult.className = '';
            compResult.classList.add(color2);
        }
        if (cName == 'gameResult') {
            gameResult.className = '';
            gameResult.classList.add(color1);
        }
    }




    function game(player) {
        let ergebnis = "";

        const playerSelection = player;
        const compSelection = computerPlay();

        ergebnis = playRound(playerSelection, compSelection);

        if (ergebnis === 0) compPoints += 1;
        if (ergebnis === 1) playerPoints += 1;

        if (playerPoints === compPoints) addClasses('playerResult', 'black', 'black'); // Code in Funktion ausgelagert, da einfacher verwlatbar. Falls noch andere styles dazu oder weg kommen.
        if (playerPoints < compPoints) addClasses('playerResult', 'red', 'green');
        if (playerPoints > compPoints) addClasses('playerResult', 'green', 'red');

        playerResult.innerText = playerPoints;
        compResult.innerText = compPoints;

        if (playerPoints >= 5 || compPoints >= 5) {
            if (playerPoints > compPoints) {
                endResult.classList.remove();
                endResult.classList.add("win");
                ergebnis = '<i class="fas fa-trophy yellow"></i><br>Du hast gewonnen!!!';
            } else {
                endResult.classList.remove();
                endResult.classList.add("loose");
                ergebnis = 'Leider verloren!';
            }
            endResult.innerHTML = ergebnis;

            compIcon.style.display = 'none';
            gameResult.style.display = 'none';
            icons.style.display = 'none';
            play.style.display = 'block';
            endResult.style.display = 'block';

        }
        return ergebnis;
    }
})();

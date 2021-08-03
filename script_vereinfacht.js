'use strict'


// Funktion zu einer Immediately Invoked Function Expression (IIFE) gändert
const init = (() => {

    const schere = "Schere";  // Hase
    const stein = "Stein";  // Schiessgewehr
    const papier = "Papier";   //KArotte

    let playerPoints = 0;
    let compPoints = 0;

    const play = document.querySelector("#startGame");
    const icons = document.querySelector(".icons p");
    const compIcon = document.querySelector(".comp p");

    const playerResult = document.querySelector("#playerResult");
    const compResult = document.querySelector("#compResult");

    const gameResult = document.querySelector("#gameResult");
    const endResult = document.querySelector(".result p");

    // Play Icons
    let playIcons = [
        '<i class="fas fa-hand-scissors" id="scissors"></i>',
        '<i class="fas fa-hand-rock" id="stone"></i>',
        '<i class="fas fa-hand-paper" id ="paper"></i>'
    ];


    // Game Start
    play.addEventListener("click", function () {
        icons.removeChild(play);

        for (let i = 0; i < playIcons.length; i++) {    // show Player Icons

            icons.innerHTML += playIcons[i];
        }

        const scissors = document.querySelector("#scissors");
        const paper = document.querySelector("#paper");
        const stone = document.querySelector("#stone");
        //const compSelection = computerPlay(); wird hier nicht benötigt

        scissors.addEventListener("click", function () {    // Player took "Scissors"
            scissors.classList.add("selected");
            stone.classList.remove("selected");
            paper.classList.remove("selected");
            game(schere);
        });

        stone.addEventListener("click", function () {       // Player took "Stone"
            stone.classList.add("selected");
            scissors.classList.remove("selected");
            paper.classList.remove("selected");
            game(stein);
        });
        paper.addEventListener("click", function () {       // Player took "Paper"
            paper.classList.add("selected");
            scissors.classList.remove("selected");
            stone.classList.remove("selected");
            game(papier);
        });
    });


    function computerPlay() {
        let zufallszahl = Math.floor(Math.random() * 3 + 1);
        if (zufallszahl == 1) return schere;        // Comp took Scissors
        if (zufallszahl == 2) return stein;         // Comp took Stone
        if (zufallszahl == 3) return papier;        // Comp took Paper
    }

    function result(r, comp, player) {              // Game Result
        let win = "Du gewinnst! ";
        let loose = "Du verlierst! ";

        if (r == 1) return loose + comp + " schlägt " + player;
        if (r == 2) return win + player + " schlägt " + comp;
        if (r == 0) return "Gleichstand: " + player + " gegen " + comp;
    }

    function playRound(player, comp) {
        let ausgabetext = "";
        let r = 0;
        if (comp === "Stein") {
            if (player === "Stein") {
                r = 0 //unentschieden
                compIcon.innerHTML = playIcons[1]
            }
            if (player === "Schere") {
                r = 1 //Computer Gewinnt
                compIcon.innerHTML = playIcons[1]
            }
            if (player === "Papier") {
                r = 2 //Spieler Gewinnt
                compIcon.innerHTML = playIcons[1]
            }
        }
        if (comp === "Schere") {
            if (player === "Schere") {
                r = 0 //unentschieden
                compIcon.innerHTML = playIcons[0]
            }
            if (player === "Papier") {
                r = 1 //Computer Gewinnt
                compIcon.innerHTML = playIcons[0]
            }
            if (player === "Stein") {
                r = 2 //Spieler Gewinnt
                compIcon.innerHTML = playIcons[0]
            }
        }
        if (comp === "Papier") {
            if (player === "Papier") {
                r = 0 //unentschieden
                compIcon.innerHTML = playIcons[2]
            }
            if (player === "Stein") {
                r = 1 //Computer Gewinnt
                compIcon.innerHTML = playIcons[2]
            }
            if (player === "Schere") {
                r = 2 //Spieler Gewinnt
                compIcon.innerHTML = playIcons[2]
            }
        }
        ausgabetext = result(r, comp, player);
        gameResult.innerHTML = ausgabetext;
        console.log(ausgabetext);
        return r;
        /*
        if (player == "abbruch") {
            r = 3;
        } else if (player == comp) {
            if (player == schere) {
                compIcon.innerHTML = playIcons[0];  // Schere
            }
            if (player == stein) {
                compIcon.innerHTML = playIcons[1];  // Stein
            }
            if (player == papier) {
                compIcon.innerHTML = playIcons[2];  // Papier
            }
            r = 2;
        } else if (player == schere) {
            if (comp == papier) {
                compIcon.innerHTML = playIcons[2]; // Papier
                r = 1;
            } else {
                compIcon.innerHTML = playIcons[1]; // Stein
            }
        } else if (player == stein) {
            if (comp == schere) {
                compIcon.innerHTML = playIcons[0];  // Schere
                r = 1;
            } else {
                compIcon.innerHTML = playIcons[2]; // Papier
            }
        } else if (player == papier) {
            if (comp == stein) {
                compIcon.innerHTML = playIcons[1];  // Stein
                r = 1;
            } else {
                compIcon.innerHTML = playIcons[0];  // Schere
            }
        } else if (player == undefined) {
            r = 4;
        }
        if (r <= 3) {
            ausgabetext = result(r, comp, player);
            gameResult.innerHTML = ausgabetext;
            console.log(ausgabetext);
        }
        return r;
        */
    }

    /*Scramble
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function scramble() {
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                await sleep(150);
                compIcon.innerHTML = playIcons[i];
            }
        }
    }
    */
    function addClasses(color1, color2) {
        playerResult.className = '';
        playerResult.classList.add(color1);
        compResult.className = '';
        compResult.classList.add(color2);
    }

    function game(player) {
        let ergebnis = "";
        //scramble();
        const playerSelection = player;
        const compSelection = computerPlay();
        ergebnis = playRound(playerSelection, compSelection);
        /*if (ergebnis == 3) { >>>> Spiel kann nicht abgebrochen werden!
            playerPoints = 0; // Punktestand zurücksetzen
            compPoints = 0;

            ergebnis = "Spiel abgebrochen!";
            return ergebnis;
        }
        if (ergebnis == 4) { >>>> Kann auch nix falsches eingegeben werden, Klicks sind vorgegeben
            ergebnis = "Keine richtige Eingabe";
            console.log(ergebnis);
        }

        if (ergebnis == 0) {
            compPoints++;
        } else if (ergebnis == 1) {
            playerPoints++;
        }
        */

        if (ergebnis === 1) compPoints += 1; // obere If vereinfacht
        if (ergebnis === 2) playerPoints += 1;
        console.log("Player - Comp ", playerPoints, " - ", compPoints);

        if (playerPoints === compPoints) addClasses('black', 'black'); // Code in Funktion ausgelagert, da einfacher verwlatbar. Falls noch andere styles dazu oder weg kommen.
        if (playerPoints < compPoints) addClasses('red', 'green');
        if (playerPoints > compPoints) addClasses('green', 'red');

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
            compIcon.remove();
            gameResult.remove();

            playerPoints = 0; // Punktestand zurücksetzen
            compPoints = 0;

            console.log(ergebnis);
            endResult.innerHTML = ergebnis;
            icons.innerHTML = '<i class="fas fa-play" id="startGame"> Start Game</i>';
        }
        return ergebnis;
    }
})();


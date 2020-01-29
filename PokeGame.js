var pokedex;
var introFlag = true;
var pokemon, oldChosenPokemon, cpuId;
var attackingMoves, defensiveMoves;
var tempDocomunt;
function init() {
    initAttackingMoves();
    initDefensiveMoves();
    var request = new XMLHttpRequest();
    request.open('GET', 'pokedex.js', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            pokedex = JSON.parse(request.responseText);
            setPokedex(pokedex);
            fillPokedex(); 
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
    };
    request.send();
}

function playIntro() {
	if (introFlag) {
		document.getElementById('injectAudio').innerHTML += '<audio id="player" autoplay loop muted><source src="music/intro.mp3" type="audio/mp3" /></audio>';
		setTimeout(() => {
        document.getElementById("player").volume = 0.15;
        document.getElementById("player").play();
		introFlag = false;
        setTimeout(() => document.getElementById("player").muted = false, 200);
		}
        , 1000);
	}
    
}
    
function initAttackingMoves() {
    var request = new XMLHttpRequest();
    request.open('GET', 'attackingMoves.js', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            attackingMoves = JSON.parse(request.responseText);
            setAttackingMoves(attackingMoves);
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
    };
    request.send();
}

function initDefensiveMoves() {
    var request = new XMLHttpRequest();
    request.open('GET', 'defensiveMoves.js', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            defensiveMoves = JSON.parse(request.responseText);
            setDefensiveMoves(defensiveMoves);
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
    };
    request.send();
}

function generateAttack() {
    
}

function setPokedex(pokedex) {
    window.pokedex = pokedex;
}

function setDefensiveMoves(defensiveMoves) {
    window.defensiveMoves = defensiveMoves;
}

function setAttackingMoves(attackingMoves) {
    window.attackingMoves = attackingMoves;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function fillPokedex() {
    document.getElementById("pokedex-view").innerHTML = "";
    var parsedJSON = JSON.parse(localStorage.getItem("pokedex"));
    for (var i = 0; i < parsedJSON.length; i++) {
        document.getElementById("pokedex-view").innerHTML += '<img id="' + parsedJSON[i].id + '" onclick="selectPokemon(this.id)" class="sprite" src="sprites/' + getImg(parsedJSON[i]) + '" />';
        if (parsedJSON[i].id === pokemon) {
            document.getElementById(parsedJSON[i].name.english).style.border = "3px solid blue";
        }
    }
}


function catchPokemon(fromBattle = false) {
    existsFlag = false;
    newJSON = JSON.parse(localStorage.getItem("pokedex"));
    if (fromBattle) {
        for (var i = 0; i < newJSON.length; i++) {
            if (newJSON[i].name.english == pokedex[cpuId].name.english) {
                existsFlag = true;
                break;
            }
        }
        !existsFlag && newJSON.push(pokedex[cpuId]);
        localStorage.setItem("pokedex", JSON.stringify(newJSON));
        return;
    }
    document.getElementById("catchpokemon").src = "images/pokethrow.gif";
    randomNum = getRandomInt(0, 150);
    newJSON = JSON.parse(localStorage.getItem("pokedex"));
    for (var i = 0; i < newJSON.length; i++) {
        if (newJSON[i].name.english == pokedex[randomNum].name.english) {
            existsFlag = true;
            break;
        }
    }
    !existsFlag && newJSON.push(pokedex[randomNum]);
    localStorage.setItem("pokedex", JSON.stringify(newJSON));
    setTimeout(
        () => {
            document.getElementById("catchpokemon").src = "images/" + pokedex[randomNum].name.english + ".jpg";
            document.getElementById("pokeinfo").innerHTML = pokedex[randomNum].name.english;
        }
        , 2300);
    setTimeout(
        () => {
        document.getElementById("catchpokemon").src = "images/pokeball.png";
        document.getElementById("pokeinfo").innerHTML = "";
        fillPokedex();
        }
        , 7000);
}
function changeBackground(background) {
    document.body.style.background = background;
}

function selectPokemon(id) {
    if (id === pokemon) {
        document.getElementById(id).style.backgroundColor = "";
        pokemon = undefined;
        localStorage.removeItem('chosenPokemon');
        return;
    }
    if (pokemon !== undefined) {
        document.getElementById(oldChosenPokemon).style.backgroundColor = "";
    }
    pokemon = id;
    oldChosenPokemon = id;
    localStorage['chosenPokemon'] = id;
    imgTag = document.getElementById(id);
    imgTag.style.backgroundColor = 'blue';
    
}
var AttackImg; function startFightMode() {
    if (pokemon === undefined) {
        alert('Please choose a pokemon');
    } else {
        var gameHTML = "";
        gameHTML += '<audio id="player" autoplay loop muted><source src="music/battle.mp3" type="audio/mp3" /></audio>';
        gameHTML += '<div id=\"main-container\" class=\"bullseye box-shadow-1 border-radius\">';
        gameHTML += '			<div id=\"top-screen\">';
        gameHTML += '				<img id=\"charmander-img\"src=\"img\/charmander.png\" class=\"absolute\" style=\"height: 115px; top:121px; left:40px;\"\/>';
        gameHTML += "				<div id=\"user-name\" class=\"absolute\"><\/div>";
        gameHTML += "				<div id=\"user-lvl\" class=\"absolute\"><\/div>";
        gameHTML += "				<div class=\"absolute\" style=\"width: 71px; top: 216px; left: 277px;\">";
        gameHTML += "					<div id=\"user-health-bar\" class=\"absolute\"><\/div>";
        gameHTML += "				<\/div>";
        gameHTML += "				<img src=\"img\/your_info.png\" class=\"absolute\" style=\"height: 45px; top: 187px; right: 10px;\"\/>";
        gameHTML += "				";
        gameHTML += "				<img id=\"attack-img\" src=\"img\/" + pokedex[pokemon - 1].type[0] + ".png\" class=\"absolute hide\"\/> ";
        gameHTML += "				<img id=\"pikachu-img\" src=\"img\/pikachu.png\" class=\"absolute\" style=\"height:115px; top:40px; right:46px;\"\/>";
        gameHTML += "				<div id=\"cpu-name\" class=\"absolute\"><\/div>";
        gameHTML += "				<div id=\"cpu-lvl\" class=\"absolute\"><\/div>";
        gameHTML += "				<div class=\"absolute\" style=\"width: 71px; top: 39px; left: 72px;\">";
        gameHTML += "					<div id=\"cpu-health-bar\" class=\"absolute\"><\/div>";
        gameHTML += "				<\/div>";
        gameHTML += "				<img src=\"img\/enemy_info.png\" class=\"absolute\" style=\"height: 45px; top: 10px; left: 10px;\"\/>";
        gameHTML += "";
        gameHTML += "				<div id=\"chat-text\" class=\"absolute text-subhead\"> <\/div>";
        gameHTML += "				<img src=\"img\/grass1.png\" class=\"img-spacing\" style=\"width: 400px\"\/>";
        gameHTML += "				<img src=\"img\/chat_window.png\" class=\"img-spacing\" style= \"width:400px\"\/>";
        gameHTML += "			<\/div>";
        gameHTML += "			<div id=\"bottom-screen\">";
        gameHTML += "				<div id =\"user-buttons\" class=\"hide\">";
        gameHTML += "					<div id=\"move1-button\" value = \"0\">";
        gameHTML += "						<div id=\"move1-text\" class =\"pointer absolute text-18 text-center\"><\/div>";
        gameHTML += "						<img src=\"img\/move.png\" class=\"absolute\" style=\"height:75px; bottom: 170px; left: 20px;\"\/>";
        gameHTML += "					<\/div>";
        gameHTML += "					<div id=\"move2-button\" value = \"1\">";
        gameHTML += "						<div id=\"move2-text\" class =\"pointer absolute text-18 text-center\"><\/div>";
        gameHTML += "						<img src=\"img\/move.png\" class=\"absolute\" style=\"height:75px; bottom: 170px; right: 20px;\"\/>";
        gameHTML += "					<\/div>";
        gameHTML += "					<div id=\"move3-button\" value = \"2\">";
        gameHTML += "						<div id=\"move3-text\" class =\"pointer absolute text-18 text-center\"><\/div>";
        gameHTML += "						<img src=\"img\/move.png\" class=\"absolute\" style=\"height:75px; bottom: 75px; left: 20px;\"\/>";
        gameHTML += "					<\/div>";
        gameHTML += "					<div id=\"move4-button\" value = \"3\">";
        gameHTML += "						<div id=\"move4-text\" class =\"pointer absolute text-18 text-center\"><\/div>";
        gameHTML += "						<img src=\"img\/move.png\" class=\"absolute\" style=\"height:75px; bottom: 75px; right: 20px;\"\/>";
        gameHTML += "					<\/div>";
        gameHTML += "					<div id=\"game-over\" class=\"absolute text-30 text-center hide\">The Fight Is Over!!!<\/div>";
        gameHTML += "					<img src=\"img\/toolbar_bg.png\" class =\"img-spacing\"style=\"width: 400px\"\/>";
        gameHTML += "				<\/div>";
        gameHTML += "			<\/div>	";
        gameHTML += "";
        gameHTML += "		<\/div>";
        tempDocomunt = document.body.innerHTML;
        document.body.innerHTML = "";
        document.body.innerHTML = gameHTML;
        document.body.style.backgroundImage = "url('images/fightBackground1.png')";
        setTimeout(() => {
            document.getElementById("player").volume = 0.15;
            document.getElementById("player").play();
            setTimeout(() => document.getElementById("player").muted = false, 200);
        }
            , 200);
        initFight();
    }
}


function selectPokemonInFight(pokemonName) {
    document.getElementById("fightcard").innerHTML = 'S<img class="spriteFight" src="sprites/' + getFightImg(pokemonName) + '" />';
}


function getImg(pokemon) {
    return pokemon.name.english.toLowerCase() + ".png";
}


function getFightImg(pokemonName) {
    return pokemonName.toLowerCase() + ".png";
}


function greet() {
    if (localStorage.getItem("name") !== null) {
        document.getElementById("welcome").innerHTML += " " + localStorage["name"];
        init();
        return;
    }
    txt = "";
    person = prompt("Please enter your name:", "Ash Katcham");
    if (person == null || person == "") {
        txt = "User cancelled the prompt.";
    } else {
        localStorage["name"] = person;
        document.getElementById("welcome").innerHTML += " " + person;
        var pokemons = [];
        localStorage.setItem("pokedex", JSON.stringify(pokemons));
        init();
    }
}
function strCompare(str1, str2) {
    (str1 < str2) ?
        -1 :
        (str1 > str2 ? 1 : 0);
}
// game logic

var UserPokemon, CPUPokemon;

function getPlayerData() {
    var Userattacktypes=[];
    var Userdefensivetypes = [];
    var CPUattacktypes = [];
    var CPUdefensivetypes = [];
    for (var i = 0; i < attackingMoves.length; i++) {
        if (attackingMoves[i].type === pokedex[pokemon - 1].type[0] && !Userattacktypes.includes(attackingMoves[i].ename)) {

            Userattacktypes.push(attackingMoves[i].ename);
        }
    }
    for (i = 0; i < defensiveMoves.length; i++) {
        if (defensiveMoves[i].type === pokedex[pokemon - 1].type[0] && !Userdefensivetypes.includes(defensiveMoves[i].ename)) {
            Userdefensivetypes.push(defensiveMoves[i].ename);
        }
    }
    for (i = 0; i < attackingMoves.length; i++) {
        if (attackingMoves[i].type === pokedex[cpuId - 1].type[0] && !CPUattacktypes.includes(attackingMoves[i].ename)) {
            CPUattacktypes.push(attackingMoves[i].ename);
        }
    }
    for (i = 0; i < defensiveMoves.length; i++) {
        if (defensiveMoves[i].type === pokedex[cpuId - 1].type[0] && !CPUdefensivetypes.includes(defensiveMoves[i].ename)) {
            CPUdefensivetypes.push(defensiveMoves[i].ename);
        }
    }
    UserPokemon = {
        name: pokedex[pokemon-1].name.english,
        health: 100,
        lvl: 12,
        effect: null,
        moves: [{
            name: Userattacktypes[getRandomInt(0, Userattacktypes.length-1)],
            type: "Attack",
            power: 70,
            accuracy: 0.50
        },
        {
            name: Userattacktypes[getRandomInt(0, Userattacktypes.length-1)],
            type: "Attack",
            power: 10,
            accuracy: 0.70
        },
            {
            name: Userdefensivetypes[getRandomInt(0, Userdefensivetypes.length-1)],
            type: "Defense",
            power: 0.20,
            accuracy: 1.0
        },
        {
            name: Userdefensivetypes[getRandomInt(0, Userdefensivetypes.length-1)],
            type: "Defense",
            power: 0.65,
            accuracy: 0.80
        },
        ]
    };

    CPUPokemon = {
        name: pokedex[cpuId].name.english,
        health: 100,
        lvl: 12,
        effect: null,
        moves: [{
            name: CPUattacktypes[getRandomInt(0, CPUattacktypes.length-1)],
            type: "Attack",
            power: 30,
            accuracy: 0.80
        },
        {
            name: CPUattacktypes[getRandomInt(0, CPUattacktypes.length-1)],
            type: "Attack",
            power: 10,
            accuracy: 0.90
        },
        {
            name: CPUdefensivetypes[getRandomInt(0, CPUdefensivetypes.length-1)],
            type: "Defense",
            power: 0.20,
            accuracy: 1.0
        },
        {
            name: CPUdefensivetypes[getRandomInt(0, CPUdefensivetypes.length-1)],
            type: "Defense",
            power: 0.65,
            accuracy: 0.80
        },
        ]

    };
}


var currentState;
var cpuPokemon;
var userPokemon;

var cpuTurn = {
    play: function () {
        var randomMove = Math.floor(Math.random() * 4);
        var currentCPUMove = cpuPokemon.moves[randomMove];

        var setUpCPUField = function () {
            $("#chat-text").text("What will " + cpuPokemon.name + " do?");
            prepareToAttack();
        }
        var prepareToAttack = function () {
            $("#pikachu-img").animate({
                top: "-=25",

            }, 200, function () {
                $("#pikachu-img").animate({
                    top: "+=25"
                }, 200)
            });
            getAccuracy();
        };
        var getAccuracy = function () {
            var setAccuracy = Math.random();
            if (setAccuracy <= currentCPUMove.accuracy) {
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!");
                getMoveType();
            } else {
                $("#chat-text").text(cpuPokemon.name + " missed with " + currentCPUMove.name + "!");
                currentState = playerTurn;
                setTimeout(loop, 1500);
            }
        };
        var getMoveType = function () {
            showMoveAnimation();
            if (currentCPUMove.type == "Attack") {
                setTimeout(attackingMove, 1500);
            } else {
                setTimeout(defensiveMove, 1500);
            }
        };

        var showMoveAnimation = function () {
            $("#attack-img").addClass("cpu-attack-img");
            $("#attack-img").removeClass("cpuhide");
            $("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
        };

        var attackingMove = function () {
            $("#attack-img").addClass("cpuhide");
            $("#attack-img").removeClass("cpu-attack-img");
            if (cpuPokemon.effect == null) {
                userPokemon.health -= currentCPUMove.power;
            } else {
                userPokemon.health -= currentCPUMove.power * (1 - cpuPokemon.effect);
                userHp = userPokemon.health;
                cpuPokemon.effect = null;
            }
            $("#user-health-bar").css("width", userPokemon.health + "%");
            currentState = playerTurn;
            loop();
        };

        var defensiveMove = function () {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack-img");
            userPokemon.effect = currentCPUMove.power;
            currentState = playerTurn;
            AttackImg = currentState;
            loop();
        };
        setUpCPUField();
    }
};
var cpuHp;
var userHp;
var playerTurn = {

    play: function () {
        var currentUserMove;
        var setUpUserField = function () {
            var moveTexts = ["move1-text", "move2-text", "move3-text", "move4-text"];

            $("#user-buttons").removeClass("hide");
            $("#chat-text").text("What will " + userPokemon.name + " do?")

            for (var i = 0; i < moveTexts.length; i++) {
                $("#" + moveTexts[i]).text(userPokemon.moves[i].name);
            }
        };

        var prepareToAttack = function () {
            $("#user-buttons").addClass("hide");
            $("#charmander-img").animate({
                top: "-=25",

            }, 200, function () {
                $("#charmander-img").animate({
                    top: "+=25"
                }, 200)
            });
            getAccuracy();
        };
        var getAccuracy = function () {
            var setAccuracy = Math.random();
            if (setAccuracy <= currentUserMove.accuracy) {
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!");
                getMoveType();
            } else {
                $("#chat-text").text(userPokemon.name + " missed with " + currentUserMove.name + "!");
                currentState = cpuTurn;
                setTimeout(loop, 1500);
            }
        };
        var getMoveType = function () {
            showMoveAnimation();
            if (currentUserMove.type == "Attack") {
                setTimeout(attackingMove, 1500);
            } else {
                setTimeout(defensiveMove, 1500);
            }
        };
        var showMoveAnimation = function () {
            $("#attack-img").addClass("user-attack-img");
            $("#attack-img").removeClass("hide");
            $("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
        };

        var attackingMove = function () {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack-img");
            if (userPokemon.effect == null) {
                cpuPokemon.health -= currentUserMove.power;
                cpuHp = cpuPokemon.health;
            } else {
                cpuPokemon.health -= currentUserMove.power * (1 - userPokemon.effect);
                userPokemon.effect = null;
            }
            $("#cpu-health-bar").css("width", cpuPokemon.health + "%");
            currentState = cpuTurn;
            loop();
        };

        var defensiveMove = function () {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack-img");
            cpuPokemon.effect = currentUserMove.power;
            currentState = cpuTurn;
            AttackImg = cpuTurn;
            loop();
        };

        $("#move1-button,#move2-button,#move3-button,#move4-button").unbind().click(function () {
            var move = $(this).attr("value");
            currentUserMove = userPokemon.moves[move];
            prepareToAttack();
        });
        setUpUserField();
    }
};

var loop = function () {
    if (cpuPokemon.health <= 0) {
        $("#user-buttons").removeClass("hide");
        $("#game-over").removeClass("hide");
        var img = "images/" + (cpuId + 1).toString().padStart(3, '0') + ".png";
        catchingPokemon(img);
    }
    else if (userPokemon.health <= 0) {
        currentState.play();
        setTimeout(() => {
            alert("You lose! click ok to reload");
            location.reload();
        }, 500);
        
    }
    else {
        currentState.play();
    }
};
function catchingPokemon(img) {
    var catchPokemonHtml = "<link href=\"PokemonCatch.css\" rel=\"stylesheet\" />";
    catchPokemonHtml += "<script src=\"PokemonCatch.js\"></script>";
    catchPokemonHtml += " <div class=\"container\">";
    catchPokemonHtml += "<img src=" + img + " alt=\"Pikachu\" class=\"pikachu\" />";
    catchPokemonHtml += "<h1 class=\"throw\"></h1>";
    catchPokemonHtml += "<h1 class=\"gotcha\"></h1>";
    catchPokemonHtml += "<h1 class=\"success\"></h1 >";
    catchPokemonHtml += "<div id=\"pokeball\" class=\"pokeball\">";        
    catchPokemonHtml += "<div class=\"top\"></div >";
    catchPokemonHtml += "<div class=\"centre - black\"></div>";
    catchPokemonHtml += "<div class=\"centre-white\"></div>";
    catchPokemonHtml += "<div class=\"bottom\"></div>";
    catchPokemonHtml += "<div class=\"catch\"></div>";
    catchPokemonHtml += "</div>";
    catchPokemonHtml += "<a href=\"#pokeball\" class=\"button\">click to catch</a>";
    catchPokemonHtml += "</div>";
    document.body.innerHTML = "<center><h1>You win!</h1></center>";
    document.body.style.backgroundImage = "url('images/background-hero.png')";
    setTimeout(() => {
        document.body.innerHTML = catchPokemonHtml;

        (function () {
            var catchBtn = document.querySelector('.button');
            var star = document.querySelector('.star1');
            var successMessage = document.querySelector('.success');
            var gotchaMessage = document.querySelector('.gotcha');
            var throwMessage = document.querySelector('.throw');
            var pikachu = document.querySelector('.pikachu');

            //start the animation when the catch button is pressed
            function catchStart(e) {
                //run the throw message
                throwMessage.style.animation = 'throwMessage 1s 1 steps(21, start)';
                throwMessage.style.animationFillMode = 'forwards';

                //make pikachu disappear when the pokeball pauses during the throw
                pikachu.style.animation = 'pikachu-disappear 0.5s ease 1';
                pikachu.style.animationDelay = '1s';
                pikachu.style.animationFillMode = 'forwards';
                document.getElementsByClassName("gotcha").innerHTML = "Gotcha!";
                catchPokemon(true);
                setTimeout(() => location.reload(), 5500);
            }

            //show the catch text message when one of the star animations ends
            function showMessage() {
                setTimeout(() => location.reload(), 1000);
                //hide the throw message
                throwMessage.style.display = 'none';

                //animate the gotcha message
                gotchaMessage.style.animation = 'gotchaMessage 0.7s 1 steps(7, start)';
                gotchaMessage.style.animationFillMode = 'forwards';

                //animate the caught message
                successMessage.style.animation = 'successMessage 1.7s 1 steps(19, end)';
                successMessage.style.animationDelay = '1.7s';
                successMessage.style.animationFillMode = 'forwards';

            }

            catchBtn.addEventListener('click', catchStart, false);
        })();
    },
        2500);
   
}
function initImages() {
    document.getElementById("charmander-img").src = "images/" + pokemon.toString().padStart(3, '0') + ".png";
    document.getElementById("pikachu-img").src = "images/" + (cpuId+1).toString().padStart(3, '0') + ".png";
}

var initFight = function () {
    do {
        cpuId = getRandomInt(0, 151);
    } while (cpuId === pokemon - 1);

    getPlayerData();
    initImages();
    cpuPokemon = CPUPokemon;
    userPokemon = UserPokemon;
    $("#cpu-name").text(CPUPokemon.name);
    $("#cpu-lvl").text("");

    $("#user-name").text(UserPokemon.name);
    $("#user-lvl").text("");
    currentState = cpuTurn;
    loop();
};


const t_error = new Audio('assets/error.mp3');
const t_yes = new Audio('assets/hack.mp3');
const t_load = new Audio('assets/pipboy.mp3');
const t_keypress = new Audio('assets/keypress.mp3');
const t_ost = new Audio('assets/miside.mp3');
t_ost.loop = true;
const t_melody = new Audio('assets/melody.mp3');
const mel1 = new Audio('assets/note1.mp3');
const mel2 = new Audio('assets/note2.mp3');
const mel3 = new Audio('assets/note3.mp3');

let ccv = "";
let cyph_stage = 0;

let mel_progress = '0%';
let posalt = 1;
let mel_sequence = {
     1: 0,
     2: 0,
     3: 0,
     4: 0,
     5: 0
};

// losowo generowane hasło z każdą grą:
let mainPass = Math.floor(10000 + Math.random() * 90000);
let passDebug = 0;

// keypress shit
document.addEventListener("DOMContentLoaded", function() {
     const inputs = document.querySelectorAll("input");
 
     inputs.forEach(input => {
         input.addEventListener("focus", () => {
             input.addEventListener("keydown", playSound);
         });
 
         input.addEventListener("blur", () => {
             input.removeEventListener("keydown", playSound);
         });
     });
 
     function playSound() {
         t_keypress.currentTime = 0; // Reset the sound if it's already playing
         t_keypress.play();
     }
 });
 
// keypress shit

function loadStuff() {
     document.getElementById("pregra").style.opacity = 0;
     setTimeout(function() {document.getElementById("pregra").style.visibility = "hidden";}, 300);
     t_ost.play();
     document.getElementById("login").value = "";
     document.getElementById("haslo").value = "";
}

function tryLogin() {
     if(passDebug == 3) {
          console.warn(mainPass);
          t_error.currentTime = 0; // just in case
          t_error.play();
          document.getElementById("login").value = "Błędny login lub hasło!";
          document.getElementById("haslo").value = "";
          passDebug = 4;
     } else {
          if (document.getElementById("haslo").value == 'thedoor') {correctMelody();
          } else if (document.getElementById("login").value == "temp3" && document.getElementById("haslo").value == mainPass) {
               t_yes.currentTime = 0;
               t_yes.play();
               document.getElementById("gra3").style.visibility = 'visible';
          } else {
               t_error.currentTime = 0; // just in case
               t_error.play();
               document.getElementById("login").value = "Błędny login lub hasło!";
               document.getElementById("haslo").value = "";
               passDebug++;
          }
     }
}

function hacking() {
     let doHackCycle = true;
     let i = 0;
     let j = -1;
     t_load.play();
     setTimeout(function() {t_load.pause(); t_load.currentTime = 0;}, 2500);
     setTimeout(function() {document.getElementById("gra2").style.visibility = 'visible';}, 990);
     let codes = [
          document.getElementById("c1"), // 0
          document.getElementById("c2"), // 1
          document.getElementById("c3"), // 2
          document.getElementById("c4"), // 3
          document.getElementById("c5"), // 4
          document.getElementById("c6"), // 5
          document.getElementById("c7"), // 6
          document.getElementById("c8"), // 7
          document.getElementById("c9")  // 8
     ];
     const interval = setInterval(function() {
          if (!doHackCycle) {
               clearInterval(interval);
               return;
          }
          if (j !== -1) {
               codes[j].style.color = 'rgb(0, 255, 0)';
               codes[j].style.backgroundColor = 'rgb(0, 5, 0)';
          }
     
          if (i >= 9) {
               i = 0;
               j = -1;
          }
     
          codes[i].style.backgroundColor = 'rgb(0, 255, 0)';
          codes[i].style.color = 'rgb(0, 5, 0)';
          ccv = codes[i].innerHTML;
          i++;
          j++;
     }, 500);
}

function zlacz_mg() {
     function cypherFail() {
          a.style.color = "rgb(0, 255, 0)";
          a.style.backgroundColor = "rgb(0, 5, 0)";
          b.style.color = "rgb(0, 255, 0)";
          b.style.backgroundColor = "rgb(0, 5, 0)";
          c.style.color = "rgb(0, 255, 0)";
          c.style.backgroundColor = "rgb(0, 5, 0)";
          d.style.color = "rgb(0, 255, 0)";
          d.style.backgroundColor = "rgb(0, 5, 0)";
          cyph_stage = 0;
     }
     let a = document.getElementById("s1");
     let b = document.getElementById("s2");
     let c = document.getElementById("s3");
     let d = document.getElementById("s4");
     switch(cyph_stage) {
          case 0:
               if (ccv == "N0WR") {
                    console.log("etap1"); cyph_stage++; t_yes.play();
                    a.style.backgroundColor = "rgb(0, 255, 0)";
                    a.style.color = "rgb(0, 5, 0)";
               } else {
                    t_error.currentTime = 0; t_error.play();
                    cypherFail();
               }
               break;
          case 1:
               if (ccv == "01HZ") {
                    console.log("etap2"); cyph_stage++; t_yes.play();
                    b.style.backgroundColor = "rgb(0, 255, 0)";
                    b.style.color = "rgb(0, 5, 0)";
               } else {
                    t_error.currentTime = 0; t_error.play();
                    cypherFail();
               }
               break;
          case 2:
               if (ccv == "7A08") {
                    console.log("etap3"); cyph_stage++; t_yes.play();
                    c.style.backgroundColor = "rgb(0, 255, 0)";
                    c.style.color = "rgb(0, 5, 0)";
               } else {
                    t_error.currentTime = 0; t_error.play();
                    cypherFail();
               }
               break;
          case 3:
               if (ccv == "K001") {
                     console.log("etap4"); t_yes.play();
                     d.style.backgroundColor = "rgb(0, 255, 0)";
                    d.style.color = "rgb(0, 5, 0)";
                    cypherGivePass();
               } else {
                    t_error.currentTime = 0; t_error.play();
                    cypherFail();
               }
               break;
     }
     function cypherGivePass() {
          doHackCycle = false;
          document.getElementById("okienko-gra2").style.visibility = 'visible';
          document.getElementById("og2p").innerHTML = "Login: temp3  |  Hasło: " + mainPass;
     }
}

function close_gra2() {
     t_load.play();
     setTimeout(function() {t_load.pause(); t_load.currentTime = 0;}, 2500);
     setTimeout(function() {document.getElementById("gra2").style.visibility = 'hidden'; document.getElementById("okienko-gra2").style.visibility = 'hidden';}, 990);
}

function playMelody() {
     t_melody.currentTime = 0;
     t_melody.play();
}
function melodyButton(b) {
    let currentSequence = mel_sequence[1].toString() + mel_sequence[2].toString() + mel_sequence[3].toString() + mel_sequence[4].toString() + mel_sequence[5].toString();
    console.info(currentSequence);
    // to co wyżej to poprawka by działało bo z jakiegoś powodu nie chce nwm

    if (posalt < 6) {
     switch(b) {
          case 1:
               mel1.currentTime = 0;
               mel1.play();
               mel_sequence[posalt] = 1;
               posalt++;
               document.getElementById("mel-bar").style.width = (posalt - 1) * 20 + '%';;
               break;
          case 2:
               mel2.currentTime = 0;
               mel2.play();
               mel_sequence[posalt] = 2;
               posalt++;
               document.getElementById("mel-bar").style.width = (posalt - 1) * 20 + '%';;
               break;
          case 3:
               mel3.currentTime = 0;
               mel3.play();
               mel_sequence[posalt] = 3;
               posalt++;
               document.getElementById("mel-bar").style.width = (posalt - 1) * 20 + '%';;
               break;
     }
} else if (posalt >= 5 && currentSequence == '12312') {
          t_yes.currentTime = 0; t_yes.play();
          correctMelody();
     } else if (posalt >= 5 && currentSequence != '12312') {
          document.getElementById("mel-bar").style.width = '0%';
          t_error.currentTime = 0; t_error.play();
          mel_sequence = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
          posalt = 1;
     }
}

function correctMelody() {
     document.getElementById("gra3").style.visibility = 'hidden';
     document.getElementById("gra4").style.visibility = 'visible';
}

function submitSurvey() {
     let a =document.getElementById("r12");
     let b = document.getElementById("r22");
     let c = document.getElementById("r31");
     let d = document.getElementById("r32");
     let e = document.getElementById("r33");
     if (a.checked && b.checked && c.checked || d.checked || e.checked) {
          t_yes.currentTime = 0;
          t_yes.play();
          document.getElementById("gra4").style.visibility = 'hidden';
          document.getElementById("gra5").style.visibility = 'visible';
     } else {
          t_error.currentTime = 0;
          t_error.play();
     }
}

function chosenChess(c) {
     switch(c) {
          case 1:
               t_error.currentTime = 0; t_error.play();
               break;
          case 2:
               t_error.currentTime = 0; t_error.play();
               break;
          case 3:
               t_yes.currentTime = 0; t_yes.play();
               showEnding();
               document.getElementById("gra5").style.visibility = 'hidden';
               break;
     }
}

function showEnding() {
     document.getElementById("gra6").style.visibility = 'visible';
     t_load.currentTime = 0;
     t_load.play();
     let a = document.getElementById("hat");
     a.style.right = 0;
     setTimeout(function() {a.style.left = 0;}, 10000);
}
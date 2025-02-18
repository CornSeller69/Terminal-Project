const t_error = new Audio('assets/error.mp3');
const t_yes = new Audio('assets/hack.mp3');
const t_load = new Audio('assets/pipboy.mp3');
const t_keypress = new Audio('assets/keypress.mp3');
const t_ost = new Audio('assets/miside.mp3');
t_ost.loop = true;

let ccv = "";
let cyph_stage = 0;

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
          if (document.getElementById("login").value == "temp3" && document.getElementById("haslo").value == mainPass) {
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
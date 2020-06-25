const wordDisplayElement = document.getElementById("container");
const wordInputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
let score = 0;
var gameOver = false;


var wordsList = [
 
  "Aude",
  "Audrey",
  "Axel",
  "Charlotte",
  "Fanny",
  "Graziella",
  "Spyros",
  "Marie",
  "Menhaj",
  "Rico",
  "Setti",
  "Chakib",
  "Malamine",
  "Alice",
  "Guillaume",
  "Tatijana",
];


function randomWord(ar) {
  var word = ar[Math.floor(Math.random() * ar.length)];
  return word;
}

//fonction pour créer une div pour chaque mot + lui ajouter la classe word pour movedown
function placeWord() {

  if (score>=10) {
    document.getElementById("line").innerHTML = "";
    document.getElementById("line").innerHTML = "<h3> LEVEL 2 </h3>";
    wordDisplayElement.style.backgroundColor= "#b9faf8";
    
  
    var max = Number(wordsList.length);
    wordsList.splice(0,(max));
    wordsList.push("incomprehensible", 
    "strengths", 
    "unimaginatively", 
    "acknowledge", 
    "administrator",
    "characteristic", 
    "communication",
    "tuvasperdre");

  }
  if (score>15){

    document.getElementById("line").innerHTML = "";
    document.getElementById("line").innerHTML = "<h3> FINAL BOSS </h3>"
    wordDisplayElement.style.backgroundColor= "#fe5f55";
    var max = Number(wordsList.length);
    wordsList.splice(0,(max));
    wordsList.push("Anticonstitutionnellement");
  }

  if(score == 10 || score == 15) {
    document.getElementById('level').play();
  }
  
  var word = randomWord(wordsList);
  var wordDiv = document.createElement("div");
  for (let i = 0; i < word.length; i++) {
    let span = document.createElement("span");
    span.innerText = word[i]
    wordDiv.appendChild(span);
  }


  wordDiv.classList.add("word");
  wordDiv.style.top = "1px";
  wordDiv.style.left = (Math.random() * (900 - 300) + 300).toString() + "px";
  document.getElementsByClassName("container")[0].appendChild(wordDiv);
  // console.log(wordDiv);


}

var interval = 3000;

function wordCreator() {
  setInterval(() => {
    if (!gameOver) {
      interval = interval >= 500 ? interval - 200 : interval;
      placeWord();
      console.log(interval);

    }
    
    
    
  }, interval);
}

function playGame() {
  wordCreator();
 
}



function check() {
    const all = wordDisplayElement.querySelectorAll(".word span");

    all.forEach(word => {
        var computedStyle = window.getComputedStyle(word);
        const val = Number(computedStyle.top.split("px")[0]);
        if (val >= 490) {
            gameOver = true;
            document.getElementById('loser').play();
            document.getElementById("container").innerHTML = "<h1> Game Over </h1><h2>Score: " + score + "</h2><button>PLAY AGAIN</button>";
            document.querySelector('button').addEventListener('click', () => {
              location.href='/game.html';
            })
          
            
        }
    })
    requestAnimationFrame(check)
}





//eventListener - compare each caracters
if (wordInputElement)
wordInputElement.addEventListener("input", () => {

  var currentWord = document.querySelector(".word");
  const arrayWord = currentWord.querySelectorAll("span"); // to get every spans
  const arrayValue = wordInputElement.value.split("");
  let correct = true;

  arrayWord.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
      correct = false;
    }
  });
  if (correct) {
    document.getElementById('audio').play();
    score += 1;
    interval = interval >= 500 ? interval - 200 : interval;
    scoreElement.innerHTML = score;
    wordInputElement.value = null;
    var container = document.querySelector(".container");
    var currentWord = document.querySelector(".word");
    container.removeChild(currentWord); // to delete each div if correct
  }
});



// placeWord();
playGame();
check();

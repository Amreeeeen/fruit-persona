const chat = document.getElementById("chat");
const inputContainer = document.getElementById("input-container");
const restartBtn = document.getElementById("restartBtn");
const resultScreen = document.getElementById("result-screen");
const resultImg = document.getElementById("result-img");
const resultName = document.getElementById("result-name");
const shareBox = document.getElementById("share-box");

const ding = document.getElementById("ding");
const pop = document.getElementById("pop");

let total = { A: 0, M: 0, R: 0 };
let index = 0;

function createBubble(message, type = "bot") {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", type, "fade-in");
  bubble.innerText = message;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

function addOptions(options, callback) {
  inputContainer.innerHTML = "";
  options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      pop.play();
      callback(option);
    };
    inputContainer.appendChild(btn);
  });
}

function askFavoriteFruit() {
  createBubble("Let’s start by asking your favorite fruit...");
  inputContainer.innerHTML = "";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type your favorite fruit...";

  const skipBtn = document.createElement("button");
  skipBtn.textContent = "Just start!";
  skipBtn.onclick = () => {
    inputContainer.innerHTML = "";
    setTimeout(() => runQuiz(), 500);
  };

  inputContainer.appendChild(input);
  inputContainer.appendChild(skipBtn);

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      createBubble(input.value, "user");
      inputContainer.innerHTML = "";
      setTimeout(() => runQuiz(), 500);
    }
  });
}

const questions = [
  {
    q: "Pick a place to relax?",
    options: [
      { text: "Beach", score: { A: 1 } },
      { text: "Library", score: { M: 1 } },
      { text: "Festival", score: { R: 1 } }
    ]
  },
  {
    q: "Choose a morning drink?",
    options: [
      { text: "Coffee", score: { M: 1 } },
      { text: "Smoothie", score: { A: 1 } },
      { text: "Water", score: { R: 1 } }
    ]
  },
  {
    q: "Your ideal pet?",
    options: [
      { text: "Cat", score: { R: 1 } },
      { text: "Bird", score: { M: 1 } },
      { text: "Dog", score: { A: 1 } }
    ]
  },
  {
    q: "How do you spend your weekend?",
    options: [
      { text: "Baking", score: { M: 1 } },
      { text: "Hiking", score: { A: 1 } },
      { text: "Painting", score: { R: 1 } }
    ]
  },
  {
    q: "Your favorite season?",
    options: [
      { text: "Spring", score: { R: 1 } },
      { text: "Summer", score: { A: 1 } },
      { text: "Winter", score: { M: 1 } }
    ]
  },
  {
    q: "How do you handle stress?",
    options: [
      { text: "Talk it out", score: { M: 1 } },
      { text: "Journal", score: { R: 1 } },
      { text: "Dance it off", score: { A: 1 } }
    ]
  },
  {
    q: "Favorite type of weather?",
    options: [
      { text: "Rainy", score: { R: 1 } },
      { text: "Sunny", score: { A: 1 } },
      { text: "Windy", score: { M: 1 } }
    ]
  },
  {
    q: "Pick a dessert:",
    options: [
      { text: "Cake", score: { A: 1 } },
      { text: "Fruit bowl", score: { R: 1 } },
      { text: "Ice cream", score: { M: 1 } }
    ]
  },
  {
    q: "Choose a color palette:",
    options: [
      { text: "Warm tones", score: { A: 1 } },
      { text: "Pastels", score: { M: 1 } },
      { text: "Neons", score: { R: 1 } }
    ]
  },
  {
    q: "What do you value most?",
    options: [
      { text: "Adventure", score: { A: 1 } },
      { text: "Comfort", score: { M: 1 } },
      { text: "Freedom", score: { R: 1 } }
    ]
  },
  {
    q: "Your social style?",
    options: [
      { text: "Loner", score: { R: 1 } },
      { text: "Social butterfly", score: { A: 1 } },
      { text: "Listener", score: { M: 1 } }
    ]
  },
  {
    q: "Pick a wild card:",
    options: [
      { text: "Climb a tree", score: { A: 1 } },
      { text: "Write a song", score: { M: 1 } },
      { text: "Take a nap", score: { R: 1 } }
    ]
  }
];

const results = {
  A: { fruit: "Red Apple", image: "img/redapple.png" },
  M: { fruit: "Mango", image: "img/Mango.png" },
  R: { fruit: "Strawberry", image: "img/Strawberry.png" },
  AM: { fruit: "Peach", image: "img/Peach.png" },
  AR: { fruit: "Cherry", image: "img/Cherry.png" },
  MR: { fruit: "Kiwi", image: "img/Kiwi.jpg" },
  AMR: { fruit: "Pineapple", image: "img/Pineapple.png" },
  MA: { fruit: "Plum", image: "img/Plum.png" },
  RA: { fruit: "Pomegranate", image: "img/Pomegranate.png" },
  RM: { fruit: "Vanilla", image: "img/Vanilla.png" },
  MAR: { fruit: "Cocoa", image: "img/Cocoa.png" },
  RAM: { fruit: "Banana", image: "img/Banana.png" },
  AAM: { fruit: "Blueberry", image: "img/Blueberry.png" },
  RRA: { fruit: "Lemon", image: "img/Lemon.png" },
  AMM: { fruit: "Grapes", image: "img/Grapes.png" },
  ARR: { fruit: "Dragon Fruit", image: "img/DragonFruit.png" },
  MMR: { fruit: "Avocado", image: "img/Avocado.png" },
  RRM: { fruit: "Chilly", image: "img/Chilly.png" },
  ARRR: { fruit: "Watermelon", image: "img/watermelon.png" }
};

function runQuiz() {
  index = 0;
  total = { A: 0, M: 0, R: 0 };
  resultScreen.classList.add("hidden");
  nextQuestion();
}

function nextQuestion() {
  if (index < questions.length) {
    const current = questions[index];
    setTimeout(() => {
      createBubble(current.q);
      inputContainer.innerHTML = "";
      current.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.textContent = opt.text;
        btn.onclick = () => {
          pop.play();
          createBubble(opt.text, "user");
          Object.keys(opt.score).forEach((k) => {
            total[k] += opt.score[k];
          });
          index++;
          nextQuestion();
        };
        inputContainer.appendChild(btn);
      });
    }, 700);
  } else {
    showResult();
  }
}

function showResult() {
  inputContainer.innerHTML = "";
  setTimeout(() => {
    chat.innerHTML = "";
    createBubble("You're a...");
    ding.play();

    setTimeout(() => {
      const sorted = Object.entries(total)
        .filter(([_, v]) => v > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([k]) => k);

      let bestMatch = results[sorted.join("")] ||
                      results[sorted.slice(0, 2).join("")] ||
                      results[sorted[0]] ||
                      results["A"];

      resultName.innerText = bestMatch.fruit;
      resultImg.src = bestMatch.image;

      // Make image clickable
      resultImg.style.cursor = "pointer";
      resultImg.onclick = () => {
        window.open(bestMatch.image, '_blank');
      };

      resultScreen.classList.remove("hidden");
      restartBtn.style.display = "block";
      shareBox.innerHTML = `
        <p>Share this with your friends!</p>
        <button onclick="copyLink()">Copy Link</button>
      `;
    }, 1500);
  }, 500);
}

function copyLink() {
  const dummy = document.createElement("input");
  dummy.value = window.location.href;
  document.body.appendChild(dummy);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  alert("Link copied!");
}

function init() {
  chat.innerHTML = "";
  inputContainer.innerHTML = "";
  restartBtn.style.display = "none";
  resultScreen.classList.add("hidden");
  shareBox.innerHTML = "";

  setTimeout(() => {
    createBubble("Hello! Welcome to Fruit Persona 🍓");
    setTimeout(() => {
      createBubble("You're here to find out your fruit personality?");
      addOptions(["Yes!", "Definitely yes!"], () => {
        createBubble("Great! 🍊 Let's get started!");
        setTimeout(() => {
          askFavoriteFruit();
        }, 700);
      });
    }, 700);
  }, 500);
}

restartBtn.onclick = () => {
  pop.play();
  init();
};

init();

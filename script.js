// Domande del quiz
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

// Variabili globali
let numeroDomanda = 0; // Serve a dire a che numero di domanda siamo, in questo caso alla domanda 0 che sarebbe la domanda 1
let score = 0; // Contatore per il punteggio dell'utente
let timerScore;


// Funzione per caricare una domanda
function caricaDomanda() {
  clearInterval(timerScore); // Ferma il timer corrente
  startTimer(); // Riavvia il timer

  // Recupera la domanda attuale usando l'indice corrente
  let domandaCorrente = questions[numeroDomanda];
  let numDomanda = document.getElementById("numeroDomanda");
  numDomanda.innerHTML = `QUESTION&nbsp ${numeroDomanda + 1} <span style="color: #D20094;"> / 10</span>`;

  // Mostra il testo della domanda
  let contenutoDomanda = document.getElementById("question");
  contenutoDomanda.innerText = domandaCorrente.question;
  contenutoDomanda.style.textAlign = "center";

  // Combina la risposta corretta e quelle errate in un unico array
  let risposte = [domandaCorrente.correct_answer].concat(domandaCorrente.incorrect_answers);

  // Mescola le risposte
  risposte = risposte.sort(() => Math.random() - 0.5);

  // Trova il contenitore per le risposte e lo svuota
  let answersElement = document.getElementById("answers");
  answersElement.innerHTML = ""; // Elimina eventuali risposte precedenti

  // Crea un pulsante per ogni risposta
  for (let i = 0; i < risposte.length; i++) {
    let answerButton = document.createElement("button"); // Crea un pulsante
    answerButton.textContent = risposte[i]; // Imposta il testo del pulsante con la risposta
    answerButton.className = "answer"; // Aggiunge una classe CSS
    answerButton.onclick = clickRisposta; // Aggiunge un evento click
    answersElement.appendChild(answerButton); // Aggiunge il pulsante al DOM

    // Cambia il colore al passaggio del mouse
    answerButton.addEventListener("mouseenter", () => {
      answerButton.style.backgroundImage = "linear-gradient(349deg, rgba(96,0,88,1) 0%, rgba(210,0,148,1) 100%)";
    });

    // Ripristina il colore quando il mouse esce
    answerButton.addEventListener("mouseleave", () => {
      answerButton.style.backgroundImage = "none";
      answerButton.style.backgroundColor = "#d2009327"; // Colore originale
    });
  }
}

// Funzione per gestire il click su una risposta
function clickRisposta(event) {
  let selectedAnswer = event.target.textContent;
  let domandaCorrente = questions[numeroDomanda];

  // Verifica se la risposta selezionata è corretta
  if (selectedAnswer === domandaCorrente.correct_answer) {
    score++; // Incrementa il punteggio
    localStorage.setItem("risultato", score); // Salva il punteggio in localStorage
  }

  numeroDomanda++; // Passa alla domanda successiva
  if (numeroDomanda < questions.length) {
    caricaDomanda(); // Carica la domanda successiva
  } else {
    window.location.href = "Risultati.html"; // Vai alla pagina dei risultati
  }
}

// Funzione per gestire il timer
function startTimer() {
  let tempoRimanente = 60;
  let timer = document.getElementById("timer");
  timer.innerText = tempoRimanente;
  timerScore = setInterval(() => {
    tempoRimanente--;
    timer.innerText = tempoRimanente;

    if (tempoRimanente <= 0) {
      clearInterval(timerScore); // Ferma il timer
      numeroDomanda++;
      caricaDomanda(); // Passa alla domanda successiva
    }
  }, 1000);
}

// Funzione per mostrare i risultati finali
function showRisultati() {
  // Recupera il punteggio dal localStorage
  let score = parseInt(localStorage.getItem("risultato"));

  // Calcola le percentuali
  let percentualeCorrette = Math.round((score / questions.length) * 100);
  let percentualeIncorrette = 100 - percentualeCorrette;

  // Trova gli elementi da aggiornare e inserisci le percentuali
  document.getElementById("correct").innerText = percentualeCorrette + '%'; 
  document.getElementById("wrong").innerText = percentualeIncorrette + '%';
  document.getElementById("quantitaGiuste").innerText = (`${score} /10 questions`);
  document.getElementById("quantitaSbagliate").innerText = (`${10 - score} /10 questions`);
}


// Carica la prima domanda quando la pagina è pronta
window.onload = function () {
  if (window.location.pathname.includes("Risultati.html")) {
    showRisultati(); // Mostra i risultati solo nella pagina dei risultati
  } else {
    caricaDomanda(); // Carica la prima domanda
  }
};

document.addEventListener("DOMContentLoaded", function() {
  // Codice per il primo pulsante
  const buttonWelcomePage = document.getElementById("buttonwelcomepage");
  if (buttonWelcomePage) {
    buttonWelcomePage.addEventListener("click", function() {
      window.location.href = "benchmark.html"; // Reindirizza alla pagina benchmark.html
    });
  }

  // Codice per il secondo pulsante
  const buttonRate = document.getElementById("buttonrate");
  if (buttonRate) {
    buttonRate.addEventListener("click", function() {
      window.location.href = "feedback.html"; // Reindirizza alla pagina feedback.html
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star');

  stars.forEach((star, index) => {
      star.addEventListener('click', () => {
          // Aggiungi la classe 'active' a tutte le stelle precedenti (inclusa quella cliccata)
          stars.forEach((s, i) => { // s sta per Star
              if (i <= index) {
                  s.classList.add('active'); // Colora la stella
              } else {
                  s.classList.remove('active'); // Rimuovi il colore dalle stelle successive
              }
          });
      });
  });
});

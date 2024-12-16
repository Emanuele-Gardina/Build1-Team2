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
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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

  window.onload = function () {}



// Variabili globali
    let numeroDomanda = 0; // Serve a dire a che numero di domanda siamo, in questo caso alla domanda 0 che sarebbe la domanda 1
    let score = 0; // Contatore per il punteggio dell'utente

    // Funzione per caricare una domanda
    function caricaDomanda() {
      // Recupera la domanda attuale usando l'indice corrente
      let domandaCorrente = questions[numeroDomanda];

      // Mostra il testo della domanda
      let contenutoDomanda = document.getElementById("question");
      contenutoDomanda.innerText = domandaCorrente.question;

      // Combina la risposta corretta e quelle errate in un unico array
      let risposte = [domandaCorrente.correct_answer].concat(domandaCorrente.incorrect_answers);

      // Mescola le risposte utilizzando Math.random()
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
      }
    }

    // Funzione per gestire il click su una risposta
    function clickRisposta(event) {
      // Recupera il testo della risposta cliccata
      let selectedAnswer = event.target.textContent;

      // Recupera la domanda attuale
      let domandaCorrente = questions[numeroDomanda];

      // Verifica se la risposta selezionata è corretta
      if (selectedAnswer === domandaCorrente.correct_answer) {
        score++; // Incrementa il punteggio se corretto
      }

      // Passa alla domanda successiva
      numeroDomanda++;
      if (numeroDomanda < questions.length) {
        // Se ci sono ancora domande, carica la prossima
        caricaDomanda();
      } else {
        // Altrimenti, mostra il punteggio finale
        showScore();
      }
    }

    // Funzione per mostrare il punteggio finale
    function showScore() {
      let contenutoDomanda = document.getElementById("question");
      let answersElement = document.getElementById("answers");
      let scoreElement = document.getElementById("score");

      // Cambia il testo per indicare che il quiz è finito
      contenutoDomanda.textContent = "Quiz Finished!";
      // Svuota il contenitore delle risposte
      answersElement.innerHTML = "";
      // Mostra il punteggio totale
      scoreElement.style.display = "block";
      scoreElement.textContent = "Your Score: " + score + " / " + questions.length;
    }

    // Carica la prima domanda quando la pagina è pronta
    window.onload = function () {
      caricaDomanda();
    };
  
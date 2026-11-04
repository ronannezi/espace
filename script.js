// ===== DADOS DO QUIZ - SISTEMA SOLAR (6º ANO) =====
const questions = [
    {
        question: "Qual é o planeta mais próximo do Sol?",
        options: ["Vênus", "Mercúrio", "Terra", "Marte"],
        correct: 1,
        explanation: "Mercúrio é o planeta mais próximo do Sol!"
    },
    {
        question: "Qual planeta é conhecido como o 'Planeta Vermelho'?",
        options: ["Júpiter", "Saturno", "Marte", "Netuno"],
        correct: 2,
        explanation: "Marte tem uma cor avermelhada por causa do óxido de ferro no solo."
    },
    {
        question: "Quantos planetas existem no Sistema Solar?",
        options: ["7", "8", "9", "10"],
        correct: 1,
        explanation: "São 8 planetas: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno."
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Saturno", "Urano", "Júpiter", "Netuno"],
        correct: 2,
        explanation: "Júpiter é o maior de todos! Cabe mais de 1.300 Terras dentro dele."
    },
    {
        question: "Qual planeta tem os anéis mais famosos e visíveis?",
        options: ["Júpiter", "Urano", "Netuno", "Saturno"],
        correct: 3,
        explanation: "Saturno é famoso pelos seus belos anéis feitos de gelo e rocha."
    },
    {
        question: "Em que planeta nós vivemos?",
        options: ["Marte", "Vênus", "Terra", "Mercúrio"],
        correct: 2,
        explanation: "A Terra é o nosso lar! É o único planeta conhecido com vida."
    },
    {
        question: "Qual é o nome da estrela que ilumina e aquece o nosso Sistema Solar?",
        options: ["Lua", "Sol", "Estrela Polar", "Sirius"],
        correct: 1,
        explanation: "O Sol é uma estrela! Ele está no centro do Sistema Solar."
    },
    {
        question: "Qual planeta é o mais quente do Sistema Solar?",
        options: ["Mercúrio", "Vênus", "Marte", "Terra"],
        correct: 1,
        explanation: "Vênus é o mais quente por causa da sua atmosfera densa de gases do efeito estufa."
    },
    {
        question: "Qual destes é um planeta gasoso (gigante gasoso)?",
        options: ["Marte", "Vênus", "Júpiter", "Mercúrio"],
        correct: 2,
        explanation: "Júpiter, Saturno, Urano e Netuno são planetas gasosos. Os outros são rochosos."
    },
    {
        question: "Qual planeta é famoso por ter uma grande mancha vermelha (uma tempestade)?",
        options: ["Saturno", "Júpiter", "Netuno", "Urano"],
        correct: 1,
        explanation: "A Grande Mancha Vermelha de Júpiter é uma tempestade gigante que dura há séculos!"
    }
];

// ===== ESTADO DO JOGO =====
let currentQuestion = 0;
let score = 0;
let lives = 3;
let answered = false;

// ===== ELEMENTOS DO DOM =====
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const btnStart = document.getElementById("btn-start");
const btnRestart = document.getElementById("btn-restart");
const btnHome = document.getElementById("btn-home");

const livesEl = document.getElementById("lives");
const scoreEl = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");

const resultIcon = document.getElementById("result-icon");
const resultTitle = document.getElementById("result-title");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function showScreen(screen) {
    startScreen.classList.remove("active");
    gameScreen.classList.remove("active");
    endScreen.classList.remove("active");
    screen.classList.add("active");
}

// ===== INICIAR JOGO =====
function startGame() {
    currentQuestion = 0;
    score = 0;
    lives = 3;
    answered = false;
    updateHUD();
    showScreen(gameScreen);
    loadQuestion();
}

// ===== ATUALIZAR HUD =====
function updateHUD() {
    // Vidas
    const hearts = "❤️ ".repeat(lives) + "🖤 ".repeat(3 - lives);
    livesEl.textContent = hearts.trim();

    // Pontos
    scoreEl.textContent = score;

    // Barra de progresso
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// ===== CARREGAR PERGUNTA =====
function loadQuestion() {
    answered = false;
    feedback.classList.remove("show", "correct", "wrong");
    feedback.textContent = "";

    const q = questions[currentQuestion];

    questionNumber.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
    questionText.textContent = q.question;

    // Atualiza progresso (já respondeu as anteriores)
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Gera opções
    optionsContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = `
            <span class="option-letter">${letters[index]}</span>
            <span>${option}</span>
        `;
        btn.addEventListener("click", () => selectAnswer(index));
        optionsContainer.appendChild(btn);
    });
}

// ===== SELECIONAR RESPOSTA =====
function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    // Desabilita todos os botões
    buttons.forEach(btn => btn.disabled = true);

    // Marca a resposta correta e a errada
    buttons[q.correct].classList.add("correct");

    if (selectedIndex === q.correct) {
        // Acertou
        score += 10;
        feedback.textContent = `✅ Correto! ${q.explanation}`;
        feedback.classList.add("show", "correct");
    } else {
        // Errou
        buttons[selectedIndex].classList.add("wrong");
        lives--;
        feedback.textContent = `❌ Errado! ${q.explanation}`;
        feedback.classList.add("show", "wrong");
    }

    updateHUD();

    // Próxima pergunta ou fim do jogo
    setTimeout(() => {
        if (lives <= 0) {
            endGame(false);
        } else if (currentQuestion + 1 >= questions.length) {
            endGame(true);
        } else {
            currentQuestion++;
            loadQuestion();
        }
    }, 2200);
}

// ===== FINALIZAR JOGO =====
function endGame(completed) {
    // Completa a barra de progresso
    progressBar.style.width = "100%";

    finalScore.textContent = score;

    if (!completed) {
        // Perdeu todas as vidas
        resultIcon.textContent = "💫";
        resultTitle.textContent = "Missão Interrompida!";
        resultMessage.textContent = "Você perdeu todas as vidas. Que tal tentar de novo e explorar mais o espaço?";
    } else if (score === 100) {
        resultIcon.textContent = "🏆";
        resultTitle.textContent = "Astronauta Lendário!";
        resultMessage.textContent = "Incrível! Você acertou todas as perguntas e conquistou o Sistema Solar!";
    } else if (score >= 70) {
        resultIcon.textContent = "🌟";
        resultTitle.textContent = "Ótimo trabalho, Explorador!";
        resultMessage.textContent = "Você conhece bem o Sistema Solar! Continue estudando para chegar aos 100 pontos.";
    } else if (score >= 40) {
        resultIcon.textContent = "🚀";
        resultTitle.textContent = "Boa tentativa, Cadete!";
        resultMessage.textContent = "Você está no caminho certo. Revise os planetas e jogue novamente!";
    } else {
        resultIcon.textContent = "🌌";
        resultTitle.textContent = "Continue explorando!";
        resultMessage.textContent = "O espaço é cheio de mistérios. Estude um pouco mais e tente de novo!";
    }

    showScreen(endScreen);
}

// ===== EVENT LISTENERS =====
btnStart.addEventListener("click", startGame);
btnRestart.addEventListener("click", startGame);
btnHome.addEventListener("click", () => {
    showScreen(startScreen);
});

// ===== INICIALIZAÇÃO =====
// Garante que a tela inicial está ativa ao carregar
showScreen(startScreen);

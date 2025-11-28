/* =========================================
   GUIA DE TÉCNICA (Extraído do PDF)
   ========================================= */
const EXERCISE_GUIDE = {
    "Flexão": "Mãos alinhadas com ombros. Corpo em linha reta. Desça até o peito aproximar do solo. (Pág 14)",
    "Barra": "Queixo deve passar da barra. Não balance o corpo. Estenda totalmente os braços na descida. (Pág 13)",
    "Abdominal": "Toque as mãos nos pés ou próximo. Movimento contínuo. Não pare embaixo. (Pág 15)",
    "Corrida": "Postura ereta. Passada natural. Mantenha ritmo constante. (Pág 16)",
    "Agachamento": "Pés na largura dos ombros. Mantenha a coluna reta. Desça até 90 graus."
};

/* =========================================
   FRASES DO RICARDO (Pág 10 e 31)
   ========================================= */
const QUOTES = [
    "Disciplina é liberdade.",
    "Seu corpo só vai onde sua mente permite.",
    "Não precisa ser perfeito, só precisa ser melhor que ontem.",
    "Motivação passa. Disciplina fica.",
    "A dor é temporária. A glória é eterna."
];

/* =========================================
   BANCO DE DADOS DE TREINOS
   ========================================= */
const TREINOS = {
    'INICIANTE': {
        padrao: {
            titulo: "ADAPTAÇÃO TÉCNICA",
            foco: "Resistência Base",
            aquecimento: ["5 min Trote Leve", "10 Polichinelos"],
            principal: [
                "Barra Fixa: 3x Máx (ou Negativa)",
                "Flexão de Braço: 4x Máx",
                "Abdominal Remador: 3x15",
                "Corrida: 800m + 4x100m"
            ]
        },
        fortalecimento: {
            titulo: "FORÇA BASE",
            foco: "Prevenção",
            aquecimento: ["Mobilidade Geral"],
            principal: ["Agachamento: 3x12", "Afundo: 3x10", "Prancha: 3x30s"]
        }
    },
    'INTERMEDIARIO': {
        padrao: {
            titulo: "DESENVOLVIMENTO",
            foco: "Volume",
            aquecimento: ["6 min Trote", "10 Burpees"],
            principal: [
                "Flexão: 4x Máx", 
                "Barra: 3x6 (Pausa 3s)", 
                "Abdominal Carga: 3x20", 
                "Tiros: 4x200m"
            ]
        },
        fortalecimento: { titulo: "FORÇA FUNCIONAL", foco: "Potência", aquecimento: ["Mobilidade"], principal: ["Agachamento Carga: 4x10", "Remada: 3x12"] }
    },
    'AVANCADO': {
        padrao: {
            titulo: "PERFORMANCE TAF",
            foco: "Simulação",
            aquecimento: ["8 min Corrida", "15 Mountain Climbers"],
            principal: [
                "Flexão Controlada: 4x12", 
                "Barra: 3x6", 
                "Abdominal V-UP: 3x15", 
                "Tiros: 5x400m"
            ]
        },
        fortalecimento: { titulo: "EXPLOSÃO", foco: "Pico", aquecimento: ["Mobilidade"], principal: ["Salto Vertical: 4x8", "Flexão Pliométrica: 3x6"] }
    }
};

/* =========================================
   APP LOGIC
   ========================================= */
const app = {
    data: { nivel: null, dia: 1, nome: 'Guerreiro' },

    init: function() {
        if(localStorage.getItem('taf_token')) {
            this.loadData();
            if (this.data.nivel) this.showScreen('screen-dashboard');
            else this.showScreen('screen-onboarding');
        } else {
            this.showScreen('screen-login');
        }
        this.updateQuote();
    },

    showScreen: function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    login: function() {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;
        
        // Login Simples de Validação
        if(email.includes('@') && pass.length > 0) {
            localStorage.setItem('taf_token', 'valid');
            localStorage.setItem('taf_user', email.split('@')[0]);
            this.init();
        } else {
            alert('Preencha e-mail e senha.');
        }
    },

    processOnboarding: function() {
        const run = parseFloat(document.getElementById('test-run').value);
        const pushups = parseInt(document.getElementById('test-pushups').value);
        const abs = parseInt(document.getElementById('test-abs').value);

        if(!run || !pushups || !abs) { alert("Preencha todos os campos!"); return; }

        let nivel = 'INICIANTE';
        if (pushups > 30 && abs > 40 && run < 5.0) nivel = 'AVANCADO';
        else if (pushups >= 15 && abs >= 25 && run <= 7.0) nivel = 'INTERMEDIARIO';

        localStorage.setItem('taf_level', nivel);
        localStorage.setItem('taf_day', 1);
        this.loadData();
        this.showScreen('screen-dashboard');
    },

    loadData: function() {
        this.data.nivel = localStorage.getItem('taf_level');
        this.data.dia = parseInt(localStorage.getItem('taf_day')) || 1;
        
        if(this.data.nivel) {
            document.getElementById('user-rank').innerText = this.data.nivel;
            document.getElementById('user-level-display').innerText = `NÍVEL: ${this.data.nivel}`;
            
            const pct = (this.data.dia / 90) * 100;
            document.getElementById('progress-text').innerText = `Dia ${this.data.dia} de 90`;
            document.getElementById('global-progress').style.width = `${pct}%`;
            
            this.updateMissionCard();
        }
    },

    updateMissionCard: function() {
        const treino = this.getTreinoDoDia();
        if (treino === 'descanso') {
            document.getElementById('today-workout-title').innerText = "DESCANSO";
            document.getElementById('today-workout-desc').innerText = "Recuperação Total";
        } else {
            const db = TREINOS[this.data.nivel] || TREINOS['INICIANTE'];
            const t = db[treino];
            document.getElementById('today-workout-title').innerText = t.titulo;
            document.getElementById('today-workout-desc').innerText = t.foco;
        }
    },

    getTreinoDoDia: function() {
        const dia = this.data.dia % 7;
        if ([1,3,5].includes(dia)) return 'padrao';
        if ([2,4,6].includes(dia)) return 'fortalecimento';
        return 'descanso';
    },

    openWorkout: function() {
        const tipo = this.getTreinoDoDia();
        if (tipo === 'descanso') { alert("Dia de Descanso! Foque na dieta."); return; }

        const db = TREINOS[this.data.nivel] || TREINOS['INICIANTE'];
        const treino = db[tipo];
        
        document.getElementById('warmup-list').innerHTML = treino.aquecimento.map(i => `<li>${i}</li>`).join('');
        
        // Gera lista com Dropdown de explicação
        const mainContainer = document.getElementById('main-list-container');
        mainContainer.innerHTML = treino.principal.map(exercicio => {
            const nomeBase = exercicio.split(':')[0].trim();
            // Procura explicação parcial no guia
            let desc = "Execute com atenção.";
            for (const key in EXERCISE_GUIDE) {
                if (nomeBase.includes(key)) desc = EXERCISE_GUIDE[key];
            }

            return `
            <details class="exercise-detail">
                <summary>
                    <span>${exercicio}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </summary>
                <p class="technique-desc">💡 <strong>TÉCNICA:</strong> ${desc}</p>
            </details>`;
        }).join('');

        document.getElementById('modal-title').innerText = `DIA ${this.data.dia}`;
        document.getElementById('modal-workout').classList.add('active');
    },

    openModal: (id) => document.getElementById(id).classList.add('active'),
    closeModal: (id) => document.getElementById(id).classList.remove('active'),

    completeMission: function() {
        if(confirm("Missão cumprida?")) {
            localStorage.setItem('taf_day', this.data.dia + 1);
            this.closeModal('modal-workout');
            this.loadData();
            alert("PROGRESSO REGISTRADO!");
        }
    },

    resetDay: function() {
        if(confirm("Resetar para o Dia 1?")) {
            localStorage.setItem('taf_day', 1);
            this.loadData();
        }
    },

    logout: function() {
        if(confirm("Sair?")) {
            localStorage.clear();
            location.reload();
        }
    },

    updateQuote: function() {
        const random = Math.floor(Math.random() * QUOTES.length);
        document.getElementById('daily-quote').innerText = `"${QUOTES[random]}"`;
    },

    // CALCULADORA SIMPLES (Lógica Pág 6)
    calculateScore: function() {
        const flex = parseInt(document.getElementById('calc-flex').value) || 0;
        const abs = parseInt(document.getElementById('calc-abs').value) || 0;
        const run = parseFloat(document.getElementById('calc-run').value) || 15;

        // Lógica simplificada para demonstração
        // Pontuação base arbitrária para MVP
        let pontos = 0;
        pontos += flex * 2; // Ex: 20 flex = 40 pts
        pontos += abs * 2;  // Ex: 30 abs = 60 pts
        if (run < 13) pontos += 50;
        else if (run < 15) pontos += 30;

        const resultBox = document.getElementById('calc-result');
        const scoreText = document.getElementById('score-text');
        const statusText = document.getElementById('score-status');

        resultBox.style.display = 'block';
        scoreText.innerText = pontos + " PONTOS";

        if (pontos > 150) {
            statusText.innerText = "APROVADO (SIMULAÇÃO)";
            statusText.style.color = "#10B981";
        } else {
            statusText.innerText = "RISCO DE REPROVAÇÃO";
            statusText.style.color = "#EF4444";
        }
    }
};

window.onload = () => app.init();
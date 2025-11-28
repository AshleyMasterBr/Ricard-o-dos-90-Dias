/* =========================================
   GUIA DE TÉCNICA (Limpo e Direto)
   ========================================= */
const EXERCISE_GUIDE = {
    "Flexão": "Mãos alinhadas com ombros. Corpo em linha reta. Desça até o peito aproximar do solo e suba completamente.",
    "Barra": "Inicie com braços estendidos. Suba até o queixo passar da barra. Não balance o corpo (kipping).",
    "Abdominal": "Deitado, suba o tronco e toque as mãos nos pés ou tornozelos. Mantenha o movimento contínuo.",
    "Corrida": "Mantenha a postura ereta e olhar para frente. Passada natural. Controle a respiração pelo nariz e boca.",
    "Agachamento": "Pés na largura dos ombros. Mantenha a coluna reta e o peito aberto. Desça até as coxas ficarem paralelas ao chão."
};

/* =========================================
   FRASES DO RICARDO
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
                "Barra Fixa: 3x Máx (ou Negativa - segure a descida)",
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
                "Barra: 3x6 (Pausa 3s no topo)", 
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
   SISTEMA OPERACIONAL DO APP
   ========================================= */
const app = {
    data: { nivel: null, dia: 1, nome: 'Guerreiro' },

    // MANTENHA O SEU LINK AQUI:
    apiUrl: 'https://script.google.com/macros/s/AKfycbziybWh6rOcZ-KFHnq6X6hkMkxweu0GL_pPo9Of_6NBE-7SAGzVU5Tl1cNlno2IE28/exec',

    init: function() {
        if(localStorage.getItem('taf_token')) {
            this.loadData();
            if (this.data.nivel) {
                this.showScreen('screen-dashboard');
            } else {
                this.showScreen('screen-onboarding');
            }
        } else {
            this.showScreen('screen-login');
        }
        this.updateQuote();
    },

    showScreen: function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        window.scrollTo(0, 0);
    },

    // --- LOGIN REAL ---
    login: function() {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();
        const btn = document.querySelector('.btn-primary');
        const originalText = btn.innerHTML;

        if(!email || !pass) {
            alert('⚠️ Preencha e-mail e senha.');
            return;
        }

        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> CONECTANDO...';
        btn.disabled = true;

        fetch(this.apiUrl, {
            method: 'POST',
            redirect: "follow", 
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ email: email, senha: pass })
        })
        .then(response => response.json())
        .then(data => {
            if(data.result === 'sucesso' || data.result === 'success') {
                localStorage.setItem('taf_token', 'valid_secure');
                localStorage.setItem('taf_user_name', data.nome); 
                this.data.nome = data.nome;
                
                if(!localStorage.getItem('taf_level')) {
                    this.showScreen('screen-onboarding');
                } else {
                    location.reload();
                }
            } else {
                const erroMsg = data.msg || data.mensagem || "Erro desconhecido";
                alert('🚫 ' + erroMsg);
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('⚠️ Erro de conexão. Tente novamente.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    },

    processOnboarding: function() {
        const run = parseFloat(document.getElementById('test-run').value);
        const pushups = parseInt(document.getElementById('test-pushups').value);
        const abs = parseInt(document.getElementById('test-abs').value);

        if(!run || !pushups || !abs) { alert("Preencha todos os campos para gerar o plano!"); return; }

        let nivelCalculado = 'INICIANTE';
        // Critérios de Nivelamento
        if (pushups > 30 && abs > 40 && run < 5.0) nivelCalculado = 'AVANCADO';
        else if (pushups >= 15 && abs >= 25 && run <= 7.0) nivelCalculado = 'INTERMEDIARIO';

        localStorage.setItem('taf_level', nivelCalculado);
        localStorage.setItem('taf_day', 1);
        
        location.reload();
    },

    loadData: function() {
        this.data.nivel = localStorage.getItem('taf_level');
        this.data.dia = parseInt(localStorage.getItem('taf_day')) || 1;
        this.data.nome = localStorage.getItem('taf_user_name') || 'Guerreiro';
        
        if(this.data.nivel) {
            document.getElementById('user-rank').innerText = this.data.nome.split(' ')[0].toUpperCase(); 
            document.getElementById('user-level-display').innerText = `NÍVEL: ${this.data.nivel}`;
            
            const pct = (this.data.dia / 90) * 100;
            document.getElementById('progress-text').innerText = `Dia ${this.data.dia} de 90`;
            document.getElementById('global-progress').style.width = `${pct}%`;
            
            this.updateMissionCard();
        }
    },

    updateMissionCard: function() {
        const treino = this.getTreinoDoDia();
        const tituloEl = document.getElementById('today-workout-title');
        const descEl = document.getElementById('today-workout-desc');

        if (treino === 'descanso') {
            tituloEl.innerText = "DESCANSO";
            descEl.innerText = "Recuperação Total (Sono + Dieta)";
        } else {
            const db = TREINOS[this.data.nivel] || TREINOS['INICIANTE'];
            const t = db[treino];
            tituloEl.innerText = t.titulo;
            descEl.innerText = "Foco: " + t.foco;
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
        if (tipo === 'descanso') { alert("Hoje é dia de Descanso. Aproveite para visualizar o sucesso."); return; }

        const db = TREINOS[this.data.nivel] || TREINOS['INICIANTE'];
        const treino = db[tipo];
        
        document.getElementById('warmup-list').innerHTML = treino.aquecimento.map(i => `<li>${i}</li>`).join('');
        
        const mainContainer = document.getElementById('main-list-container');
        mainContainer.innerHTML = treino.principal.map(exercicio => {
            const nomeBase = exercicio.split(':')[0].trim();
            let desc = "Execute com foco na técnica.";
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
        if(confirm("Confirmar missão cumprida?")) {
            localStorage.setItem('taf_day', this.data.dia + 1);
            this.closeModal('modal-workout');
            this.loadData();
            alert("PROGRESSO SALVO! O dia avançou.");
        }
    },

    resetDay: function() {
        if(confirm("ATENÇÃO: Reiniciar para o Dia 1?")) {
            localStorage.setItem('taf_day', 1);
            this.loadData();
        }
    },

// --- CONFETE TÁTICO ---
    triggerConfetti: function() {
        // Efeito de explosão militar (vermelho e preto)
        var end = Date.now() + (2 * 1000);
        var colors = ['#EF4444', '#ffffff', '#000000'];

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    },

    // --- SISTEMA DE BACKUP (SALVAR PROGRESSO) ---
    exportData: function() {
        const data = {
            nivel: localStorage.getItem('taf_level'),
            dia: localStorage.getItem('taf_day'),
            nome: localStorage.getItem('taf_user_name')
        };
        // Cria um código em Base64 (parece um token)
        const codigo = btoa(JSON.stringify(data));
        prompt("Copie este código e guarde em local seguro:", codigo);
    },

    importData: function() {
        const codigo = prompt("Cole seu código de backup aqui:");
        if (codigo) {
            try {
                const data = JSON.parse(atob(codigo));
                localStorage.setItem('taf_level', data.nivel);
                localStorage.setItem('taf_day', data.dia);
                localStorage.setItem('taf_user_name', data.nome);
                alert("DADOS RECUPERADOS COM SUCESSO!");
                location.reload();
            } catch (e) {
                alert("Código inválido.");
            }
        }
    },
    
    logout: function() {
        if(confirm("Sair do sistema?")) {
            localStorage.clear(); 
            location.reload();
        }
    },

    updateQuote: function() {
        const random = Math.floor(Math.random() * QUOTES.length);
        document.getElementById('daily-quote').innerText = `"${QUOTES[random]}"`;
    },

    calculateScore: function() {
        const flex = parseInt(document.getElementById('calc-flex').value) || 0;
        const abs = parseInt(document.getElementById('calc-abs').value) || 0;
        const run = parseFloat(document.getElementById('calc-run').value) || 15;

        let pontos = 0;
        if(flex > 15) pontos += (flex - 15) * 2;
        if(abs > 25) pontos += (abs - 25) * 2;
        if (run < 12) pontos += 80;
        else if (run < 13) pontos += 60;
        else if (run < 14) pontos += 40;
        else if (run < 15) pontos += 20;

        const resultBox = document.getElementById('calc-result');
        const scoreText = document.getElementById('score-text');
        const statusText = document.getElementById('score-status');

        resultBox.style.display = 'block';
        scoreText.innerText = pontos + " PONTOS (EST.)";

        if (pontos >= 100) {
            statusText.innerText = "APROVADO";
            statusText.style.color = "#10B981"; 
        } else {
            statusText.innerText = "REPROVADO - TREINE MAIS";
            statusText.style.color = "#EF4444"; 
        }
    }
};

window.onload = () => app.init();
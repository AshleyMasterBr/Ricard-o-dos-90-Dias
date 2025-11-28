/* =========================================
   BANCO DE DADOS TÁTICO (Baseado no PDF)
   ========================================= */
const TREINOS = {
    // NÍVEL 1: INICIANTE (Mês 1 - Pág 24)
    'INICIANTE': {
        padrao: {
            titulo: "ADAPTAÇÃO TÉCNICA",
            foco: "Resistência Base",
            aquecimento: [
                "5 min Caminhada/Trote Leve",
                "10 Agachamentos + 10 Polichinelos",
                "Mobilidade Articular (Ombros/Quadril)"
            ],
            principal: [
                "Barra Fixa (ou Negativa): 3x Máx (Segura 5s na descida)",
                "Flexão de Braço: 4x Máx (Min 8-10 reps)",
                "Abdominal Remador: 3 séries de 15 reps",
                "Corrida: 800m Leve + 4 Tiros de 100m (30s descanso)"
            ]
        },
        fortalecimento: {
            titulo: "FORTALECIMENTO BASE",
            foco: "Prevenção de Lesões",
            aquecimento: ["5 min Trote", "Mobilidade Geral"],
            principal: [
                "Agachamento Livre: 3x12",
                "Afundo: 3x10 (cada perna)",
                "Prancha Frontal: 3x30s",
                "Stiff: 3x12"
            ]
        }
    },

    // NÍVEL 2: INTERMEDIÁRIO (Mês 2 - Pág 25)
    'INTERMEDIARIO': {
        padrao: {
            titulo: "DESENVOLVIMENTO",
            foco: "Aumento de Volume",
            aquecimento: ["6 min Trote Progressivo", "10 Burpees Leves"],
            principal: [
                "Flexão de Braço: 4x Máx (Min 12 reps)",
                "Barra Fixa: 3x6 (Pausa 3s no meio)",
                "Abdominal Remador (Carga Leve): 3x20",
                "Corrida: 4 Tiros de 200m (1 min descanso)"
            ]
        },
        fortalecimento: {
            titulo: "FORÇA FUNCIONAL",
            foco: "Potência",
            aquecimento: ["Mobilidade Ombros/Quadril", "3x10 Jumping Jacks"],
            principal: [
                "Agachamento com Carga: 4x10",
                "Remada Unilateral: 3x12",
                "Flexão Inclinada: 3x10",
                "Prancha com Elevação: 3x30s"
            ]
        }
    },

    // NÍVEL 3: AVANÇADO (Mês 3 - Pág 26)
    'AVANCADO': {
        padrao: {
            titulo: "PERFORMANCE TAF",
            foco: "Simulação Real",
            aquecimento: ["8 min Corrida Progressiva", "15 Mountain Climbers"],
            principal: [
                "Flexão Tempo Controlado: 4x12 (2s desce / 1s sobe)",
                "Barra Fixa: 3x6 (Com carga ou isometria topo)",
                "Abdominal V-UP: 3x15",
                "Corrida: 5 Tiros de 400m (1 min descanso)"
            ]
        },
        fortalecimento: {
            titulo: "POTÊNCIA EXPLOSIVA",
            foco: "Pico de Força",
            aquecimento: ["Mobilidade Completa", "Ativação Específica"],
            principal: [
                "Agachamento com Salto: 4x8",
                "Flexão Pliométrica (Explosiva): 3x6",
                "Russian Twist: 3x20",
                "Burpee Pull-up: 3x6"
            ]
        }
    }
};

/* =========================================
   SISTEMA OPERACIONAL DO APP
   ========================================= */
const app = {
    data: {
        nivel: null,
        dia: 1,
        nome: 'Guerreiro'
    },

    // Inicialização
    init: function() {
        const token = localStorage.getItem('taf_token');
        
        if (token) {
            this.loadData();
            
            // Se já tem nível, vai pro Dashboard. Se não, Onboarding.
            if (this.data.nivel) {
                this.showScreen('screen-dashboard');
            } else {
                this.showScreen('screen-onboarding');
            }
        } else {
            this.showScreen('screen-login');
        }
    },

    // Navegação de Telas
    showScreen: function(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        window.scrollTo(0, 0);
    },

    // Lógica de Login (Simulada)
    login: function() {
        const code = document.getElementById('access-code').value;
        
        // Código Mestre "1010" (Ou qualquer regra que você queira)
        if (code.length >= 4) { 
            localStorage.setItem('taf_token', 'ativo');
            this.init();
        } else {
            alert('⚠️ CÓDIGO INVÁLIDO. Verifique seu e-mail de acesso.');
        }
    },

    logout: function() {
        if(confirm("Tem certeza que deseja sair?")) {
            localStorage.clear();
            location.reload();
        }
    },

    // LÓGICA DE CLASSIFICAÇÃO (O Cérebro da Pág 8)
    processOnboarding: function() {
        const run = parseFloat(document.getElementById('test-run').value) || 10;
        const pushups = parseInt(document.getElementById('test-pushups').value) || 0;
        const abs = parseInt(document.getElementById('test-abs').value) || 0;

        let nivelCalculado = 'INICIANTE';

        // Critérios do PDF (Pág 8):
        // Avançado: >30 flex, >40 abs, <5 min corrida
        // Intermediário: 15-30 flex, 25-40 abs, 5-7 min corrida
        if (pushups > 30 && abs > 40 && run < 5.0) {
            nivelCalculado = 'AVANCADO';
        } else if (pushups >= 15 && abs >= 25 && run <= 7.0) {
            nivelCalculado = 'INTERMEDIARIO';
        }

        // Salva e Redireciona
        localStorage.setItem('taf_level', nivelCalculado);
        localStorage.setItem('taf_day', 1);
        
        this.loadData();
        this.showScreen('screen-dashboard');
    },

    // Carrega dados do LocalStorage
    loadData: function() {
        this.data.nivel = localStorage.getItem('taf_level');
        this.data.dia = parseInt(localStorage.getItem('taf_day')) || 1;

        // Atualiza a Interface
        if (this.data.nivel) {
            document.getElementById('user-rank').innerText = this.data.nivel;
            document.getElementById('user-level-display').innerText = `NÍVEL: ${this.data.nivel}`;
            
            // Barra de Progresso
            const porcentagem = (this.data.dia / 90) * 100;
            document.getElementById('progress-text').innerText = `DIA ${this.data.dia} DE 90`;
            document.getElementById('global-progress').style.width = `${porcentagem}%`;

            this.updateMissionCard();
        }
    },

    // Define qual treino mostrar hoje
    updateMissionCard: function() {
        const tipoTreino = this.getTreinoDoDia(this.data.dia);
        const db = TREINOS[this.data.nivel];
        
        if (db && db[tipoTreino]) {
            document.getElementById('today-workout-title').innerText = db[tipoTreino].titulo;
            document.getElementById('today-workout-desc').innerText = "Foco: " + db[tipoTreino].foco;
        } else {
            // Dias de Descanso (Domingo)
            document.getElementById('today-workout-title').innerText = "DESCANSO TOTAL";
            document.getElementById('today-workout-desc').innerText = "Recuperação Muscular e Mental";
        }
    },

    // Lógica de Calendário (Pág 12)
    // Seg/Qua/Sex = Específico (padrao)
    // Ter/Qui/Sab = Fortalecimento
    // Dom = Descanso
    getTreinoDoDia: function(diaNumero) {
        const ciclo = diaNumero % 7; 
        if (ciclo === 1 || ciclo === 3 || ciclo === 5) return 'padrao';
        if (ciclo === 2 || ciclo === 4 || ciclo === 6) return 'fortalecimento';
        return 'descanso';
    },

    // Abre o Modal com os detalhes
    openWorkout: function() {
        const tipo = this.getTreinoDoDia(this.data.dia);
        if (tipo === 'descanso') {
            alert("Hoje é dia de Descanso, Guerreiro. Foque na dieta e sono.");
            return;
        }

        const treino = TREINOS[this.data.nivel][tipo];
        
        // Renderiza Aquecimento
        const listaWarm = document.getElementById('warmup-list');
        listaWarm.innerHTML = treino.aquecimento.map(item => `<li>${item}</li>`).join('');

        // Renderiza Principal
        const listaMain = document.getElementById('main-list');
        listaMain.innerHTML = treino.principal.map(item => 
            `<li>
                <span class="ex-name">${item.split(':')[0]}</span>
                <span class="rep-count">${item.split(':')[1] || 'Executar'}</span>
            </li>`
        ).join('');

        document.getElementById('modal-title').innerText = `DIA ${this.data.dia} - ${treino.titulo}`;
        document.getElementById('modal-workout').classList.add('active');
    },

    // Ferramentas de Modal
    openModal: function(modalId) {
        document.getElementById(modalId).classList.add('active');
    },

    closeModal: function(modalId) {
        document.getElementById(modalId).classList.remove('active');
    },

    // Completar Missão (Avança o dia)
    completeMission: function() {
        if(confirm("Confirmar conclusão da missão de hoje?")) {
            // Efeito visual / Som poderia entrar aqui
            const novoDia = this.data.dia + 1;
            localStorage.setItem('taf_day', novoDia);
            
            this.closeModal('modal-workout');
            this.loadData(); // Recarrega a tela com o dia seguinte
            
            alert(`PARABÉNS! DIA ${this.data.dia} CONCLUÍDO.\nPrepare-se para amanhã.`);
        }
    },

    resetDay: function() {
        if(confirm("ATENÇÃO: Isso vai reiniciar todo o seu progresso para o Dia 1. Confirmar?")) {
            localStorage.setItem('taf_day', 1);
            this.loadData();
        }
    }
};

/* =========================================
   TIMER TÁTICO (Cronômetro)
   ========================================= */
const timer = {
    interval: null,
    seconds: 0,
    isRunning: false,
    
    start: function() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.interval = setInterval(() => {
            this.seconds++;
            this.updateDisplay();
        }, 1000);
    },
    
    pause: function() {
        this.isRunning = false;
        clearInterval(this.interval);
    },
    
    reset: function() {
        this.pause();
        this.seconds = 0;
        this.updateDisplay();
    },
    
    updateDisplay: function() {
        const m = Math.floor(this.seconds / 60).toString().padStart(2, '0');
        const s = (this.seconds % 60).toString().padStart(2, '0');
        document.getElementById('timer-display').innerText = `${m}:${s}`;
    }
};

// Inicia o App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
/* =========================================
   GUIA DE TÉCNICA (Extraído do PDF)
   ========================================= */
const EXERCISE_GUIDE = {
    "Flexão": "Mãos alinhadas com ombros. Corpo em linha reta. Desça até o peito aproximar do solo e suba completamente.",
    "Barra": "Inicie com braços estendidos. Suba até o queixo passar da barra. Não balance o corpo (kipping).",
    "Abdominal": "Deitado, suba o tronco e toque as mãos nos pés ou tornozelos. Mantenha o movimento contínuo.",
    "Corrida": "Mantenha a postura ereta e olhar para frente. Passada natural. Controle a respiração pelo nariz e boca.",
    "Agachamento": "Pés na largura dos ombros. Mantenha a coluna reta e o peito aberto. Desça até as coxas ficarem paralelas ao chão.",
    "Burpee": "Agache, jogue os pés para trás (prancha), faça uma flexão, traga os pés e salte batendo palma.",
    "Prancha": "Cotovelos no chão. Corpo reto do ombro ao calcanhar. Contráia abdômen e glúteos.",
    "Natação": "Use como recuperação ativa. Foco na técnica e respiração, não apenas velocidade."
};

const QUOTES = [
    "Disciplina é liberdade.",
    "Seu corpo só vai onde sua mente permite.",
    "Não precisa ser perfeito, só precisa ser melhor que ontem.",
    "Motivação passa. Disciplina fica.",
    "A dor é temporária. A glória é eterna."
];

/* =========================================
   BANCO DE DADOS REAL (CÓPIA FIEL DO PDF)
   ========================================= */
const TREINOS = {
    // MÊS 1 - INICIANTE (Baseado na Pág 24)
    'INICIANTE': {
        1: { // Segunda
            titulo: "T1: ESPECÍFICO + NATAÇÃO",
            foco: "Adaptação Técnica",
            aquecimento: ["5' Caminhada/Trote", "10 Agachamentos + 10 Polichinelos", "Mobilidade Articular"],
            principal: [
                "Barra Fixa (ou Negativa): 3x Máx (Segura 5s na descida)",
                "Flexão de Braço: 4x Máx (Min 8-10 reps)",
                "Abdominal Remador: 3 séries de 15 reps",
                "Corrida: 800m Leve + 4 Tiros de 100m (30s descanso)",
                "Natação: 4x25m crawl + 4x15m pernada"
            ]
        },
        2: { // Terça
            titulo: "F1: FORTALECIMENTO INFERIOR",
            foco: "Base de Força",
            aquecimento: ["5' Trote", "Mobilidade Geral"],
            principal: [
                "Agachamento Livre: 3x12",
                "Afundo: 3x10 (cada perna)",
                "Stiff: 3x12",
                "Prancha toque no ombro: 3x10"
            ]
        },
        3: { // Quarta
            titulo: "T2: ESPECÍFICO + VELOCIDADE",
            foco: "Técnica de Corrida",
            aquecimento: ["5' Trote Leve", "10 Jumping Jacks + 5 Burpees"],
            principal: [
                "Educativos Corrida: Skipping, Joelho Alto (2x10m)",
                "Tiros de Corrida: 4x 200m (Intervalo 1'30)",
                "Flexão de Braço: 3x Máx",
                "Prancha: 3x 30s"
            ]
        },
        4: { // Quinta
            titulo: "F2: FORTALECIMENTO SUPERIOR",
            foco: "Membros Superiores",
            aquecimento: ["Mobilidade de Ombros", "10 Flexões com Joelho"],
            principal: [
                "Remada Baixa (ou Curvada): 3x12",
                "Flexão com apoio no joelho: 3x10",
                "Tríceps Banco: 3x15",
                "Prancha Frontal: 3x40s"
            ]
        },
        5: { // Sexta
            titulo: "T3: CIRCUITO AMRAP",
            foco: "Resistência",
            aquecimento: ["5' Mobilidade", "10 Agachamentos + 10 Flexões Quadril"],
            principal: [
                "AMRAP 10' (Máximo de Rounds em 10 min):",
                "- 5 Flexões",
                "- 10 Agachamentos",
                "- 15 Abdominais",
                "Corrida Final: 1km Leve",
                "Natação: 4x25m (Costas ou Crawl)"
            ]
        },
        6: { // Sábado
            titulo: "F3: CORE & RECUPERAÇÃO",
            foco: "Estabilidade",
            aquecimento: ["Alongamento Leve"],
            principal: [
                "Ponte (Elevação Pélvica): 3x20s",
                "Dead Bug: 3x10",
                "Mobilidade: 10 min",
                "Caminhada: 10 min"
            ]
        }
    },

    // MÊS 2 - INTERMEDIÁRIO (Baseado na Pág 25 - Semana 5)
    'INTERMEDIARIO': {
        1: { // Segunda
            titulo: "T13: VOLUME & RITMO",
            foco: "Resistência Específica",
            aquecimento: ["6' Trote Progressivo", "10 Burpees + 15 Mountain Climbers"],
            principal: [
                "Flexão: 4x Máx (Min 12 reps)",
                "Barra Fixa: 3x6 (Pausa 3s no meio)",
                "Abdominal Remador Carga: 3x20",
                "Corrida: 4 Tiros de 200m (1' descanso)"
            ]
        },
        2: { // Terça
            titulo: "F13: FORÇA FUNCIONAL",
            foco: "Pernas Potentes",
            aquecimento: ["Mobilidade Dinâmica"],
            principal: [
                "Agachamento com Carga: 4x10",
                "Afundo com Passada: 3x12",
                "Stiff: 4x10",
                "Abdução de Quadril: 3x15"
            ]
        },
        3: { // Quarta
            titulo: "T14: CIRCUITO EMOM",
            foco: "Intensidade",
            aquecimento: ["5' Corrida", "3x10 Jumping Jacks + 10 Agach"],
            principal: [
                "EMOM 12' (A cada minuto, faça):",
                "- Min 1: 10 Flexões",
                "- Min 2: 15 Abdominais",
                "- Min 3: 150m Corrida",
                "(Repetir 4 ciclos completos)",
                "Natação: 8x25m Crawl"
            ]
        },
        4: { // Quinta
            titulo: "F14: SUPERIORES & CORE",
            foco: "Força de Puxada",
            aquecimento: ["Rotação de Ombros"],
            principal: [
                "Remada com Halteres: 3x12",
                "Flexão Inclinada: 3x10",
                "Tríceps Banco Unilateral: 3x12",
                "Prancha com Elevação: 3x30s"
            ]
        },
        5: { // Sexta
            titulo: "T15: DESAFIO FOR TIME",
            foco: "Velocidade",
            aquecimento: ["6' Trote variado", "2x (10 Agach + 10 Flex + 10 Abs)"],
            principal: [
                "CRONOMETRADO (O mais rápido possível):",
                "- 20 Flexões",
                "- 30 Abdominais",
                "- 1.5km Corrida",
                "Natação: 6x25m Crawl Médio"
            ]
        },
        6: { // Sábado
            titulo: "F15: CORE EXPLOSIVO",
            foco: "Potência",
            aquecimento: ["Mobilidade"],
            principal: [
                "Agachamento com Salto: 3x8",
                "Burpee Técnico: 3x10",
                "Abdominal V-UP: 3x15",
                "Dead Bug com Peso: 3x10"
            ]
        }
    },

    // MÊS 3 - AVANÇADO (Baseado na Pág 26 - Semana 9)
    'AVANCADO': {
        1: { // Segunda
            titulo: "T25: ALTA PERFORMANCE",
            foco: "Simulação Real",
            aquecimento: ["8' Corrida Progr.", "15 Mountain + 10 Burpees"],
            principal: [
                "Flexão Tempo Controlado: 4x12 (2s desce/1s sobe)",
                "Barra Fixa: 3x6 (Carga ou Isometria topo)",
                "Abdominal V-UP Carga: 3x15",
                "Corrida: 5 Tiros de 400m (Descanso 1')",
                "Natação: 3x100m Crawl"
            ]
        },
        2: { // Terça
            titulo: "F25: FORÇA ELITE",
            foco: "Potência Total",
            aquecimento: ["Ativação Completa"],
            principal: [
                "Clean com Kettlebell (ou Mochila): 3x8",
                "Agachamento Overhead: 3x10",
                "Prancha Lateral Elevação: 3x15",
                "Burpee com Salto Alto: 3x10"
            ]
        },
        3: { // Quarta
            titulo: "T26: CIRCUITO DE GUERRA",
            foco: "Resistência Mental",
            aquecimento: ["6' Corrida Variada", "Mobilidade Específica"],
            principal: [
                "FOR TIME (2 Rounds):",
                "- 15 Flexões",
                "- 20 Abdominais",
                "- 800m Corrida",
                "Natação: 4x50m Crawl"
            ]
        },
        4: { // Quinta
            titulo: "F26: POTÊNCIA SUPERIOR",
            foco: "Explosão",
            aquecimento: ["Mobilidade Tronco"],
            principal: [
                "Remada Unilateral: 3x12",
                "Flexão Pliométrica (Palma): 3x6",
                "Prancha Toque Alternado: 3x20",
                "Abdominal Medicine Ball: 3x15"
            ]
        },
        5: { // Sexta
            titulo: "T27: SIMULADO TAF",
            foco: "Teste Real",
            aquecimento: ["5' Trote", "Ativação Simulado"],
            principal: [
                "Flexão: Máx em 1 min (Anote)",
                "Descanso 3 min",
                "Abdominal: Máx em 1 min (Anote)",
                "Descanso 5 min",
                "Corrida: 2km (Anote Tempo)",
                "Natação: 2x100m Leve"
            ]
        },
        6: { // Sábado
            titulo: "F27: FUNCIONAL FINAL",
            foco: "Ajuste Fino",
            aquecimento: ["Alongamento"],
            principal: [
                "Agachamento com Salto: 4x8",
                "Flexão Diamond (Fechada): 3x10",
                "Russian Twist: 3x20",
                "Burpee Pull-up: 3x6"
            ]
        }
    }
};

/* =========================================
   LÓGICA DO APP
   ========================================= */
const app = {
    data: { nivel: null, dia: 1, nome: 'Guerreiro' },
    apiUrl: 'https://script.google.com/macros/s/AKfycbwxlJH7xcKbml9PP_2NVmfBUtAUqBstBQCQ0bBql-8DMlYZZW8cZ0uNx6EyPbdb98Zn/exec',

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

    showScreen: (id) => {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    login: function() {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();
        const btn = document.querySelector('.btn-primary');
        const originalText = btn.innerHTML;

        if(!email || !pass) { alert('⚠️ Preencha e-mail e senha.'); return; }
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> CONECTANDO...'; btn.disabled = true;

        fetch(this.apiUrl, {
            method: 'POST',
            redirect: "follow", 
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ email: email, senha: pass })
        })
        .then(r => r.json())
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
                btn.innerHTML = originalText; btn.disabled = false;
            }
        })
        .catch(e => { alert('⚠️ Erro de conexão.'); btn.innerHTML = originalText; btn.disabled = false; });
    },

    processOnboarding: function() {
        const run = parseFloat(document.getElementById('test-run').value);
        const pushups = parseInt(document.getElementById('test-pushups').value);
        const abs = parseInt(document.getElementById('test-abs').value);

        if(!run || !pushups || !abs) { alert("Preencha todos os campos para gerar o plano!"); return; }

        let nivelCalculado = 'INICIANTE';
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
            const primeiroNome = this.data.nome.split(' ')[0].toUpperCase();
            document.getElementById('user-rank').innerText = primeiroNome;
            document.getElementById('user-level-display').innerText = this.data.nivel;
            document.getElementById('progress-text').innerText = `Dia ${this.data.dia}/90`;
            document.getElementById('global-progress').style.width = `${(this.data.dia/90)*100}%`;
            this.updateMissionCard();
        }
    },

    updateMissionCard: function() {
        const treino = this.getTreinoDoDia();
        const tEl = document.getElementById('today-workout-title');
        const dEl = document.getElementById('today-workout-desc');

        if (treino === 'descanso') {
            tEl.innerText = "DESCANSO";
            dEl.innerText = "Recuperação Total (Domingo)";
        } else {
            tEl.innerText = treino.titulo;
            dEl.innerText = "Foco: " + treino.foco;
        }
    },

    getTreinoDoDia: function() {
        // Mapeia Dia 1..90 para Segunda..Domingo
        // Assumindo que Dia 1 é Segunda-feira para simplificar a lógica de ciclo
        const diaSemana = (this.data.dia - 1) % 7 + 1; 
        // 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sab, 7=Dom (0 no resto)
        
        const db = TREINOS[this.data.nivel] || TREINOS['INICIANTE'];
        
        if (diaSemana === 7 || diaSemana === 0) return 'descanso';
        return db[diaSemana];
    },

    openWorkout: function() {
        const treino = this.getTreinoDoDia();
        if (treino === 'descanso') { alert("Dia de Descanso. Aproveite para visualizar o sucesso."); return; }

        document.getElementById('warmup-list').innerHTML = treino.aquecimento.map(i => `<li>${i}</li>`).join('');
        
        const mainContainer = document.getElementById('main-list-container');
        mainContainer.innerHTML = treino.principal.map(ex => {
            const nome = ex.split(':')[0].trim();
            let desc = "Execute com foco na técnica.";
            for(let k in EXERCISE_GUIDE) if(nome.includes(k)) desc = EXERCISE_GUIDE[k];
            return `<details class="exercise-detail"><summary><span>${ex}</span><i class="fa-solid fa-chevron-down"></i></summary><p class="technique-desc">💡 ${desc}</p></details>`;
        }).join('');
        
        document.getElementById('modal-title').innerText = `DIA ${this.data.dia} - ${treino.titulo.split(':')[0]}`;
        this.openModal('modal-workout');
    },

    openModal: (id) => document.getElementById(id).classList.add('active'),
    closeModal: (id) => document.getElementById(id).classList.remove('active'),

    completeMission: function() {
        if(confirm("Missão cumprida?")) {
            localStorage.setItem('taf_day', this.data.dia + 1);
            this.closeModal('modal-workout');
            this.loadData();
            this.triggerConfetti();
            setTimeout(() => alert("PROGRESSO REGISTRADO!"), 500);
        }
    },

    resetDay: function() {
        if(confirm("Reiniciar progresso?")) { localStorage.setItem('taf_day', 1); location.reload(); }
    },
    logout: function() {
        if(confirm("Sair?")) { localStorage.clear(); location.reload(); }
    },
    updateQuote: function() {
        document.getElementById('daily-quote').innerText = `"${QUOTES[Math.floor(Math.random()*QUOTES.length)]}"`;
    },
    triggerConfetti: function() {
        var end = Date.now() + (1000);
        var colors = ['#EF4444', '#ffffff'];
        (function frame() {
            confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
            confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    },
    exportData: function() {
        const data = btoa(JSON.stringify({n:localStorage.getItem('taf_level'), d:localStorage.getItem('taf_day'), u:localStorage.getItem('taf_user_name')}));
        prompt("Copie seu código de backup:", data);
    },
    importData: function() {
        const c = prompt("Cole o código:");
        if(c) {
            try {
                const d = JSON.parse(atob(c));
                localStorage.setItem('taf_level', d.n); localStorage.setItem('taf_day', d.d); localStorage.setItem('taf_user_name', d.u);
                location.reload();
            } catch(e) { alert("Código inválido"); }
        }
    },
    calculateScore: function() {
        const flex = parseInt(document.getElementById('calc-flex').value) || 0;
        const abs = parseInt(document.getElementById('calc-abs').value) || 0;
        const run = parseFloat(document.getElementById('calc-run').value) || 15;
        let pts = 0;
        if(flex > 15) pts += (flex-15)*2;
        if(abs > 25) pts += (abs-25)*2;
        if(run < 13) pts += 50;
        const res = document.getElementById('calc-result');
        res.style.display = 'block';
        document.getElementById('score-text').innerText = pts + " PONTOS";
        document.getElementById('score-status').innerText = pts >= 100 ? "APROVADO" : "REPROVADO";
        document.getElementById('score-status').style.color = pts >= 100 ? "#10B981" : "#EF4444";
    }
};

window.onload = () => app.init();
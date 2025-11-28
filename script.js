/* =========================================
   1. DADOS TÉCNICOS & TEXTOS (Fiel ao PDF)
   ========================================= */
const EXERCISE_GUIDE = {
    "Flexão": "Mãos alinhadas com ombros. Corpo em linha reta. Desça até o peito aproximar do solo.",
    "Barra": "Inicie com braços estendidos. Suba até o queixo passar da barra. Não balance o corpo.",
    "Abdominal": "Deitado, suba o tronco e toque as mãos nos pés. Movimento contínuo.",
    "Corrida": "Postura ereta. Passada natural. Controle a respiração.",
    "Agachamento": "Pés na largura dos ombros. Mantenha a coluna reta. Desça até 90 graus.",
    "Burpee": "Agache, jogue pés para trás, flexão, volte e salte.",
    "Natação": "Foco na técnica e respiração. Recuperação ativa."
};

const QUOTES = [
    "Disciplina é liberdade.",
    "Seu corpo só vai onde sua mente permite.",
    "Não precisa ser perfeito, só precisa ser melhor que ontem.",
    "Motivação passa. Disciplina fica.",
    "A dor é temporária. A glória é eterna."
];

/* =========================================
   2. BANCO DE TREINOS (Semana 1, 5 e 9)
   ========================================= */
const TREINOS = {
    'INICIANTE': {
        1: { titulo: "T1: ESPECÍFICO + NATAÇÃO", foco: "Adaptação", aquecimento: ["5' Trote", "10 Polichinelos"], principal: ["Barra Fixa (ou Negativa): 3x Máx", "Flexão de Braço: 4x Máx", "Abdominal Remador: 3x15", "Corrida: 800m + 4x100m", "Natação: 4x25m"] },
        2: { titulo: "F1: FORTALECIMENTO INF.", foco: "Base de Força", aquecimento: ["5' Trote", "Mobilidade"], principal: ["Agachamento: 3x12", "Afundo: 3x10", "Stiff: 3x12", "Prancha: 3x10s"] },
        3: { titulo: "T2: VELOCIDADE", foco: "Técnica", aquecimento: ["5' Trote", "10 Jumping Jacks"], principal: ["Educativos Corrida", "Tiros: 4x 200m", "Flexão: 3x Máx", "Prancha: 3x 30s"] },
        4: { titulo: "F2: FORTALECIMENTO SUP.", foco: "Membros Sup.", aquecimento: ["Mobilidade Ombros"], principal: ["Remada Baixa: 3x12", "Flexão apoio: 3x10", "Tríceps: 3x15", "Prancha: 3x40s"] },
        5: { titulo: "T3: CIRCUITO AMRAP", foco: "Resistência", aquecimento: ["5' Mobilidade"], principal: ["AMRAP 10' (5 Flex/10 Agach/15 Abs)", "Corrida: 1km Leve", "Natação: 4x25m"] },
        6: { titulo: "F3: CORE & RECUPERAÇÃO", foco: "Estabilidade", aquecimento: ["Alongamento"], principal: ["Ponte: 3x20s", "Dead Bug: 3x10", "Caminhada: 10 min"] }
    },
    'INTERMEDIARIO': {
        1: { titulo: "T13: VOLUME & RITMO", foco: "Resistência Esp.", aquecimento: ["6' Trote", "10 Burpees"], principal: ["Flexão: 4x Máx", "Barra: 3x6", "Abs Remador Carga: 3x20", "Tiros: 4x200m"] },
        2: { titulo: "F13: FORÇA FUNCIONAL", foco: "Pernas", aquecimento: ["Mobilidade"], principal: ["Agachamento Carga: 4x10", "Afundo: 3x12", "Stiff: 4x10", "Abdução: 3x15"] },
        3: { titulo: "T14: CIRCUITO EMOM", foco: "Intensidade", aquecimento: ["5' Corrida"], principal: ["EMOM 12' (10 Flex/15 Abs/150m Run)", "Natação: 8x25m"] },
        4: { titulo: "F14: SUPERIORES", foco: "Força Puxada", aquecimento: ["Rotação Ombros"], principal: ["Remada Halter: 3x12", "Flexão Inclinada: 3x10", "Tríceps: 3x12", "Prancha Elev.: 3x30s"] },
        5: { titulo: "T15: DESAFIO FOR TIME", foco: "Velocidade", aquecimento: ["6' Trote"], principal: ["CRONOMETRADO: 20 Flex/30 Abs/1.5km Run", "Natação: 6x25m"] },
        6: { titulo: "F15: CORE EXPLOSIVO", foco: "Potência", aquecimento: ["Mobilidade"], principal: ["Agachamento Salto: 3x8", "Burpee: 3x10", "Abs V-UP: 3x15", "Dead Bug Peso: 3x10"] }
    },
    'AVANCADO': {
        1: { titulo: "T25: ALTA PERFORMANCE", foco: "Simulação Real", aquecimento: ["8' Corrida"], principal: ["Flexão Tempo: 4x12", "Barra: 3x6", "Abs V-UP Carga: 3x15", "Tiros: 5x400m", "Natação: 3x100m"] },
        2: { titulo: "F25: FORÇA ELITE", foco: "Potência Total", aquecimento: ["Ativação"], principal: ["Clean Kettlebell: 3x8", "Agachamento Overhead: 3x10", "Prancha Lat.: 3x15", "Burpee Salto: 3x10"] },
        3: { titulo: "T26: CIRCUITO GUERRA", foco: "Resistência Mental", aquecimento: ["6' Corrida"], principal: ["FOR TIME 2 Rounds: 15 Flex/20 Abs/800m Run", "Natação: 4x50m"] },
        4: { titulo: "F26: POTÊNCIA SUPERIOR", foco: "Explosão", aquecimento: ["Mobilidade"], principal: ["Remada Unilateral: 3x12", "Flexão Pliométrica: 3x6", "Prancha Toque: 3x20", "Abs MedBall: 3x15"] },
        5: { titulo: "T27: SIMULADO TAF", foco: "Teste Real", aquecimento: ["Ativação"], principal: ["Flexão 1min (Máx)", "Descanso 3min", "Abs 1min (Máx)", "Descanso 5min", "Corrida 2km (Tempo)", "Natação: 2x100m"] },
        6: { titulo: "F27: FUNCIONAL FINAL", foco: "Ajuste Fino", aquecimento: ["Alongamento"], principal: ["Agachamento Salto: 4x8", "Flexão Diamond: 3x10", "Russian Twist: 3x20", "Burpee Pull-up: 3x6"] }
    }
};

/* =========================================
   3. LÓGICA DO SISTEMA
   ========================================= */
const app = {
    data: { nivel: null, dia: 1, nome: 'Guerreiro' },
    
    // SEU LINK DA API GOOGLE
    apiUrl: 'https://script.google.com/macros/s/AKfycbwI7YhYrGYCzfIXfQlBdekIk6VJibeCrPe9kdU6rp6nu3ZOnxDnhfK9i5JZJ64k9jh1/exec',

    init: function() {
        if(localStorage.getItem('taf_token')) {
            this.loadLocalData();
            this.checkDailyLock(); // Verifica trava de 24h

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
        window.scrollTo(0,0);
    },

    // --- LOGIN E SYNC ---
    login: function() {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();
        const btn = document.querySelector('.btn-primary');
        const originalText = btn.innerHTML;

        if(!email || !pass) { alert('⚠️ Preencha tudo.'); return; }
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> CONECTANDO...'; btn.disabled = true;

        fetch(this.apiUrl, {
            method: 'POST',
            redirect: "follow", 
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ acao: "login", email: email, senha: pass })
        })
        .then(r => r.json())
        .then(data => {
            if(data.result === 'sucesso' || data.result === 'success') {
                localStorage.setItem('taf_token', 'valid_secure');
                localStorage.setItem('taf_email', email);
                localStorage.setItem('taf_user_name', data.nome);
                
                if(data.nivel && data.dia) {
                    localStorage.setItem('taf_level', data.nivel);
                    localStorage.setItem('taf_day', data.dia);
                    location.reload();
                } else {
                    this.showScreen('screen-onboarding');
                }
            } else {
                alert('🚫 ' + (data.msg || data.mensagem || "Erro."));
                btn.innerHTML = originalText; btn.disabled = false;
            }
        })
        .catch(e => { alert('⚠️ Erro de conexão.'); btn.innerHTML = originalText; btn.disabled = false; });
    },

    saveCloud: function(nivel, dia) {
        const email = localStorage.getItem('taf_email');
        if(!email) return;
        fetch(this.apiUrl, {
            method: 'POST',
            redirect: "follow",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ acao: "salvar", email: email, nivel: nivel, dia: dia })
        }).then(r => console.log("Salvo Cloud"));
    },

    // --- ONBOARDING ---
    processOnboarding: function() {
        const run = parseFloat(document.getElementById('test-run').value);
        const push = parseInt(document.getElementById('test-pushups').value);
        const abs = parseInt(document.getElementById('test-abs').value);
        if(!run) return;

        let n = 'INICIANTE';
        if (push > 30 && abs > 40 && run < 5.0) n = 'AVANCADO';
        else if (push >= 15 && abs >= 25 && run <= 7.0) n = 'INTERMEDIARIO';

        localStorage.setItem('taf_level', n);
        localStorage.setItem('taf_day', 1);
        this.saveCloud(n, 1);
        location.reload();
    },

    // --- MISSÃO E TRAVA DIÁRIA ---
    checkDailyLock: function() {
        const ultimoTreino = localStorage.getItem('taf_last_training_date');
        const hoje = new Date().toLocaleDateString();
        
        const btn = document.querySelector('.mission-card');
        const status = document.querySelector('.mission-status');
        const label = document.querySelector('.mission-label');

        if (ultimoTreino === hoje) {
            btn.style.opacity = "0.6";
            btn.style.pointerEvents = "none"; 
            status.style.background = "#10B981"; 
            status.classList.remove('pulse');
            label.innerText = "MISSÃO CUMPRIDA ✔";
            label.style.color = "#10B981";
            document.getElementById('today-workout-desc').innerText = "Volte amanhã.";
        } else {
            btn.style.opacity = "1";
            btn.style.pointerEvents = "auto";
            status.style.background = "#EF4444";
            status.classList.add('pulse');
            label.innerText = "ORDEM DO DIA";
            label.style.color = "#EF4444";
        }
    },

    completeMission: function() {
        if(confirm("Missão cumprida?")) {
            const novoDia = parseInt(this.data.dia) + 1;
            
            // Salva Trava e Avanço
            localStorage.setItem('taf_last_training_date', new Date().toLocaleDateString());
            localStorage.setItem('taf_day', novoDia);
            this.data.dia = novoDia;
            
            this.saveCloud(this.data.nivel, novoDia);

            this.closeModal('modal-workout');
            this.loadLocalData(); 
            this.checkDailyLock();
            
            this.triggerConfetti();
            setTimeout(() => alert("✅ PROGRESSO SALVO NA NUVEM!"), 500);
        }
    },

    // --- INTERFACE ---
    loadLocalData: function() {
        this.data.nivel = localStorage.getItem('taf_level');
        this.data.dia = parseInt(localStorage.getItem('taf_day')) || 1;
        this.data.nome = localStorage.getItem('taf_user_name') || 'Guerreiro';
        
        if(this.data.nivel) {
            document.getElementById('user-rank').innerText = this.data.nome.split(' ')[0].toUpperCase();
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

        if (treino === 'descanso') { tEl.innerText = "DESCANSO"; dEl.innerText = "Recuperação Total (Domingo)"; }
        else {
            const t = (TREINOS[this.data.nivel] || TREINOS['INICIANTE'])[treino];
            tEl.innerText = t.titulo; dEl.innerText = "Foco: " + t.foco;
        }
    },

    getTreinoDoDia: function() {
        const dia = (this.data.dia - 1) % 7 + 1; 
        if (dia === 7) return 'descanso';
        return dia;
    },

    openWorkout: function() {
        const tipo = this.getTreinoDoDia();
        if (tipo === 'descanso') { alert("Dia de Descanso."); return; }
        const treino = (TREINOS[this.data.nivel] || TREINOS['INICIANTE'])[tipo];
        
        document.getElementById('warmup-list').innerHTML = treino.aquecimento.map(i => `<li>${i}</li>`).join('');
        document.getElementById('main-list-container').innerHTML = treino.principal.map(ex => {
            const nome = ex.split(':')[0].trim();
            let desc = "Foco na técnica.";
            for(let k in EXERCISE_GUIDE) if(nome.includes(k)) desc = EXERCISE_GUIDE[k];
            return `<details class="exercise-detail"><summary><span>${ex}</span><i class="fa-solid fa-chevron-down"></i></summary><p class="technique-desc">💡 ${desc}</p></details>`;
        }).join('');
        document.getElementById('modal-title').innerText = `DIA ${this.data.dia}`;
        this.openModal('modal-workout');
    },

    openModal: (id) => document.getElementById(id).classList.add('active'),
    closeModal: (id) => document.getElementById(id).classList.remove('active'),
    logout: function() { if(confirm("Sair?")) { localStorage.clear(); location.reload(); } },
    resetDay: function() { if(confirm("Resetar?")) { localStorage.setItem('taf_day', 1); this.saveCloud(this.data.nivel, 1); location.reload(); } },
    updateQuote: function() { document.getElementById('daily-quote').innerText = `"${QUOTES[Math.floor(Math.random()*QUOTES.length)]}"`; },
    
    triggerConfetti: function() {
        var end = Date.now() + (1000); var colors = ['#0080FF', '#ffffff'];
        (function frame() {
            confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
            confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    },

    calculateScore: function() {
        const flex = parseInt(document.getElementById('calc-flex').value) || 0;
        const abs = parseInt(document.getElementById('calc-abs').value) || 0;
        const run = parseFloat(document.getElementById('calc-run').value) || 15.0;
        let pts = 0;

        // Cálculo Fiel (Pág 6)
        if(flex >= 20) pts += 50 + ((flex-20)*5); else pts = flex*2.5;
        if(abs >= 20) pts += 50 + ((abs-20)*5); else pts = abs*2.5;
        
        let rs = run*60, bs=13*60;
        if(rs<=bs) pts += 50 + (Math.floor((bs-rs)/30)*10);
        else pts += Math.max(0, 50-((rs-bs)/10));

        const res = document.getElementById('calc-result');
        res.style.display = 'block';
        document.getElementById('score-text').innerText = Math.floor(pts) + " PTS";
        const status = document.getElementById('score-status');
        status.innerText = pts >= 250 ? "APROVADO" : "REPROVADO";
        status.style.color = pts >= 250 ? "#10B981" : "#EF4444";
    }
};

window.onload = () => {
    app.init();
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
};
/* =========================================
   1. CONFIGURAÇÕES E DADOS
   ========================================= */

// Guia Técnico (Baseado no PDF)
const EXERCISE_GUIDE = {
    "Flexão": "Mãos alinhadas com ombros. Corpo em linha reta. Desça até o peito aproximar do solo e suba completamente.",
    "Barra": "Inicie com braços estendidos. Suba até o queixo passar da barra. Não balance o corpo (kipping).",
    "Abdominal": "Deitado, suba o tronco e toque as mãos nos pés ou tornozelos. Mantenha o movimento contínuo.",
    "Corrida": "Mantenha a postura ereta e olhar para frente. Passada natural. Controle a respiração pelo nariz e boca.",
    "Agachamento": "Pés na largura dos ombros. Mantenha a coluna reta e o peito aberto. Desça até as coxas ficarem paralelas ao chão."
};

// Frases Motivacionais
const QUOTES = [
    "Disciplina é liberdade.",
    "Seu corpo só vai onde sua mente permite.",
    "Não precisa ser perfeito, só precisa ser melhor que ontem.",
    "Motivação passa. Disciplina fica.",
    "A dor é temporária. A glória é eterna."
];

// Banco de Treinos (Fiel ao PDF - Semanas 1, 5 e 9)
const TREINOS = {
    'INICIANTE': {
        1: { titulo: "T1: ESPECÍFICO + NATAÇÃO", foco: "Adaptação Técnica", aquecimento: ["5' Caminhada/Trote", "10 Agachamentos + 10 Polichinelos", "Mobilidade Articular"], principal: ["Barra Fixa (ou Negativa): 3x Máx (Segura 5s)", "Flexão de Braço: 4x Máx (Min 8-10 reps)", "Abdominal Remador: 3 séries de 15 reps", "Corrida: 800m Leve + 4 Tiros de 100m (30s descanso)", "Natação: 4x25m crawl + 4x15m pernada"] },
        2: { titulo: "F1: FORTALECIMENTO INFERIOR", foco: "Base de Força", aquecimento: ["5' Trote", "Mobilidade Geral"], principal: ["Agachamento Livre: 3x12", "Afundo: 3x10 (cada perna)", "Stiff: 3x12", "Prancha toque no ombro: 3x10"] },
        3: { titulo: "T2: ESPECÍFICO + VELOCIDADE", foco: "Técnica de Corrida", aquecimento: ["5' Trote Leve", "10 Jumping Jacks + 5 Burpees"], principal: ["Educativos Corrida: Skipping, Joelho Alto", "Tiros de Corrida: 4x 200m (Intervalo 1'30)", "Flexão de Braço: 3x Máx", "Prancha: 3x 30s"] },
        4: { titulo: "F2: FORTALECIMENTO SUPERIOR", foco: "Membros Superiores", aquecimento: ["Mobilidade de Ombros", "10 Flexões com Joelho"], principal: ["Remada Baixa: 3x12", "Flexão com apoio: 3x10", "Tríceps Banco: 3x15", "Prancha Frontal: 3x40s"] },
        5: { titulo: "T3: CIRCUITO AMRAP", foco: "Resistência", aquecimento: ["5' Mobilidade", "10 Agachamentos + 10 Flexões Quadril"], principal: ["AMRAP 10' (Máximo de Rounds): 5 Flexões, 10 Agachamentos, 15 Abdominais", "Corrida Final: 1km Leve", "Natação: 4x25m"] },
        6: { titulo: "F3: CORE & RECUPERAÇÃO", foco: "Estabilidade", aquecimento: ["Alongamento Leve"], principal: ["Ponte: 3x20s", "Dead Bug: 3x10", "Mobilidade: 10 min", "Caminhada: 10 min"] }
    },
    'INTERMEDIARIO': {
        1: { titulo: "T13: VOLUME & RITMO", foco: "Resistência Específica", aquecimento: ["6' Trote Progressivo", "10 Burpees + 15 Mountain Climbers"], principal: ["Flexão: 4x Máx (Min 12 reps)", "Barra Fixa: 3x6 (Pausa 3s)", "Abdominal Remador Carga: 3x20", "Corrida: 4 Tiros de 200m (1' descanso)"] },
        2: { titulo: "F13: FORÇA FUNCIONAL", foco: "Pernas Potentes", aquecimento: ["Mobilidade Dinâmica"], principal: ["Agachamento com Carga: 4x10", "Afundo com Passada: 3x12", "Stiff: 4x10", "Abdução de Quadril: 3x15"] },
        3: { titulo: "T14: CIRCUITO EMOM", foco: "Intensidade", aquecimento: ["5' Corrida", "3x10 Jumping Jacks"], principal: ["EMOM 12': Min 1: 10 Flexões, Min 2: 15 Abdominais, Min 3: 150m Corrida", "Natação: 8x25m Crawl"] },
        4: { titulo: "F14: SUPERIORES & CORE", foco: "Força de Puxada", aquecimento: ["Rotação de Ombros"], principal: ["Remada com Halteres: 3x12", "Flexão Inclinada: 3x10", "Tríceps Banco Unilateral: 3x12", "Prancha com Elevação: 3x30s"] },
        5: { titulo: "T15: DESAFIO FOR TIME", foco: "Velocidade", aquecimento: ["6' Trote variado"], principal: ["CRONOMETRADO: 20 Flexões, 30 Abdominais, 1.5km Corrida", "Natação: 6x25m Crawl Médio"] },
        6: { titulo: "F15: CORE EXPLOSIVO", foco: "Potência", aquecimento: ["Mobilidade"], principal: ["Agachamento com Salto: 3x8", "Burpee Técnico: 3x10", "Abdominal V-UP: 3x15", "Dead Bug com Peso: 3x10"] }
    },
    'AVANCADO': {
        1: { titulo: "T25: ALTA PERFORMANCE", foco: "Simulação Real", aquecimento: ["8' Corrida Progr.", "15 Mountain + 10 Burpees"], principal: ["Flexão Tempo Controlado: 4x12 (2s desce/1s sobe)", "Barra Fixa: 3x6 (Carga)", "Abdominal V-UP Carga: 3x15", "Corrida: 5 Tiros de 400m (Descanso 1')", "Natação: 3x100m Crawl"] },
        2: { titulo: "F25: FORÇA ELITE", foco: "Potência Total", aquecimento: ["Ativação Completa"], principal: ["Clean com Kettlebell: 3x8", "Agachamento Overhead: 3x10", "Prancha Lateral Elevação: 3x15", "Burpee com Salto Alto: 3x10"] },
        3: { titulo: "T26: CIRCUITO DE GUERRA", foco: "Resistência Mental", aquecimento: ["6' Corrida Variada"], principal: ["FOR TIME (2 Rounds): 15 Flexões, 20 Abdominais, 800m Corrida", "Natação: 4x50m Crawl"] },
        4: { titulo: "F26: POTÊNCIA SUPERIOR", foco: "Explosão", aquecimento: ["Mobilidade Tronco"], principal: ["Remada Unilateral: 3x12", "Flexão Pliométrica: 3x6", "Prancha Toque Alternado: 3x20", "Abdominal Medicine Ball: 3x15"] },
        5: { titulo: "T27: SIMULADO TAF", foco: "Teste Real", aquecimento: ["5' Trote", "Ativação Simulado"], principal: ["Flexão: Máx em 1 min (Anote)", "Descanso 3 min", "Abdominal: Máx em 1 min (Anote)", "Descanso 5 min", "Corrida: 2km (Anote Tempo)", "Natação: 2x100m Leve"] },
        6: { titulo: "F27: FUNCIONAL FINAL", foco: "Ajuste Fino", aquecimento: ["Alongamento"], principal: ["Agachamento com Salto: 4x8", "Flexão Diamond: 3x10", "Russian Twist: 3x20", "Burpee Pull-up: 3x6"] }
    }
};

/* =========================================
   2. LÓGICA DO APP (CÉREBRO)
   ========================================= */
const app = {
    data: { nivel: null, dia: 1, nome: 'Guerreiro' },
    
    // SEU LINK DA API GOOGLE (Não apague)
    apiUrl: 'https://script.google.com/macros/s/AKfycbwxlJH7xcKbml9PP_2NVmfBUtAUqBstBQCQ0bBql-8DMlYZZW8cZ0uNx6EyPbdb98Zn/exec',

    init: function() {
        if(localStorage.getItem('taf_token')) {
            this.loadData();
            // Roteamento Inteligente
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
        window.scrollTo(0,0);
    },

    // --- LOGIN (Conectado ao Google Sheets) ---
    login: function() {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();
        const btn = document.querySelector('.btn-primary');
        const originalText = btn.innerHTML;

        if(!email || !pass) { alert('⚠️ Preencha e-mail e senha.'); return; }

        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> CONECTANDO...';
        btn.disabled = true;

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
                alert('🚫 ' + (data.msg || data.mensagem || "Erro desconhecido"));
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        })
        .catch(e => {
            alert('⚠️ Erro de conexão.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    },

    logout: function() {
        if(confirm("Sair do sistema?")) {
            localStorage.clear();
            location.reload();
        }
    },

    // --- ONBOARDING (Classificação de Nível) ---
    processOnboarding: function() {
        const run = parseFloat(document.getElementById('test-run').value);
        const pushups = parseInt(document.getElementById('test-pushups').value);
        const abs = parseInt(document.getElementById('test-abs').value);

        if(!run || !pushups || !abs) { alert("Preencha todos os dados!"); return; }

        let nivel = 'INICIANTE';
        if (pushups > 30 && abs > 40 && run < 5.0) nivel = 'AVANCADO';
        else if (pushups >= 15 && abs >= 25 && run <= 7.0) nivel = 'INTERMEDIARIO';

        localStorage.setItem('taf_level', nivel);
        localStorage.setItem('taf_day', 1);
        location.reload();
    },

    // --- DADOS E DASHBOARD ---
    loadData: function() {
        this.data.nivel = localStorage.getItem('taf_level');
        this.data.dia = parseInt(localStorage.getItem('taf_day')) || 1;
        this.data.nome = localStorage.getItem('taf_user_name') || 'Guerreiro';
        
        if(this.data.nivel) {
            document.getElementById('user-rank').innerText = this.data.nome.split(' ')[0].toUpperCase();
            document.getElementById('user-level-display').innerText = `NÍVEL: ${this.data.nivel}`;
            document.getElementById('progress-text').innerText = `Dia ${this.data.dia} de 90`;
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
            const db = TREINOS[this.data.nivel] || TREINOS['INICIANTE'];
            const t = db[treino];
            tEl.innerText = t.titulo;
            dEl.innerText = "Foco: " + t.foco;
        }
    },

    getTreinoDoDia: function() {
        const dia = (this.data.dia - 1) % 7 + 1; // 1 a 7 (Seg a Dom)
        if (dia === 7) return 'descanso';
        return dia; // Retorna o número do dia para buscar no DB
    },

    // --- MODAIS E TREINOS ---
    openWorkout: function() {
        const tipo = this.getTreinoDoDia();
        if (tipo === 'descanso') { alert("Dia de Descanso. Foco na dieta."); return; }

        const db = TREINOS[this.data.nivel] || TREINOS['INICIANTE'];
        const treino = db[tipo];
        
        document.getElementById('warmup-list').innerHTML = treino.aquecimento.map(i => `<li>${i}</li>`).join('');
        
        // Lista Principal com Dropdown
        document.getElementById('main-list-container').innerHTML = treino.principal.map(ex => {
            const nomeBase = ex.split(':')[0].trim();
            let desc = "Execute com foco na técnica.";
            for(let k in EXERCISE_GUIDE) if(nomeBase.includes(k)) desc = EXERCISE_GUIDE[k];

            return `
            <details class="exercise-detail">
                <summary><span>${ex}</span><i class="fa-solid fa-chevron-down"></i></summary>
                <p class="technique-desc">💡 <strong>TÉCNICA:</strong> ${desc}</p>
            </details>`;
        }).join('');

        document.getElementById('modal-title').innerText = `DIA ${this.data.dia}`;
        this.openModal('modal-workout');
    },

    openModal: (id) => document.getElementById(id).classList.add('active'),
    closeModal: (id) => document.getElementById(id).classList.remove('active'),

    completeMission: function() {
        if(confirm("Confirmar missão cumprida?")) {
            localStorage.setItem('taf_day', this.data.dia + 1);
            this.closeModal('modal-workout');
            this.loadData();
            this.triggerConfetti();
            setTimeout(() => alert("PROGRESSO REGISTRADO!"), 500);
        }
    },

    resetDay: function() {
        if(confirm("Reiniciar para o Dia 1?")) {
            localStorage.setItem('taf_day', 1);
            this.loadData();
        }
    },

    updateQuote: function() {
        const r = Math.floor(Math.random() * QUOTES.length);
        document.getElementById('daily-quote').innerText = `"${QUOTES[r]}"`;
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

    // --- CALCULADORA CORRIGIDA (LÓGICA DO PDF) ---
    calculateScore: function() {
        const flex = parseInt(document.getElementById('calc-flex').value) || 0;
        const abs = parseInt(document.getElementById('calc-abs').value) || 0;
        const run = parseFloat(document.getElementById('calc-run').value) || 15.0;

        let pontos = 0;

        // 1. Flexão (Base 20 = 50pts. +1 = +5pts)
        let ptsFlex = 0;
        if(flex >= 20) ptsFlex = 50 + ((flex - 20) * 5);
        else ptsFlex = flex * 2.5; // Proporcional

        // 2. Abdominal (Base 20 = 50pts. +1 = +5pts) - Estimativa segura
        let ptsAbs = 0;
        if(abs >= 20) ptsAbs = 50 + ((abs - 20) * 5);
        else ptsAbs = abs * 2.5;

        // 3. Corrida (Base 13min = 50pts. -30s = +10pts)
        let runSec = run * 60;
        let baseSec = 13 * 60;
        let ptsRun = 0;

        if(runSec <= baseSec) {
            let diff = baseSec - runSec;
            let blocos = Math.floor(diff / 30);
            ptsRun = 50 + (blocos * 10);
        } else {
            ptsRun = Math.max(0, 50 - ((runSec - baseSec) / 10));
        }

        pontos = Math.floor(ptsFlex + ptsAbs + ptsRun);

        const res = document.getElementById('calc-result');
        res.style.display = 'block';
        document.getElementById('score-text').innerText = pontos + " PONTOS";

        const status = document.getElementById('score-status');
        if (pontos >= 250) {
            status.innerText = "APROVADO";
            status.style.color = "#10B981"; 
        } else {
            status.innerText = "REPROVADO (< 250)";
            status.style.color = "#EF4444"; 
        }
    }
};

// INICIALIZAÇÃO SEGURA
window.onload = () => {
    app.init();
    
    // PWA: Registra Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(()=>console.log("SW OK"));
    }
};
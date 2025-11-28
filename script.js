const EXERCISE_GUIDE = {
    "Flexão": "Mãos alinhadas com ombros. Corpo em linha reta. Desça até o peito aproximar do solo.",
    "Barra": "Inicie com braços estendidos. Suba até o queixo passar da barra.",
    "Abdominal": "Deitado, suba o tronco e toque as mãos nos pés. Movimento contínuo.",
    "Corrida": "Postura ereta. Passada natural. Controle a respiração.",
    "Agachamento": "Pés na largura dos ombros. Mantenha a coluna reta. Desça até 90 graus."
};

const QUOTES = ["Disciplina é liberdade.", "Seu corpo vai onde a mente permite.", "Motivação passa, disciplina fica."];

const TREINOS = {
    'INICIANTE': {
        padrao: { titulo: "ADAPTAÇÃO TÉCNICA", foco: "Resistência", aquecimento: ["5 min Trote", "10 Polichinelos"], principal: ["Barra Fixa: 3x Máx", "Flexão: 4x Máx", "Abdominal: 3x15", "Corrida: 800m + 4x100m"] },
        fortalecimento: { titulo: "FORÇA BASE", foco: "Prevenção", aquecimento: ["Mobilidade"], principal: ["Agachamento: 3x12", "Afundo: 3x10", "Prancha: 3x30s"] }
    },
    'INTERMEDIARIO': {
        padrao: { titulo: "DESENVOLVIMENTO", foco: "Volume", aquecimento: ["6 min Trote", "10 Burpees"], principal: ["Flexão: 4x Máx", "Barra: 3x6", "Abdominal Carga: 3x20", "Tiros: 4x200m"] },
        fortalecimento: { titulo: "FORÇA FUNCIONAL", foco: "Potência", aquecimento: ["Mobilidade"], principal: ["Agachamento Carga: 4x10", "Remada: 3x12"] }
    },
    'AVANCADO': {
        padrao: { titulo: "PERFORMANCE TAF", foco: "Simulação", aquecimento: ["8 min Corrida", "15 Mountain Climbers"], principal: ["Flexão Controlada: 4x12", "Barra: 3x6", "Abdominal V-UP: 3x15", "Tiros: 5x400m"] },
        fortalecimento: { titulo: "EXPLOSÃO", foco: "Pico", aquecimento: ["Mobilidade"], principal: ["Salto Vertical: 4x8", "Flexão Pliométrica: 3x6"] }
    }
};

const app = {
    data: { nivel: null, dia: 1, nome: 'Guerreiro' },
    apiUrl: 'https://script.google.com/macros/s/AKfycbziybWh6rOcZ-KFHnq6X6hkMkxweu0GL_pPo9Of_6NBE-7SAGzVU5Tl1cNlno2IE28/exec',

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

        if(!email || !pass) { alert('Preencha tudo.'); return; }
        btn.innerHTML = 'CONECTANDO...'; btn.disabled = true;

        fetch(this.apiUrl, {
            method: 'POST',
            redirect: "follow", 
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ email: email, senha: pass })
        })
        .then(r => r.json())
        .then(data => {
            if(data.result === 'sucesso' || data.result === 'success') {
                localStorage.setItem('taf_token', 'valid');
                localStorage.setItem('taf_user_name', data.nome);
                location.reload();
            } else {
                alert(data.msg || data.mensagem || "Erro.");
                btn.innerHTML = originalText; btn.disabled = false;
            }
        })
        .catch(e => { alert('Erro de conexão.'); btn.innerHTML = originalText; btn.disabled = false; });
    },

    processOnboarding: function() {
        const run = parseFloat(document.getElementById('test-run').value);
        const pushups = parseInt(document.getElementById('test-pushups').value);
        const abs = parseInt(document.getElementById('test-abs').value);
        if(!run) return;

        let nivel = 'INICIANTE';
        if (pushups > 30 && abs > 40 && run < 5.0) nivel = 'AVANCADO';
        else if (pushups >= 15 && abs >= 25 && run <= 7.0) nivel = 'INTERMEDIARIO';

        localStorage.setItem('taf_level', nivel);
        localStorage.setItem('taf_day', 1);
        location.reload();
    },

    loadData: function() {
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
        if (treino === 'descanso') { tEl.innerText = "DESCANSO"; dEl.innerText = "Recuperação Total"; }
        else {
            const t = (TREINOS[this.data.nivel] || TREINOS['INICIANTE'])[treino];
            tEl.innerText = t.titulo; dEl.innerText = t.foco;
        }
    },

    getTreinoDoDia: function() {
        const d = this.data.dia % 7;
        if ([1,3,5].includes(d)) return 'padrao';
        if ([2,4,6].includes(d)) return 'fortalecimento';
        return 'descanso';
    },

    openWorkout: function() {
        const tipo = this.getTreinoDoDia();
        if (tipo === 'descanso') { alert("Dia de descanso."); return; }
        
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
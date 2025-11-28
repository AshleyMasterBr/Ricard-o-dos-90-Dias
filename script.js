/* =========================================
   DADOS TÉCNICOS & TEXTOS
   ========================================= */
const EXERCISE_GUIDE = {
    "Flexão": "Mãos alinhadas com ombros. Corpo reto. Desça até o peito quase tocar o chão.",
    "Barra": "Queixo acima da barra. Extensão total na descida. Sem balanço.",
    "Abdominal": "Suba o tronco até tocar os pés. Mantenha o ritmo constante.",
    "Corrida": "Postura ereta, passada natural. Respiração rítmica (2x2 ou 3x3).",
    "Agachamento": "Pés na largura dos ombros. Coluna reta. Coxas paralelas ao chão."
};

const QUOTES = [
    "Disciplina é fazer o que precisa ser feito.",
    "A dor passa, a aprovação fica.",
    "Seu corpo aguenta, é sua mente que você precisa convencer.",
    "Cada repetição conta. Não roube de si mesmo."
];

const TREINOS = {
    'INICIANTE': {
        padrao: { titulo: "ADAPTAÇÃO", foco: "Base", aquecimento: ["5' Trote", "Mobilidade"], principal: ["Barra (ou Negativa): 3x Máx", "Flexão: 4x Máx", "Abdominal: 3x15", "Corrida: 800m + 4x100m"] },
        fortalecimento: { titulo: "FORÇA BASE", foco: "Prevenção", aquecimento: ["Mobilidade"], principal: ["Agachamento: 3x12", "Afundo: 3x10", "Prancha: 3x30s"] }
    },
    'INTERMEDIARIO': {
        padrao: { titulo: "INTENSIDADE", foco: "Volume", aquecimento: ["Trote + Burpees"], principal: ["Flexão: 4x Máx", "Barra: 3x6", "Abdominal Carga: 3x20", "Tiros: 4x200m"] },
        fortalecimento: { titulo: "FORÇA FUNCIONAL", foco: "Potência", aquecimento: ["Mobilidade"], principal: ["Agachamento Carga: 4x10", "Remada: 3x12"] }
    },
    'AVANCADO': {
        padrao: { titulo: "PERFORMANCE TAF", foco: "Simulação", aquecimento: ["Corrida Progr."], principal: ["Flexão Tempo: 4x12", "Barra: 3x6", "Abdominal V-UP: 3x15", "Tiros: 5x400m"] },
        fortalecimento: { titulo: "EXPLOSÃO", foco: "Pico", aquecimento: ["Ativação"], principal: ["Salto Vertical: 4x8", "Flexão Pliométrica: 3x6"] }
    }
};

/* =========================================
   LÓGICA DO APP (CLOUD SYNC)
   ========================================= */
const app = {
    data: { nivel: null, dia: 1, nome: 'Guerreiro' },
    
    // ⚠️ COLE SEU NOVO LINK DO GOOGLE AQUI ⚠️
    apiUrl: 'https://script.google.com/macros/s/AKfycbwI7YhYrGYCzfIXfQlBdekIk6VJibeCrPe9kdU6rp6nu3ZOnxDnhfK9i5JZJ64k9jh1/exec',

    init: function() {
        // Verifica token local para manter logado
        if(localStorage.getItem('taf_token')) {
            this.loadLocalData();
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

    // --- LOGIN COM SYNC ---
    login: function() {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();
        const btn = document.querySelector('.btn-primary');
        const originalText = btn.innerHTML;

        if(!email || !pass) { alert('Preencha tudo.'); return; }

        btn.innerHTML = 'SINCRONIZANDO...'; btn.disabled = true;

        fetch(this.apiUrl, {
            method: 'POST',
            redirect: "follow",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ acao: "login", email: email, senha: pass })
        })
        .then(r => r.json())
        .then(data => {
            if(data.result === 'sucesso') {
                localStorage.setItem('taf_token', 'valid');
                localStorage.setItem('taf_email', email); // Guarda pra salvar depois
                localStorage.setItem('taf_user_name', data.nome);
                
                // SE VIER DADOS DA PLANILHA, USA ELES
                if(data.nivel && data.dia) {
                    localStorage.setItem('taf_level', data.nivel);
                    localStorage.setItem('taf_day', data.dia);
                    location.reload();
                } else {
                    // Se não tiver nada lá, manda pro onboarding
                    this.showScreen('screen-onboarding');
                }
            } else {
                alert('🚫 ' + data.msg);
                btn.innerHTML = originalText; btn.disabled = false;
            }
        })
        .catch(e => { 
            console.error(e);
            alert('Erro de conexão.'); 
            btn.innerHTML = originalText; btn.disabled = false; 
        });
    },

    // --- SALVAR NA NUVEM (BACKGROUND) ---
    saveCloud: function(nivel, dia) {
        const email = localStorage.getItem('taf_email');
        if(!email) return;

        // Envia sem travar a tela (Fire and Forget)
        fetch(this.apiUrl, {
            method: 'POST',
            redirect: "follow",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ 
                acao: "salvar", 
                email: email, 
                nivel: nivel, 
                dia: dia 
            })
        }).then(r => console.log("Salvo na Nuvem"));
    },

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
        
        // SALVA NA NUVEM PELA PRIMEIRA VEZ
        this.saveCloud(n, 1);
        
        location.reload();
    },

    completeMission: function() {
        if(confirm("Missão cumprida?")) {
            const novoDia = parseInt(this.data.dia) + 1;
            
            // Atualiza Local
            localStorage.setItem('taf_day', novoDia);
            this.data.dia = novoDia;
            
            // ATUALIZA NUVEM
            this.saveCloud(this.data.nivel, novoDia);

            this.closeModal('modal-workout');
            this.loadLocalData(); // Refresh visual
            
            this.triggerConfetti();
            setTimeout(() => alert("SALVO NA NUVEM!"), 500);
        }
    },

    resetDay: function() {
        if(confirm("Reiniciar para o Dia 1?")) {
            localStorage.setItem('taf_day', 1);
            this.saveCloud(this.data.nivel, 1);
            location.reload();
        }
    },

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

    // ... (Resto das funções de UI, Calculadora e Treino permanecem iguais) ...
    // Para economizar espaço, mantenha as funções:
    // updateMissionCard, getTreinoDoDia, openWorkout, openModal, closeModal, 
    // logout, updateQuote, triggerConfetti, calculateScore 
    // (Elas não mudam, exceto que removemos export/import manual)

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
    
    logout: function() { if(confirm("Sair?")) { localStorage.clear(); location.reload(); } },
    
    updateQuote: function() { document.getElementById('daily-quote').innerText = `"${QUOTES[Math.floor(Math.random()*QUOTES.length)]}"`; },
    
    triggerConfetti: function() {
        var end = Date.now() + (1000);
        var colors = ['#EF4444', '#ffffff'];
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

window.onload = () => app.init();
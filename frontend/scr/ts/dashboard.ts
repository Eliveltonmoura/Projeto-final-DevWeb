// Interface para os dados do Dashboard
interface DashboardData {
    materiais: number;
    atividades: number;
    mensagens: number;
}

// Função para gerar números aleatórios simulando estatísticas
const gerarDados = (): DashboardData => {
    return {
        materiais: Math.floor(Math.random() * 50),
        atividades: Math.floor(Math.random() * 20),
        mensagens: Math.floor(Math.random() * 10)
    };
};

// Atualizar os valores dos cards no DOM
const atualizarDashboard = (data: DashboardData): void => {
    const materiaisEl = document.getElementById("materiaisCount");
    const atividadesEl = document.getElementById("atividadesCount");
    const mensagensEl = document.getElementById("mensagensCount");

    if (materiaisEl) materiaisEl.innerText = data.materiais.toString();
    if (atividadesEl) atividadesEl.innerText = data.atividades.toString();
    if (mensagensEl) mensagensEl.innerText = data.mensagens.toString();
};

// Criar gráfico de progresso
const criarGrafico = (): void => {
    const ctx = document.getElementById('progressoChart') as HTMLCanvasElement;
    
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['João', 'Maria', 'Pedro', 'Ana', 'Lucas'],
                datasets: [{
                    label: 'Progresso (%)',
                    data: [85, 70, 90, 60, 95],
                    backgroundColor: ['#0073e6', '#00bfff', '#0099cc', '#005bb5', '#003f7f']
                }]
            }
        });
    }
};

// Inicializar o Dashboard
document.addEventListener("DOMContentLoaded", () => {
    const dados = gerarDados();
    atualizarDashboard(dados);
    criarGrafico();
});

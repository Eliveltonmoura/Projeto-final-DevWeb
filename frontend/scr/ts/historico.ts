const API_HISTORICO = "http://localhost:5000/api/historico";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(API_HISTORICO, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        const historico = await response.json();
        const listaHistorico = document.getElementById("listaHistorico") as HTMLDivElement;

        if (historico.length === 0) {
            listaHistorico.innerHTML = "<p>Nenhuma atividade corrigida ainda.</p>";
            return;
        }

        listaHistorico.innerHTML = historico.map((item: any) => `
            <div class="historico-item">
                <h3>${item.atividade_titulo}</h3>
                <p><strong>Sua resposta:</strong> ${item.resposta}</p>
                <p><strong>Nota:</strong> ${item.nota}</p>
                <p><strong>Feedback:</strong> ${item.feedback || "Nenhum feedback"}</p>
            </div>
        `).join("");
    } catch (error) {
        console.error("Erro ao carregar histórico", error);
    }
});

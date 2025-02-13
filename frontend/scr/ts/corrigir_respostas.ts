const API_RESPOSTAS = "http://localhost:5000/api/respostas";
const API_NOTAS = "http://localhost:5000/api/notas";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(API_RESPOSTAS, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        const respostas = await response.json();
        const listaRespostas = document.getElementById("listaRespostas") as HTMLDivElement;

        listaRespostas.innerHTML = respostas.map((resposta: any) => `
            <div class="resposta-item">
                <h3>${resposta.aluno_nome}</h3>
                <p><strong>Atividade:</strong> ${resposta.atividade_titulo}</p>
                <p><strong>Resposta:</strong> ${resposta.resposta}</p>
                <input type="number" id="nota-${resposta.id}" placeholder="Nota (0-10)" min="0" max="10">
                <textarea id="feedback-${resposta.id}" placeholder="Feedback"></textarea>
                <button onclick="corrigirResposta(${resposta.id})">Enviar Nota</button>
            </div>
        `).join("");
    } catch (error) {
        console.error("Erro ao carregar respostas", error);
    }
});

async function corrigirResposta(respostaId: number) {
    const nota = (document.getElementById(`nota-${respostaId}`) as HTMLInputElement).value;
    const feedback = (document.getElementById(`feedback-${respostaId}`) as HTMLTextAreaElement).value;

    if (!nota) {
        alert("Insira uma nota!");
        return;
    }

    const response = await fetch(API_NOTAS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ resposta_id: respostaId, nota, feedback })
    });

    if (response.ok) {
        alert("Nota enviada com sucesso!");
        window.location.reload();
    } else {
        alert("Erro ao enviar nota!");
    }
}

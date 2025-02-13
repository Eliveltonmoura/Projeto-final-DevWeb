import { API_BASE_URL } from "./config";

async function enviarResposta(atividadeId: number, resposta: string) {
    const response = await fetch(`${API_BASE_URL}/respostas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ data: { atividade: atividadeId, resposta } })
    });

    if (response.ok) {
        alert("Resposta enviada!");
        window.location.reload();
    } else {
        alert("Erro ao enviar resposta!");
    }
}

document.getElementById("respostaForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const atividadeId = Number((document.getElementById("atividadeId") as HTMLInputElement).value);
    const resposta = (document.getElementById("resposta") as HTMLTextAreaElement).value;
    enviarResposta(atividadeId, resposta);
});

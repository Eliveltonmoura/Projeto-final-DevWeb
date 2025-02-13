const API_RESPOSTAS = "http://localhost:5000/api/respostas";

document.addEventListener("DOMContentLoaded", () => {
    const formResposta = document.getElementById("formResposta") as HTMLFormElement;
    const atividadeId = new URLSearchParams(window.location.search).get("id");
    const respostaInput = document.getElementById("resposta") as HTMLTextAreaElement;

    if (atividadeId) {
        (document.getElementById("atividade_id") as HTMLInputElement).value = atividadeId;
    } else {
        alert("Erro ao carregar atividade!");
        window.location.href = "dashboard.html";
    }

    formResposta.addEventListener("submit", async (event) => {
        event.preventDefault();

        const resposta = respostaInput.value;

        const response = await fetch(API_RESPOSTAS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ atividade_id: atividadeId, resposta })
        });

        if (response.ok) {
            alert("Resposta enviada com sucesso!");
            window.location.href = "dashboard.html";
        } else {
            alert("Erro ao enviar resposta!");
        }
    });
});

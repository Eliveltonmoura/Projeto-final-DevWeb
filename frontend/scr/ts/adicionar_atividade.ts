const API_ATIVIDADES = "http://localhost:5000/api/atividades";

document.addEventListener("DOMContentLoaded", () => {
    const formAtividade = document.getElementById("formAtividade") as HTMLFormElement;

    formAtividade.addEventListener("submit", async (event) => {
        event.preventDefault();

        const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
        const descricao = (document.getElementById("descricao") as HTMLTextAreaElement).value;
        const data_fim = (document.getElementById("data_fim") as HTMLInputElement).value;

        const response = await fetch(API_ATIVIDADES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ titulo, descricao, data_fim })
        });

        if (response.ok) {
            alert("Atividade criada com sucesso!");
            window.location.href = "dashboard.html";
        } else {
            alert("Erro ao criar atividade!");
        }
    });
});

const API_URL = "http://localhost:5000/api/materiais";
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
    const formMaterial = document.getElementById("formMaterial") as HTMLFormElement;

    formMaterial.addEventListener("submit", async (event) => {
        event.preventDefault();

        const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
        const descricao = (document.getElementById("descricao") as HTMLTextAreaElement).value;
        const arquivo = (document.getElementById("arquivo") as HTMLInputElement).files?.[0];

        if (!arquivo) {
            alert("Selecione um arquivo!");
            return;
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descricao", descricao);
        formData.append("arquivo", arquivo);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        if (response.ok) {
            alert("Material adicionado com sucesso!");
            window.location.href = "dashboard.html";
        } else {
            alert("Erro ao adicionar material!");
        }
    });
});

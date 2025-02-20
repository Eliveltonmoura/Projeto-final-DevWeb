import { taskManager } from "./adicionar_atividade";
console.log("chegou aqui");

document.addEventListener("DOMContentLoaded", () => {
    const formAtividade = document.getElementById("formAtividade") as HTMLFormElement;

    formAtividade.addEventListener("submit", async (event) => {
        event.preventDefault();

        const tituloInput = document.getElementById("titulo") as HTMLInputElement;
        const descricaoInput = document.getElementById("descricao") as HTMLTextAreaElement;
        const dataFimInput = document.getElementById("data_fim") as HTMLInputElement;

        const atividade = {
            description: descricaoInput.value,
            deadline: dataFimInput.value,
            done: false,
            category: {
                documentId: "1"
            },
            titulo: tituloInput.value
        };

        try {
            await taskManager.create(atividade);
            alert("Atividade criada com sucesso!");
            formAtividade.reset();
        } catch (error) {
            console.error("Erro ao criar atividade:", error);
            alert("Ocorreu um erro ao criar a atividade.");
        }
    });
});
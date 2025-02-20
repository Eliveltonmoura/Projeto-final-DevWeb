var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { taskManager } from "./adicionar_atividade";
console.log("chegou aqui");
document.addEventListener("DOMContentLoaded", () => {
    const formAtividade = document.getElementById("formAtividade");
    formAtividade.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const tituloInput = document.getElementById("titulo");
        const descricaoInput = document.getElementById("descricao");
        const dataFimInput = document.getElementById("data_fim");
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
            yield taskManager.create(atividade);
            alert("Atividade criada com sucesso!");
            formAtividade.reset();
        }
        catch (error) {
            console.error("Erro ao criar atividade:", error);
            alert("Ocorreu um erro ao criar a atividade.");
        }
    }));
});

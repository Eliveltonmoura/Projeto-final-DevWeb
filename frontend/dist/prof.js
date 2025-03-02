"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let atividadeDelete;
const authorizationHeaderprof = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
};
const professor = {
    nome: localStorage.getItem("username")
};
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b;
    const nomeProfessor = document.getElementById("nomeProfessor");
    nomeProfessor.textContent = professor.nome;
    (_a = document.getElementById("logout")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        alert("Você saiu da conta!");
        window.location.href = "login.html";
    });
    (_b = document.getElementById("addAtividade")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", adicionarAtividade);
});
function adicionarAtividade() {
    const tituloInput = document.getElementById("atividadeTitulo");
    const descricaoInput = document.getElementById("atividadeDescricao");
    const listaAtividades = document.getElementById("listaAtividades");
    if (tituloInput.value.trim() !== "" && descricaoInput.value.trim() !== "") {
        const atividadeItem = document.createElement("li");
        atividadeItem.innerHTML = `<strong>${tituloInput.value}</strong>: ${descricaoInput.value}`;
        listaAtividades.appendChild(atividadeItem);
        tituloInput.value = "";
        descricaoInput.value = "";
    }
}
class ProfessorDashboard {
    loadActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            const listaAtividades = document.getElementById("listaAtividades");
            if (!listaAtividades) {
                console.error("Erro: Elemento listaAtividades não encontrado.");
                return;
            }
            const res = yield api.get('/atividades', authorizationHeaderprof);
            const atividades = res.data.data || [];
            // console.log("Resposta completa do Strapi:", JSON.stringify(res.data, null, 2));
            if (atividades.length === 0) {
                listaAtividades.innerHTML = "<p>Nenhuma atividade encontrada.</p>";
                return;
            }
            listaAtividades.innerHTML = "";
            atividades.forEach((atividade) => {
                const atividadeElement = document.createElement("div");
                atividadeElement.setAttribute("data-id", atividade.documentId);
                atividadeElement.classList.add("atividade");
                atividadeElement.innerHTML = `
                
                <h3>${atividade.tarefa}</h3>
                <p>${atividade.descricao}</p>
                <p><strong>Prazo:</strong> ${atividade.praso}</p>
                <p><strong>Status:</strong> ${atividade.done ? "Concluído ✅" : "Pendente ⏳"}</p>
                <button class="delete-button">Deletar</button>
            `;
                listaAtividades.appendChild(atividadeElement);
            });
        });
    }
    delete(atividade) {
        return __awaiter(this, void 0, void 0, function* () {
            yield api.delete(`/atividades/${atividade.documentId}`, authorizationHeaderprof);
            return atividade;
        });
    }
}
const professorDashboard = new ProfessorDashboard();
document.addEventListener("DOMContentLoaded", () => {
    professorDashboard.loadActivities();
});
document.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const target = event.target;
    if (target.classList.contains("delete-button")) {
        const postElement = target.closest(".atividade");
        const postId = postElement === null || postElement === void 0 ? void 0 : postElement.getAttribute("data-id");
        console.log(postId);
        if (postId) {
            professorDashboard.delete({ documentId: postId });
            console.log("deletou");
            postElement.remove();
        }
    }
}));
function AddAtividade() {
    window.location.href = "/frontend/src/pag/adicionar_atividade.html";
}

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
            if (atividades.length === 0) {
                listaAtividades.innerHTML = "<p>Nenhuma atividade encontrada.</p>";
                return;
            }
            listaAtividades.innerHTML = "";
            atividades.forEach((atividade) => {
                const atividadeElement = document.createElement("div");
                atividadeElement.classList.add("atividade");
                atividadeElement.innerHTML = `
                <h3>${atividade.tarefa}</h3>
                <p>${atividade.descricao}</p>
                <p><strong>Prazo:</strong> ${atividade.praso}</p>
                <p><strong>Status:</strong> ${atividade.done ? "Concluído ✅" : "Pendente ⏳"}</p>
            `;
                listaAtividades.appendChild(atividadeElement);
            });
        });
    }
}
const professorDashboard = new ProfessorDashboard();
document.addEventListener("DOMContentLoaded", () => {
    professorDashboard.loadActivities();
});
function AddAtividade() {
    window.location.href = "/frontend/src/pag/adicionar_atividade.html";
}

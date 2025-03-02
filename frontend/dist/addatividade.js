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
const authorizationHeaderAtividade = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
};
class AtividadeManager {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield api.get('/atividades', authorizationHeaderAtividade);
            console.log("Atividades carregadas:", res.data);
            return res.data.data || [];
        });
    }
    create(atividades) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield api.post('/atividades/', {
                "data": {
                    tarefa: atividades.tarefa,
                    descricao: atividades.description,
                    praso: atividades.praso,
                },
            }, authorizationHeaderAtividade);
            this.loadActivities();
            return res.data;
        });
    }
    loadActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            const listaAtividades = document.getElementById("listaAtividades");
            if (!listaAtividades) {
                console.error("Erro: Elemento listaAtividades não encontrado.");
                return;
            }
            listaAtividades.innerHTML = "Carregando atividades...";
            const atividades = yield this.getAll();
            if (atividades.length === 0) {
                listaAtividades.innerHTML = "Nenhuma atividade encontrada.";
                return;
            }
            listaAtividades.innerHTML = "";
            atividades.forEach(atividade => {
                const atividadeElement = document.createElement("div");
                atividadeElement.classList.add("atividade");
                atividadeElement.innerHTML = `
                <h3>${atividade.tarefa}</h3>
                <p>${atividade.description}</p>
                <p><strong>Prazo:</strong> ${atividade.praso}</p>
                <p><strong>Status:</strong> ${atividade.done ? "Concluído ✅" : "Pendente ⏳"}</p>
            `;
                listaAtividades.appendChild(atividadeElement);
            });
        });
    }
}
const atividadeManager = new AtividadeManager();
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script carregado!");
    const formAtividade = document.getElementById("formAtividade");
    if (!formAtividade) {
        console.error("Erro: Formulário não encontrado.");
        return;
    }
    formAtividade.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const tarefa = document.getElementById("titulo").value;
        const descricao = document.getElementById("descricao").value;
        const dataFim = document.getElementById("data_fim").value;
        if (!tarefa || !descricao || !dataFim) {
            alert("Preencha todos os campos!");
            return;
        }
        const novaAtividade = {
            tarefa,
            description: descricao,
            done: false,
            praso: dataFim
        };
        yield atividadeManager.create(novaAtividade);
        formAtividade.reset();
    }));
    atividadeManager.loadActivities();
});

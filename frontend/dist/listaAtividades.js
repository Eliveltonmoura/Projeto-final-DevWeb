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
const authorizationHeaderAtividades = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
};
const listaAtividades = document.getElementById("listaAtividades");
const teste = document.getElementById("teste");
if (listaAtividades) {
    function carregarAtividades() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield api.get("/atividades/", authorizationHeaderAtividades);
            const atividades = res.data.data || [];
            listaAtividades.innerHTML = "";
            atividades.forEach((atividade) => {
                const atividadeElement = document.createElement("div");
                atividadeElement.classList.add("atividade");
                atividadeElement.innerHTML = `
                <h3>${atividade.tarefa}</h3>
                <p>${atividade.descricao}</p>
                <p><strong>Prazo:</strong> ${atividade.praso}</p>
                <p><strong>Status:</strong> ${atividade.done ? "✅ Concluído" : "⏳ Pendente"}</p>
            `;
                listaAtividades.appendChild(atividadeElement);
            });
        });
    }
    carregarAtividades();
}

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
const formAtividade = document.getElementById("formAtividade");
formAtividade.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const tituloInput = document.getElementById("titulo");
    const descricaoInput = document.getElementById("descricao");
    const dataFimInput = document.getElementById("data_fim");
    console.log(tituloInput.value);
    console.log(descricaoInput.value);
    console.log(dataFimInput.value);
    const atividade = {
        description: descricaoInput.value,
        deadline: dataFimInput.value,
        done: false,
        category: {
            documentId: "1"
        },
        titulo: tituloInput.value
    };
}));

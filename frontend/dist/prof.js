"use strict";
const professor = {
    nome: "Elivelton",
    email: "elivelton@escola.com",
    foto: "img/professor.jpg"
};
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b, _c, _d;
    const nomeProfessor = document.getElementById("nomeProfessor");
    const emailProfessor = document.getElementById("emailProfessor");
    const fotoPerfil = document.getElementById("fotoPerfil");
    nomeProfessor.textContent = professor.nome;
    emailProfessor.textContent = professor.email;
    fotoPerfil.src = professor.foto;
    (_a = document.getElementById("logout")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        alert("Você saiu da conta!");
        window.location.href = "index.html";
    });
    (_b = document.getElementById("addAtividade")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", adicionarAtividade);
    (_c = document.getElementById("addMaterial")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", adicionarMaterial);
    (_d = document.getElementById("addTurma")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", adicionarTurma);
    setInterval(mostrarResultados, 5000);
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
function adicionarMaterial() {
    const nomeInput = document.getElementById("materialNome");
    const linkInput = document.getElementById("materialLink");
    const listaMateriais = document.getElementById("listaMateriais");
    if (nomeInput.value.trim() !== "" && linkInput.value.trim() !== "") {
        const materialItem = document.createElement("li");
        materialItem.innerHTML = `<a href="${linkInput.value}" target="_blank">${nomeInput.value}</a>`;
        listaMateriais.appendChild(materialItem);
        nomeInput.value = "";
        linkInput.value = "";
    }
}
function adicionarTurma(ev) {
    throw new Error("Function not implemented.");
}
function mostrarResultados() {
    throw new Error("Function not implemented.");
}


const professor = {
    nome: "Elivelton",
    email: "elivelton@escola.com",
    foto: "img/professor.jpg"
};
document.addEventListener("DOMContentLoaded", () => {
    const nomeProfessor = document.getElementById("nomeProfessor") as HTMLElement;
    const emailProfessor = document.getElementById("emailProfessor") as HTMLElement;
    const fotoPerfil = document.getElementById("fotoPerfil") as HTMLImageElement;

    nomeProfessor.textContent = professor.nome;
    emailProfessor.textContent = professor.email;
    fotoPerfil.src = professor.foto;

    document.getElementById("logout")?.addEventListener("click", () => {
        alert("Você saiu da conta!");
        window.location.href = "index.html"; 
    });

    document.getElementById("addAtividade")?.addEventListener("click", adicionarAtividade);
    document.getElementById("addMaterial")?.addEventListener("click", adicionarMaterial);
    document.getElementById("addTurma")?.addEventListener("click", adicionarTurma);

    
    setInterval(mostrarResultados, 5000);
});


function adicionarAtividade(): void {
    const tituloInput = document.getElementById("atividadeTitulo") as HTMLInputElement;
    const descricaoInput = document.getElementById("atividadeDescricao") as HTMLTextAreaElement;
    const listaAtividades = document.getElementById("listaAtividades") as HTMLUListElement;

    if (tituloInput.value.trim() !== "" && descricaoInput.value.trim() !== "") {
        const atividadeItem = document.createElement("li");
        atividadeItem.innerHTML = `<strong>${tituloInput.value}</strong>: ${descricaoInput.value}`;
        listaAtividades.appendChild(atividadeItem);

        tituloInput.value = "";
        descricaoInput.value = "";
    }
}

function adicionarMaterial(): void {
    const nomeInput = document.getElementById("materialNome") as HTMLInputElement;
    const linkInput = document.getElementById("materialLink") as HTMLInputElement;
    const listaMateriais = document.getElementById("listaMateriais") as HTMLUListElement;

    if (nomeInput.value.trim() !== "" && linkInput.value.trim() !== "") {
        const materialItem = document.createElement("li");
        materialItem.innerHTML = `<a href="${linkInput.value}" target="_blank">${nomeInput.value}</a>`;
        listaMateriais.appendChild(materialItem);

        nomeInput.value = "";
        linkInput.value = "";
    }
}
function adicionarTurma(this: HTMLElement, ev: MouseEvent) {
    throw new Error("Function not implemented.");
}

function mostrarResultados(): void {
    throw new Error("Function not implemented.");
}


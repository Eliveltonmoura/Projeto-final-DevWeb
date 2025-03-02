const authorizationHeaderprof = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
};
const professor = {
    nome:  localStorage.getItem("username")
};
document.addEventListener("DOMContentLoaded", () => {
    const nomeProfessor = document.getElementById("nomeProfessor") as HTMLElement;
    
    nomeProfessor.textContent = professor.nome;


    document.getElementById("logout")?.addEventListener("click", () => {
        alert("Você saiu da conta!");
        window.location.href = "login.html"; 
    });

    document.getElementById("addAtividade")?.addEventListener("click", adicionarAtividade);

   
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

class ProfessorDashboard {
    async loadActivities(): Promise<void> {
        const listaAtividades = document.getElementById("listaAtividades") as HTMLDivElement;
        
        if (!listaAtividades) {
            console.error("Erro: Elemento listaAtividades não encontrado.");
            return;
        }

        const res = await api.get('/atividades',authorizationHeaderprof);
        const atividades = res.data.data || [];

        if (atividades.length === 0) {
            listaAtividades.innerHTML = "<p>Nenhuma atividade encontrada.</p>";
            return;
        }

        listaAtividades.innerHTML = "";
        atividades.forEach((atividade: { tarefa: string; descricao: string; praso: string; done: boolean; }) => {
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
    }
}

const professorDashboard = new ProfessorDashboard();

document.addEventListener("DOMContentLoaded", () => {
    professorDashboard.loadActivities(); 
});


function AddAtividade(){

    window.location.href = "/frontend/src/pag/adicionar_atividade.html";
}


let atividadeDelete: Atividade;

const authorizationHeaderprof = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
};
const professor = {
    nome: localStorage.getItem("username")
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

        const res = await api.get('/atividades', authorizationHeaderprof);
        const atividades = res.data.data || [];
       // console.log("Resposta completa do Strapi:", JSON.stringify(res.data, null, 2));
        if (atividades.length === 0) {
            listaAtividades.innerHTML = "<p>Nenhuma atividade encontrada.</p>";
            return;
        }

        listaAtividades.innerHTML = "";
        atividades.forEach((atividade: { tarefa: string; descricao:string ,documentId: string, praso: string; done: boolean; }) => {
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
    }

    async delete(atividade: Atividade): Promise<Atividade> {
        await api.delete(`/atividades/${atividade.documentId}`, authorizationHeaderprof)
        return atividade
    }
}

const professorDashboard = new ProfessorDashboard();


document.addEventListener("DOMContentLoaded", () => {
    professorDashboard.loadActivities();
});

document.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;

    
    

    if (target.classList.contains("delete-button")) {
        const postElement = target.closest(".atividade") as HTMLElement;
        const postId = postElement?.getAttribute("data-id");
       console.log(postId)

        if (postId) {
            professorDashboard.delete({ documentId: postId } as Atividade);
            console.log("deletou")
            postElement.remove();
           
        }
    }
        


});

function AddAtividade() {
    window.location.href = "/frontend/src/pag/adicionar_atividade.html";
}



const authorizationHeaderAtividade = {

    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
};
class AtividadeManager {
    async getAll(): Promise<Atividade[]> {

        const res = await api.get('/atividades', authorizationHeaderAtividade);
        console.log("Atividades carregadas:", res.data);
        return res.data.data || [];

    }

    async create(atividades: Atividade): Promise<StrapiResponseSingleAtiviade<Atividade>> {
        const res = await api.post('/atividades/',
            {
                "data": {
                    tarefa: atividades.tarefa,
                    descricao: atividades.description,
                    praso: atividades.praso,

                },
            }, authorizationHeaderAtividade,
        );
        this.loadActivities();
        return res.data;

    }


    async loadActivities(): Promise<void> {
        const listaAtividades = document.getElementById("listaAtividades") as HTMLDivElement;

        if (!listaAtividades) {
            console.error("Erro: Elemento listaAtividades não encontrado.");
            return;
        }

        listaAtividades.innerHTML = "Carregando atividades...";

        const atividades = await this.getAll();

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
    }
}

const atividadeManager = new AtividadeManager();


document.addEventListener("DOMContentLoaded", () => {
    console.log("Script carregado!");


    const formAtividade = document.getElementById("formAtividade") as HTMLFormElement;

    if (!formAtividade) {
        console.error("Erro: Formulário não encontrado.");
        return;
    }


    formAtividade.addEventListener("submit", async (event: Event) => {
        event.preventDefault();


        const tarefa = (document.getElementById("titulo") as HTMLInputElement).value;
        const descricao = (document.getElementById("descricao") as HTMLTextAreaElement).value;
        const dataFim = (document.getElementById("data_fim") as HTMLInputElement).value;


        if (!tarefa || !descricao || !dataFim) {
            alert("Preencha todos os campos!");
            return;
        }


        const novaAtividade: Atividade = {
            tarefa,
            description: descricao,
            done: false,
            praso: dataFim
        };


        await atividadeManager.create(novaAtividade);
        formAtividade.reset();
    });


    atividadeManager.loadActivities();
});

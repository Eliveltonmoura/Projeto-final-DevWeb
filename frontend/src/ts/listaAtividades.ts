const authorizationHeaderAtividades = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
};
const listaAtividades = document.getElementById("listaAtividades") as HTMLDivElement;
const teste = document.getElementById("teste") as HTMLDivElement;
if (listaAtividades) {
    async function carregarAtividades() {
        const res = await api.get("/atividades/" , authorizationHeaderAtividades);
        const atividades = res.data.data || [];

        listaAtividades.innerHTML = "";

        atividades.forEach((atividade: any) => {
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
    }

    carregarAtividades();
}

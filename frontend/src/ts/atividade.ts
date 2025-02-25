

//import axios from 'axios';



//const baseURL = 'http://localhost:1337/api/atividades';



const listaAtividades = document.getElementById("listaAtividades");


if (listaAtividades) {
    listaAtividades.textContent = "Aqui ficaria a lista de atividades";
     
}

//getStrapi()








/*





class TaskManager {

    async getAll(): Promise<StrapiResponse<Atividade>> {
        const res = await api.get('/atividades');
        return res.data;
        console.log(res.data);
    }


    async create(atividade: Atividade): Promise<StrapiResponseSingle<Atividade>> {

        console.log("Criando Atividade:", atividade);

        const res = await api.post('/atividades', {
            data: {
                description: atividade.description,
                category: atividade.category.documentId,
                done: atividade.done,
                deadline: atividade.deadline,
                titulo: atividade.titulo
            }
        });

        return res.data;

    }
}



export const taskManager = new TaskManager();*/
//import { api } from "./axiosConfig";

class TaskManager {
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



export const taskManager = new TaskManager();
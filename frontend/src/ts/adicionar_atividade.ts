import { api } from "./axiosConfig";

class TaskManager {
    async create(atividade: Atividade): Promise<StrapiResponseSingle<Atividade>> {
        try {
            console.log("Criando Atividade:", atividade);

            const res = await api.post('/atividades', {
                data: {
                    description: atividade.description,
                    category: atividade.category.documentId,
                    done: atividade.done,
                    deadline: atividade.deadline,
                    titulo: atividade.titulo // Adicionado o campo titulo
                }
            });

            return res.data;
        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
            throw error;
        }
    }
}


export const taskManager = new TaskManager();
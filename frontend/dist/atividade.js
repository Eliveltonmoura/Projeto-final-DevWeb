//import { api } from "./axiosConfig";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TaskManager {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield api.get('/atividades');
            return res.data;
            console.log(res.data);
        });
    }
    create(atividade) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Criando Atividade:", atividade);
            const res = yield api.post('/atividades', {
                data: {
                    description: atividade.description,
                    category: atividade.category.documentId,
                    done: atividade.done,
                    deadline: atividade.deadline,
                    titulo: atividade.titulo
                }
            });
            return res.data;
        });
    }
}
export const taskManager = new TaskManager();

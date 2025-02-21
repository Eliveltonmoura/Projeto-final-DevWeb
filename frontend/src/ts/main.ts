



    const formAtividade = document.getElementById("formAtividade") as HTMLFormElement;

    formAtividade.addEventListener("submit", async (event) => {
        event.preventDefault();

        const tituloInput = document.getElementById("titulo") as HTMLInputElement;
        const descricaoInput = document.getElementById("descricao") as HTMLTextAreaElement;
        const dataFimInput = document.getElementById("data_fim") as HTMLInputElement;
        
        console.log(tituloInput.value);
        console.log(descricaoInput.value);
        console.log(dataFimInput.value);


        
        const atividade = {
            description: descricaoInput.value,
            deadline: dataFimInput.value,
            done: false,
            category: {
                documentId: "1"
            },
            titulo: tituloInput.value
        };

        
    });

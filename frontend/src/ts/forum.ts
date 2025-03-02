
const authorizationHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

console.log(localStorage.getItem('token'));

function createPost(content: string, id: string): void {
  const postsContainer = document.getElementById('postsContainer');

  if (postsContainer) {
    const postElement = document.createElement('div');
    postElement.setAttribute("data-id", id);
    postElement.classList.add('post');

    postElement.innerHTML = `
      <p class="post-content">${content}</p>
      
      <div class="comment-section">
        <input type="text" class="comment-input" placeholder="Comentar...">  
        <button class="comment-button">Enviar</button>
        <button class="edit-button">Editar</button>
        <button class="delete-button">Deletar</button>
      
        <div class="comments"></div>
      </div>
    `;

    const commentButton = postElement.querySelector('.comment-button') as HTMLButtonElement;
    const commentInput = postElement.querySelector('.comment-input') as HTMLInputElement;
    const commentsDiv = postElement.querySelector('.comments') as HTMLDivElement;

    commentButton.addEventListener('click', () => {
      const commentText = commentInput.value.trim();
      if (commentText) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerText = commentText;
        commentsDiv.appendChild(commentElement);
        commentInput.value = '';
      }
    });

    postsContainer.appendChild(postElement);
  }
}

class ForumManager {
  async getAll(): Promise<StrapiResponseForum<Forum>> {
    const res = await api.get('/forums/', authorizationHeader);
    


    if (!res.data || !res.data.data || res.data.data.length === 0) {
      console.error("Erro: Nenhum post encontrado.");
      return res.data;
    }


    res.data.data.forEach((post: { Titulo?: string, documentId: string }) => {
      if (post.Titulo) {
        createPost(post.Titulo, post.documentId);
      }
    });

    return res.data;
  }

  async create(forum: Forum): Promise<StrapiResponseSingleForum<Forum>> {
    const res = await api.post('/forums/',
      {
        data: {
          Titulo: forum.Titulo,
        },
      },
      authorizationHeader,
    );
    return res.data;

  }


  async getById(id: string): Promise<StrapiResponseSingleForum<Forum>> {
    const res = await api.get(`/forums/${id}`, authorizationHeader)

    return res.data;

  }

  async delete(forum: Forum): Promise<Forum> {
    await api.delete(`/forums/${forum.documentId}`, authorizationHeader)
    return forum
  }

  async update(forum: Forum): Promise<void> {
    await api.put(
      `/forums/${forum.documentId}`,
      {
        data: {
          Titulo: forum.Titulo,
        },
      },
      authorizationHeader
    );
  }
}

const forumForm = document.getElementById('forumForm') as HTMLFormElement;
const postContent = document.getElementById('postContent') as HTMLInputElement;


let forumToDelete: Forum;

const forumManager = new ForumManager();

document.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("delete-button")) {
    const postElement = target.closest(".post") as HTMLElement;
    const postId = postElement?.getAttribute("data-id");
    console.log(postId)

    if (postId) {
      await forumManager.delete({ documentId: postId } as Forum);
      postElement.remove();
    }
  }

});

document.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("edit-button")) {
    const postElement = target.closest(".post") as HTMLElement;
    const postId = postElement?.getAttribute("data-id");
    const postContentElement = postElement.querySelector(".post-content") as HTMLElement;

    if (postId && postContentElement) {
      const newTitle = prompt("Digite o novo título:", postContentElement.innerText);

      if (newTitle && newTitle.trim() !== "") {
        await forumManager.update({ documentId: postId, Titulo: newTitle } as Forum);
        postContentElement.innerText = newTitle;
      }
    }
  }
});

forumForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!postContent.value.trim()) {
    alert("Por favor, escreva algo antes de postar.");
    return;
  }

  const forum: Forum = {
    Titulo: postContent.value,
    done: false,
    deadline: new Date().toISOString(),
  };



  await forumManager.create(forum);
  forumManager.getAll();

  // createPost(postContent.value);
  forumForm.reset();
});

forumManager.getAll();


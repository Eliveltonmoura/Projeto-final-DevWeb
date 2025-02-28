
const authorizationHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

console.log(localStorage.getItem('token'));

function createPost(content: string): void {
  const postsContainer = document.getElementById('postsContainer');

  if (postsContainer) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    postElement.innerHTML = `
      <p>${content}</p>
      <div class="comment-section">
        <input type="text" class="comment-input" placeholder="Comentar...">
        <button class="comment-button">Enviar</button>
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
    const res = await api.get('/forums/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        populate: 'category',
        'filters[user][$eq]': localStorage.getItem('documentId'),
      },
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
    const res = await api.get(`/forums/${id}`, authorizationHeader);
    return res.data;
  }

  async delete(forum: Forum): Promise<Forum> {
    await api.delete(`/forums/${forum.documentId}`, authorizationHeader);
    return forum;
  }

  async update(forum: Forum): Promise<StrapiResponseSingleForum<Forum>> {
    const res = await api.put(
      `/forums/${forum.documentId}`,
      {
        data: {
          Titulo: forum.Titulo,
        },
      },
      authorizationHeader,
    );
    return res.data;
  }
}

const forumForm = document.getElementById('forumForm') as HTMLFormElement;
const postContent = document.getElementById('postContent') as HTMLInputElement;

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

  const forumManager = new ForumManager();
  await forumManager.create(forum); // Aguarde a resposta do backend

  forumForm.reset();
});
const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
    localStorage.removeItem('username');
    window.location.href = './index.html';
});

const posts = localStorage.getItem('posts');
const postssss = JSON.parse(posts);
const params = new URLSearchParams(document.location.search);
const postid = Number(params.get("postid"));

const postsss = postssss.filter((post) => {
    return post.id === postid;
});
console.log(postsss);

const postss = document.querySelector('.posts');

for (let post of postsss) {
    const item = document.createElement('p');
    const head = document.createElement('h5');
    item.classList.add('post');
    head.classList.add('head');

    head.textContent = post.title;
    item.textContent = post.Post;
    postss.appendChild(head);
    postss.appendChild(item);
}

// COMMENT HANDLING

const comm = document.querySelector('#save');
const cos = document.querySelector('.comments');

async function loadComments() {
    const resp = await fetch(`http://localhost:4000/api/${postid}/comment`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (resp.ok) {
        const data = await resp.json();
        renderComments(data); // display immediately
    } else {
        console.error("Failed to load comments");
    }
}

function renderComments(commentArray) {
    cos.innerHTML = ''; // Clear previous comments
    const filtered = commentArray.filter(c => c.PostId === postid);

    for (let ca of filtered) {
        const ite = document.createElement('h3');
        const user = document.createElement('p');
        const l = document.createElement('li');

        user.classList.add('user');
        ite.classList.add('item');

        user.textContent = `by ${ca.username}`;
        ite.textContent = ca.comment;

        l.appendChild(ite);
        l.appendChild(user);
        cos.appendChild(l);
    }
}

// Initial load
loadComments();

comm.addEventListener('click', async (e) => {
    e.preventDefault();

    const comment = document.querySelector('#co').value;

    if (!comment) {
        return alert("Please Fill all Fields");
    }

    const json = { comment };
    const response = await fetch(`http://localhost:4000/api/${postid}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(json)
    });

    if (response.ok) {
        alert("Successfully Commented");
        document.querySelector('#co').value = '';
        loadComments(); // reload comments after posting
    } else {
        alert("Something Went Wrong");
    }
});

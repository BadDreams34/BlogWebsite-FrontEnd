const username = document.querySelector('#content')
const user = document.createElement('p')
user.textContent= `${localStorage.getItem('username')}`
console.log(user.textContent)
username.appendChild(user);

const logout = document.querySelector('#logout')
logout.addEventListener('click', ()=>{
    localStorage.removeItem('username')
    window.location.href= './index.html'
})


const posts = localStorage.getItem('posts')
const postssss= JSON.parse(posts)
console.log('userid', localStorage.getItem('userid'))   
const postsss = postssss.filter((post)=>{
    console.log(post.AuthorId)
    return post.AuthorId === Number(localStorage.getItem('userid'))})
const postss = document.querySelector('.posts')


for (let post of postsss) {
    const item = document.createElement('a')
    const li = document.createElement('li')
    item.textContent = post.title
    item.href = `./mainpost.html?postid=${post.id}`
    postss.appendChild(li)
    li.appendChild(item)
}




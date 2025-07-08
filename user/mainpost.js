const logout = document.querySelector('#logout')


logout.addEventListener('click', ()=>{
    localStorage.removeItem('username')
    window.location.href= './index.html'
})

const posts = localStorage.getItem('posts')
const postssss= JSON.parse(posts)  
const params = new URLSearchParams(document.location.search)
const postid = Number(params.get("postid"))


const postsss = postssss.filter((post)=>{
    return post.id === postid})
    console.log(postsss)
const postss = document.querySelector('.posts')


for (let post of postsss) {
    const item = document.createElement('p')
     const head = document.createElement('h5')
    item.classList.add('post')
    head.classList.add('head')

   
    head.textContent = post.title
    item.textContent = post.Post
    postss.appendChild(head) 
    postss.appendChild(item)
}

const comm = document.querySelector('#save')

async function fetcsh() {
const resp = await fetch(`https://blogwebsite-production-3f31.up.railway.app/api/${postid}/comment`, {
        method: "GET", headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}`}
    } )
    if (resp.ok) {
        const data = await resp.json()
        const comments = JSON.stringify(data)
         localStorage.setItem('comments', comments)
    }
}
fetcsh()
comm.addEventListener('click', async (e)=>{
      e.preventDefault();
    
    
    const comment = document.querySelector('#co').value
   
    const json = {comment}
    if (!comment) {
        return alert("Please Fill all Fields")
    }
    const response = await fetch(`https://blogwebsite-production-3f31.up.railway.app/api/${postid}/comment`, {
        method: "POST", headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}`}, body: JSON.stringify(json)
    } )
    if (response.ok) {
        const data = await response.json()
        const comments = JSON.stringify(data)
         localStorage.setItem('comments', comments)
         comment.value = ''
        
        alert("SuccessFully Commented")
        window.location.href= `./mainpost.html?postid=${postid}`;
    } else {
        alert("Something Went Wrong")
    }
})






const c = localStorage.getItem('comments')
const cc= JSON.parse(c)
  
const ccc = cc.filter((comm)=>{
    return comm.PostId === postid})


const cos = document.querySelector('.comments')

for (let ca of ccc) {
    const ite = document.createElement('h3')
    const user = document.createElement('p')
    user.classList.add('user')
    ite.classList.add('item')
    const l = document.createElement('li')
    user.textContent = `by ${ca.username}`
    ite.textContent = ca.comment
    cos.appendChild(l)
    l.appendChild(ite)
    l.appendChild(user)
}

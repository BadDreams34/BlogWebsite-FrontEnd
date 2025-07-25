const save = document.querySelector('#save')
const discard = document.querySelector('#discard');
save.addEventListener('click', async (e)=>{
      e.preventDefault();
    const title = document.querySelector('#title').value
    const post = document.querySelector('#Post').value
    const json = {title, post}
    if (!title || !post) {
        return alert("Please Fill all Fields")
    }
    const response = await fetch(`${process.env.BASEURL}/api/posts`, {
        method: "POST", headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}`}, body: JSON.stringify(json)
    } )
    if (response.ok) {
        const data = await response.json()
        const posts = JSON.stringify(data)

        console.log(posts)
        localStorage.setItem('posts', posts)
        
        alert("SuccessFully Posted")
        window.location.href= './profile.html'
    } else {
        alert("Something Went Wrong")
    }
})

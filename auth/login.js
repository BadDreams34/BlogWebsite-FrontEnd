
const button = document.querySelector('#button')


button.addEventListener('click', async ()=>{
    try {
const email = document.querySelector('#email').value
const password = document.querySelector('#password').value
console.log('it should be shown')
   const body = {email, password}
const response = await fetch('http://localhost:4000/auth/login', {method: "POST", body: JSON.stringify(body), headers: {"Content-Type": "application/json"}})
console.log(response)
if (response.ok) {
    try {

        const data = await response.json()
        const posts = JSON.stringify(data.posts)
        console.log(posts)
    localStorage.setItem('userid', data.user.id)
    localStorage.setItem('posts', posts)
    localStorage.setItem('username', data.user.username)
    localStorage.setItem('token', data.token)
    alert("Login Successful")
    window.location.href='../user/welcome.html'
    

    } catch(err) {
        console.log(err)
    }
    // on posting a new post it should update yeah do it okh 
  
} else { 
    alert('Login Failed')}
} catch(err) {
    console.log(err)
}
})


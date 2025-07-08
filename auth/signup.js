
const button = document.querySelector('#button')


button.addEventListener('click', async ()=>{
    try {
const email = document.querySelector('#email').value
const password = document.querySelector('#password').value
const confirmpassword = document.querySelector('#confirmpass').value
const username = document.querySelector('#username').value
          if (confirmpassword !== password) {
   return alert('password Does not Match')  }
   const body = {username, email, password}
const response = await fetch('https://blogwebsite-production-3f31.up.railway.app/auth/signup', {method: "POST", body: JSON.stringify(body), headers: {"Content-Type": "application/json"}})
if (response.ok) {
    alert("signup Successful")
    window.location.href= '../index.html'
} else { 
    alert('Signup Failed User Already Exists')}
} catch(err) {
    console.log(err)
}
})



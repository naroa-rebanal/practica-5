import { registerService } from "../register/RegisterService.js";


document.addEventListener("DOMContentLoaded", async () => {
    const headerElement = document.querySelector("nav ul");

    const logoutHeader = `
            <li><a href="index.html">Anuncios</a></li>
            <li><a href="login.html">Login</a></li>
    `;

    const loginHeader = `
    <li><a href="index.html">Inicio</a></li>
    <li><a href="myAds.html">Mis anuncios</a></li>
    <li><a href="newAd.html">Crear anuncio</a></li>
    <li><p class="logout">Logout</p></li>
`;
  
    const loggedUserToken = registerService.getLoggedUser();


    if (loggedUserToken) {
headerElement.innerHTML = loginHeader;

    }else{
        headerElement.innerHTML = logoutHeader;
    }



document.querySelector('.logout').addEventListener('click', ()=>{
    localStorage.removeItem('jwt');
    window.location.href = "/login.html";
})




});



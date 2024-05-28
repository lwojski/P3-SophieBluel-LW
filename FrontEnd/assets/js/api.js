// RÉCUPÉRATION DES DONNÉES DE L'API

const url='http://localhost:5678/api/'


// CATÉGORIES
export async function getCategories() {
    return fetch(`${url}categories`)
        .then(response => response.json())
}


// WORKS
export async function getWorks() {
    return fetch(`${url}works`)
        .then(response => response.json())
}


// LOGIN
export async function login () {
    document.addEventListener('submit', (event) => {
        event.preventDefault()
        let formInfo = {
            email: document.getElementById('email'),
            password: document.getElementById('password'),
            submit: document.querySelector('.submitInfo')
        }
    
        return fetch(`${url}users/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formInfo.email.value,
                password: formInfo.password.value,
            }),
        })
        .then(response => response.json())
        // (Stockage du token d'authentification)
        .then((data) => {
            if (data.message) {
                alert("Erreur dans l’identifiant ou le mot de passe")
            } else {
                sessionStorage.setItem("token", data.token)
                window.location.replace("index.html")
            }
        })
    })
}


// SUPPRESSION DE WORK
export async function deleteWork(id) {
    let token = sessionStorage.getItem('token')
    const response = await fetch(`${url}works/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        },
    });
}
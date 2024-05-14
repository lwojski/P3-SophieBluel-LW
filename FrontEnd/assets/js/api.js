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
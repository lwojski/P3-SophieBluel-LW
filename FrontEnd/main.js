import {getCategories, getWorks} from "./assets/js/api.js"
import {createCategory, createCategoryAll, createWork} from "./assets/js/element.js"
import {categorieObjets, categorieAppartements, categorieHotelsEtRestaurants, categorieTous} from "./assets/js/filtres.js"

// APPEL - CATÉGORIES & WORKS
const categories = await getCategories()
createCategoryAll()
categories.forEach(category => {
    createCategory(category)
})

const works = await getWorks()
works.forEach(work => {
    createWork(work)  
})

// FILTRES
const filtreObjets = document.querySelector('button.categorie[value="1"]')
    filtreObjets.addEventListener('click', categorieObjets)

const filtreAppartements = document.querySelector('button.categorie[value="2"]')
    filtreAppartements.addEventListener('click', categorieAppartements)

const filtreHotelsEtRestaurants = document.querySelector('button.categorie[value="3"]')
    filtreHotelsEtRestaurants.addEventListener('click', categorieHotelsEtRestaurants)

const filtreTous = document.querySelector('button.categorie[value="0"]')
    filtreTous.addEventListener('click', categorieTous)
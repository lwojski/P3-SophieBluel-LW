import {getCategories, getWorks} from "./assets/js/api.js"
import {createCategory, createCategoryAll, createWork, filterWorksByCategory, adminRights, createModalWork, addModalWork, selectCategory} from "./assets/js/element.js"


// IMPORT - CATÉGORIES & WORKS
const categories = await getCategories()
createCategoryAll()
categories.forEach(category => {
    createCategory(category)
})

const works = await getWorks()
works.forEach(work => {
    createWork(work)  
})


// GESTION CSS DES CATÉGORIES 
const defaultCategory = document.querySelector('button.categorie[value="0"]')
defaultCategory.classList.add('selectedCategory')

const categoriesElement = document.querySelectorAll('button.categorie')

categoriesElement.forEach(category => {
    category.addEventListener('click', (e) => {
        const CategoryId = e.currentTarget.value
        categoriesElement.forEach(category => category.classList.remove('selectedCategory'))
        category.classList.add('selectedCategory')

        filterWorksByCategory(CategoryId)
    })
})


// IMPORT ADMIN
await adminRights()


// MODAL GALLERY
const modalWorks = await getWorks()
const modalContent = document.querySelector('.modalContent')
modalContent.innerHTML = ""

modalWorks.forEach(modalWork => {
    createModalWork(modalWork)
})


// MODAL ONGLET - AJOUTS DE WORKS
await addModalWork()


// AFFICHAGE LISTE CATEGORIES - AJOUTS DE WORKS
await selectCategory()
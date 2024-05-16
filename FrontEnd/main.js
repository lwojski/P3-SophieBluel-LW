import {getCategories, getWorks} from "./assets/js/api.js"
import {createCategory, createCategoryAll, createWork, adminRights} from "./assets/js/element.js"

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

function filterWorksByCategory(categoryId) {
    const workCards = document.querySelectorAll('.gallery figure')
    workCards.forEach((workCard) => {
        const workCategoryId = workCard.getAttribute('category-id')
        if (workCategoryId == categoryId || categoryId === '0') {
            workCard.style.display = 'block'
        } else {
            workCard.style.display = 'none'
        }
    })
}
const categoriesElement = document.querySelectorAll('button.categorie')
categoriesElement.forEach(category => {
    category.addEventListener('click', (e) => {
        console.log(e.currentTarget.value)
        const CategoryId = e.currentTarget.value

        filterWorksByCategory(CategoryId)
    })
})

// ADMIN

await adminRights()
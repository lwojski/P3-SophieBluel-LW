// CRÉATION DES ÉLEMENTS HTML

// FILTRES & CATÉGORIES
export function createCategory(category) {
    const filters = document.querySelector('.filtres')
    
    const filterCategory = document.createElement('button')
    filterCategory.classList.add('categorie')
    filterCategory.setAttribute('value', category.id)

    const categoryName = document.createElement('span')
    categoryName.innerText = category.name

    filterCategory.appendChild(categoryName)
    filters.appendChild(filterCategory)
}

export function createCategoryAll() {
    createCategory({id: 0, name:'Tous'})
}

// WORKS
export function createWork(work) {
    const gallery = document.querySelector('.gallery')
    const workCard = document.createElement('figure')
    workCard.setAttribute('data-id', work.id)
    workCard.setAttribute('category-id', work.categoryId)

    const workImage = document.createElement('img')
    workImage.src = work.imageUrl
    workImage.alt = work.title

    const workTitle = document.createElement('figcaption')
    workTitle.innerText = work.title

    workCard.appendChild(workImage)
    workCard.appendChild(workTitle)
    gallery.appendChild(workCard)
}
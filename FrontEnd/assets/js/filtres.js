// FILTRES POUR CHAQUE CATÉGORIES

// FILTRE - OBJETS
export function categorieObjets() {
    const workCards = document.querySelectorAll('.gallery figure')
    workCards.forEach((workCard) => {
        const categoryId = workCard.getAttribute('category-id')
        if (categoryId === '1') {
            workCard.style.display = 'block'
        } else {
            workCard.style.display = 'none'
        }
    })
}

// FILTRE - APPARTEMENTS
export function categorieAppartements() {
    const workCards = document.querySelectorAll('.gallery figure')
    workCards.forEach((workCard) => {
        const categoryId = workCard.getAttribute('category-id')
        if (categoryId === '2') {
            workCard.style.display = 'block'
        } else {
            workCard.style.display = 'none'
        }
    })
}

// FILTRE - HOTELS ET RESTAURANTS
export function categorieHotelsEtRestaurants() {
    const workCards = document.querySelectorAll('.gallery figure')
    workCards.forEach((workCard) => {
        const categoryId = workCard.getAttribute('category-id')
        if (categoryId === '3') {
            workCard.style.display = 'block'
        } else {
            workCard.style.display = 'none'
        }
    })
}

// FILTRE - TOUS
export function categorieTous() {
    const workCards = document.querySelectorAll('.gallery figure')
    workCards.forEach((workCard) => {
        workCard.style.display = 'block'
    })
}
// CRÉATION ET GESTION DES ÉLEMENTS HTML

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

// ADMIN MODE

export async function adminRights() {
    const token = sessionStorage.getItem('token')

    if (token) {
        // (Gestion des élements en session admin)
        document.querySelector('.filtres').style.display = 'none'
        document.getElementById('loginButton').innerText = 'logout'

        const editBtn = document.createElement('span')
        editBtn.classList.add('editButton')
        editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Modifier'

        const sectionH2 = document.querySelector('#portfolio h2')
        sectionH2.style.margin = '0px 0px 147px 0px'
        sectionH2.appendChild(editBtn)

        const body = document.querySelector('body')
        const topBar = document.createElement('div')
        topBar.className = 'topBar'
        const topBarText = document.createElement('p')
        topBarText.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition'

        body.insertAdjacentElement('afterbegin', topBar)
        topBar.append(topBarText)

        const header = document.querySelector('header')
        header.style.margin = '108px 0px'
        
        // (Gestionnaire de déconnexion en cliquant sur logout)
        const logoutButton = document.getElementById('loginButton')
        logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('token')
        window.location.replace('login.html')
    })
    }
}
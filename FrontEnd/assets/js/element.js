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
        // (GESTION DES ELEMENTS - ADMIN)
        document.querySelector('.filtres').style.display = 'none'
        document.getElementById('loginButton').innerText = 'logout'

        // (Gestion du bouton - Modifier)
        const editBtn = document.createElement('span')
        editBtn.classList.add('editButton')
        editBtn.innerHTML = '<a href="#modalEdit"><i class="fa-regular fa-pen-to-square"></i> Modifier</a>'

        const sectionH2 = document.querySelector('#portfolio h2')
        sectionH2.style.margin = '110px 0px 100px 110px'
        sectionH2.appendChild(editBtn)

        // (Gestion Header - Mode édition)
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

        // (Afficher/Cacher la Modale)
        const modal = document.querySelector('#modalWorks')
        editBtn.addEventListener('click', function () {
            modal.style.display = 'flex'
        })

        const modalClose = document.querySelector('#modalClose')
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none'
        })
    }
}

// MODAL WORKS
export function createModalWork(modalWork) {

    const modalContent = document.querySelector('.modalContent')

    const modalWorkCard = document.createElement('figure')
    modalWorkCard.setAttribute('data-id', modalWork.id)
    modalWorkCard.setAttribute('category-id', modalWork.categoryId)
    modalWorkCard.className = "modalWork"

    const modalWorkImage = document.createElement('img')
    modalWorkImage.src = modalWork.imageUrl
    modalWorkImage.alt = modalWork.title

    const trashSupp = document.createElement('i')
    trashSupp.id = modalWork.id
    trashSupp.className = 'fa-solid fa-trash-can'

    modalWorkCard.appendChild(modalWorkImage)
    modalWorkCard.appendChild(trashSupp)
    modalContent.appendChild(modalWorkCard)
}

// MODAL ONGLET - AJOUTS DE WORKS
export function addModalWork(addModalWork) {

    // (GESTION D'AFFICHAGE DES ÉLEMENTS)
    const modalTitle = document.querySelector('.modalTitle h3')
    const btnAddModalWork = document.querySelector('#addWork')

    btnAddModalWork.addEventListener('click', (event) => {
        const modalWorksCards = document.querySelectorAll('.modalWork')
        modalWorksCards.forEach(card => {
            card.style.display = 'none'
        })
        
        const modalContents = document.querySelector('.modalContent')
        const modalForm = document.querySelector('.modalForm')

        modalContents.style.display = 'none'
        modalForm.style.display = 'flex'
        modalTitle.innerText = 'Ajout photo'
        btnAddModalWork.innerText = 'Valider'

        // (Affichage du formulaire d'ajouts d'images)
        const addWorkForm = document.querySelector('#addWorkForm')
        addWorkForm.style.display = 'flex'

        // (Affichage du formulaire d'info)
        const addWorkInfoForm = document.querySelector('#addWorkInfoForm')
        addWorkInfoForm.style.display = 'flex'
    
        // (Création de la flèche de retour en arrière)
        const echapButton = document.createElement('button')
        echapButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>'
        echapButton.classList.add('echapButton')
        echapButton.style.display = 'flex'

        modalClose.insertAdjacentElement('beforebegin', echapButton)
    
        // (Gestion des éléments après avoir clique sur la flèche de retour)
        echapButton.addEventListener('click', (event) => {
            modalWorksCards.forEach(card => {
                card.style.display = 'block'
            })

            modalTitle.innerText = 'Galerie photo'
            btnAddModalWork.innerText = 'Ajouter une photo'
            echapButton.style.display = 'none'
            addWorkForm.style.display = 'none'
            modalContents.style.display = 'flex'
            modalForm.style.display = 'none'
        })
    })
}
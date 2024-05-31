import {getCategories, deleteWork, addNewWork} from "./api.js"


// CRÉATION ET GESTION DES ÉLEMENTS


// CREATION FILTRES & CATÉGORIES
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


// CREATION WORKS
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


// FILTRER LES WORKS PAR CATÉGORIES
export function filterWorksByCategory(categoryId) {
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
        editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier</a>'

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

        // (Ouvrir/Fermer la Modale)
        const modal = document.querySelector('#modalWorks')
        editBtn.addEventListener('click', function () {
            modal.style.display = 'flex'
        })

        const modalClose = document.querySelector('#modalClose')
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none'
        })

        const modalWrapper = document.querySelector('.modal-wrapper')
        document.addEventListener('click', function (e) {
            if (modal.style.display === 'flex' && !modalWrapper.contains(e.target) && e.target !== editBtn) {
                modal.style.display = 'none';
            }
        })
    }
}


// SUPPRESSION D'UN WORK DE LA GALLERIE
function removeGalleryWork(workId) {
    const workCardId = document.querySelector(`.gallery figure[data-id='${workId}']`)
    if (workCardId) {
        workCardId.remove()
    }
}


// CREATION MODAL WORKS & POUBELLE
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

    // (Supression d'un work (de l'API, la GALLERIE et la MODALE) en cliquant sur la poubelle)
    trashSupp.addEventListener('click', async(e) => {
        await deleteWork(modalWork.id)
        modalWorkCard.remove()
        removeGalleryWork(modalWork.id)
    })

    modalWorkCard.appendChild(modalWorkImage)
    modalWorkCard.appendChild(trashSupp)
    modalContent.appendChild(modalWorkCard)

    return modalWorkCard
}


// MODAL ONGLET - AJOUTS DE WORKS
export function addModalWork(addModalWork) {

    // (GESTION D'AFFICHAGE DES ÉLEMENTS)
    const modalTitle = document.querySelector('.modalTitle h3')
    const btnAddModalWork = document.querySelector('#addWork')
    const btnValider = document.querySelector('#addWorkConfirm')
    const modalContents = document.querySelector('.modalContent')
    const modalForm = document.querySelector('.modalForm')

    btnAddModalWork.addEventListener('click', (event) => {
        const modalWorksCards = document.querySelectorAll('.modalWork')
        modalWorksCards.forEach(card => {
            card.style.display = 'none'
        })

        modalContents.style.display = 'none'
        modalForm.style.display = 'flex'
        modalTitle.innerText = 'Ajout photo'
        btnAddModalWork.style.display = 'none'
        btnValider.style.display = 'block'

        // (Affichage du formulaire d'ajouts d'images)
        const addWorkForm = document.querySelector('#addWorkForm')
        addWorkForm.style.display = 'flex'

        // (Affichage du formulaire d'info)
        const addWorkInfoForm = document.querySelector('#addWorkInfoForm')
        addWorkInfoForm.style.display = 'flex'
    
        // (Affichage de la flèche de retour en arrière)
        const echapButton = document.querySelector('#echapButton')
        echapButton.style.display = 'flex'

        modalClose.insertAdjacentElement('beforebegin', echapButton)
    
        // (Gestion des éléments après avoir clique sur la flèche de retour)
        echapButton.addEventListener('click', (event) => {
            modalWorksCards.forEach(card => {
                card.style.display = 'flex'
            })

            modalTitle.innerText = 'Galerie photo'
            btnAddModalWork.style.display = 'block'
            btnValider.style.display = 'none'
            echapButton.style.display = 'none'
            addWorkForm.style.display = 'none'
            modalContents.style.display = 'grid'
            modalForm.style.display = 'none'
        })
    })
}


// CREATION LISTE CATEGORIES POUR AJOUTS DE WORKS
export async function selectCategory() {
    const listCategory = document.querySelector('#addCategory')
    const listCategoryApi = await getCategories()

    // (Option par défaut (vide))
    const DefaultOption = document.createElement('option')
    listCategory.appendChild(DefaultOption)

    // (Création des options)
    listCategoryApi.forEach(category => {
        const option = document.createElement('option')
        option.innerHTML = category.name
        option.value = category.name
        option.id = category.id

        listCategory.appendChild(option)
    })
}


// GESTION DE L'UPLOAD
export async function upload() {
    const fileUpload = document.querySelector('#fileUpload')
    const addWorkForm = document.querySelector('#addWorkForm')
    const imagePreview = document.createElement('img')
    const previewPlaceholder = document.querySelector('#addWorkForm i')
    const acceptedFiles = document.querySelector('.acceptedFiles')
    const fileUploadButton = document.querySelector('.fileUploadButton')
    
    fileUploadButton.addEventListener('click', function() {
        fileUpload.click()
    })

    fileUpload.addEventListener('change', function (e) {
        const file = e.target.files[0]

        if (file) {
            // (Vérification de la taille du fichier)
            if (file.size > 4 * 1024 * 1024) {
                alert('Le fichier est trop volumineux. La taille maximum autorisée est de 4 Mo.')
                fileUpload.value = ''
                return
            }
            
            // (Affichage de la preview de l'image)
            const reader = new FileReader
            reader.onload = function(e) {
                imagePreview.src = e.target.result
                imagePreview.classList.add('image-preview')
                
                // (Cacher les élements pour laisser place à la preview de l'image)
                if (previewPlaceholder) {
                    previewPlaceholder.style.display = 'none'
                }
                if (fileUploadButton) {
                    fileUploadButton.style.display = 'none'
                }
                if (acceptedFiles) {
                    acceptedFiles.style.display = 'none'
                }
                addWorkForm.insertBefore(imagePreview, addWorkForm.firstChild)
            }
            reader.readAsDataURL(file);
        }
    })

    // (Pré-requis du formulaire avant d'accepter l'upload)
    const addWorkValider = document.querySelector('#addWorkConfirm')
    const addTitle = document.querySelector('#addTitle')
    const addCategory = document.querySelector('#addCategory')

    addWorkValider.addEventListener('click', async function (e) {
        e.preventDefault()

        let errorMessage = ''
    
        if (!fileUpload.files[0]) {
            errorMessage += 'Veuillez sélectionner une photo.\n'
        }
        if (!addTitle.value.trim()) {
            errorMessage += 'Veuillez renseigner un titre.\n'
        }
        if (!addCategory.value.trim()) {
            errorMessage += 'Veuillez sélectionner une catégorie.\n'
        }

        if (errorMessage) {
            alert(errorMessage)
        } else {
            const formData = new FormData();
            const selectedCategory = addCategory.options[addCategory.selectedIndex];

            formData.append('title', addTitle.value);
            formData.append('category', selectedCategory.id)
            formData.append('image', fileUpload.files[0]);

            // (Appel de l'API Fetch)
            const newWorkCard = await addNewWork(formData)

            if (newWorkCard) {
                // (Ajout de la nouvelle photo à la galerie)
                createWork(newWorkCard)

                // (Ajout de la nouvelle photo à la modale)
                createModalWork(newWorkCard)

                // (Réinitialisation du formulaire après l'ajout)
                fileUpload.value = ''
                addTitle.value = ''
                addCategory.selectedIndex = 0
                if (imagePreview) {
                    imagePreview.remove()
                    previewPlaceholder.style.display = 'block'
                    fileUploadButton.style.display = 'flex'
                    acceptedFiles.style.display = 'flex'
                }
                alert('Photo ajoutée avec succès !')
            }
        }
    })
}
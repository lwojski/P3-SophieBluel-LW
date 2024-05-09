// CRÉATION DES ÉLEMENTS HTML

// WORKS
export function createWork(work) {
    const gallery = document.querySelector('.gallery');
    const workCard = document.createElement('figure');

    const workImage = document.createElement('img');
    workImage.src = work.imageUrl;
    workImage.alt = work.title;

    const workTitle = document.createElement('figcaption');
    workTitle.innerText = work.title;

    workCard.appendChild(workImage);
    workCard.appendChild(workTitle);
    gallery.appendChild(workCard); 
}

// FILTRES & CATÉGORIES
export function createCategory(category) {
    const portfolio = document.getElementById('portfolio');
    const filters = document.querySelector('.filtres')
    
    const filterCategory = document.createElement('div');
    filterCategory.classList.add('categorie');

    const categoryName = document.createElement('span');
    categoryName.classList.add('nom');
    categoryName.innerText = category.name;

    filterCategory.appendChild(categoryName)
    filters.appendChild(filterCategory)
    portfolio.appendChild(filters);
}
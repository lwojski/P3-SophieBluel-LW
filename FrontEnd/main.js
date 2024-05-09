function getWorks() {
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(works => {
            displayWorks(works);
        })
}

function displayWorks(works) {
    const gallery = document.querySelector('.gallery');

    works.forEach(work => {
        
        const workCard = document.createElement('figure');

        const workImage = document.createElement('img');
        workImage.src = work.imageUrl;
        workImage.alt = work.title;

        const workTitle = document.createElement('figcaption');
        workTitle.innerText = work.title;

        workCard.appendChild(workImage);
        workCard.appendChild(workTitle);
        gallery.appendChild(workCard);
    });
}

getWorks();
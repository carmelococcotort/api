document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://rickandmortyapi.com/api/character';
    const episodesContainer = document.getElementById('episodes');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    function renderEpisodes(episodes) {
        episodesContainer.innerHTML = ''; 

        episodes.forEach(episode => {
            const episodeCard = document.createElement('div');
            episodeCard.classList.add('episode-card');
            episodeCard.innerHTML = `
                <h2>${episode.name}</h2>
                <p>Estado: ${episode.status}</p> 
                <img src="${episode.image}">
            `;
            episodesContainer.appendChild(episodeCard);
        });
    }

    function searchEpisodes(searchTerm) {
        fetch(apiUrl + `/?name=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                const filteredEpisodes = data.results;
                renderEpisodes(filteredEpisodes);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            searchEpisodes(searchTerm);
        }
    });

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== '') {
                searchEpisodes(searchTerm);
            }
        }
    });
});
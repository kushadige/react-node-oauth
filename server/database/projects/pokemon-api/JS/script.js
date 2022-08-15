const container = document.querySelector('.container');
const loader = document.querySelector('.loading');

const URL = 'https://pokeapi.co/api/v2/pokemon/';
colors = {
    grass: '#DAF8DE',
    fire: '#FFDFDC',
    water: '#D8EFFC',
    bug: '#FCCF9B',
    poison: '#8BC79D',
    flying: '#F4F3F4',
    electric: '#FEF4DA',
    ground: '#F6E4D7',
    fairy: '#FDEAFF',
    normal: '#F2F1F2',
    fighting: '#E4DBD0',
    psychic: '#E9E59C',
    ghost: '#DDDDDD',
    ice: 'DFEFFF'
}

getData(URL);

let nextPage = '';

function getData(URL) {

    fetch(URL)
    .then(res => res.json())
    .then(res => {
        nextPage = res.next;

        const pokes = res.results;

        pokes.forEach(poke => {
            
            let xhr = new XMLHttpRequest();

            xhr.open('GET', poke.url, false);

            xhr.onload = function(){
                if(xhr.status === 200) {

                    pokeObj = JSON.parse(xhr.responseText);

                    createPokeCard(pokeObj);

                } else {
                    nextPage = null;
                }
            }

            xhr.send();
        })
    });
}

function createPokeCard(pokeObj) {
    
    const card = document.createElement('div');
    card.classList.add('card');

    card.style.backgroundColor = colors[`${pokeObj.types[0].type.name}`];

    card.innerHTML = `
        <div class="img-container">
            <img src="${pokeObj.sprites.other['official-artwork'].front_default}" alt="${(pokeObj.name).slice(0,1).toUpperCase() + (pokeObj.name).slice(1)}" />
        </div>
        <small id="poke-id">#${('00' + pokeObj.id).slice(-3)}</small>
        <h4 id="name">${(pokeObj.name).slice(0,1).toUpperCase() + (pokeObj.name).slice(1)}</h4>
        <p id="type">Type: ${pokeObj.types[0].type.name}</p>
    `;
    
    container.appendChild(card);
}

window.addEventListener('scroll', () => {

    if(window.scrollY + window.innerHeight >= document.body.clientHeight - 1 && nextPage) {

        getData(nextPage);

        loader.classList.add('show');
        container.style.filter = 'blur(1px)';
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            loader.classList.remove('show');
            container.style.filter = 'blur(0)';
            document.body.style.overflow = 'visible';
        }, 1300);
        
    }
});
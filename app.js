console.log('promise');

function parallelFetch() {
    const baseUrl = 'https://pokeapi.co/api/v2/';

    const names = ['bulbasaur', 'umbreon', 'sylveon', 'eevee', 'togepi', 'boh'];

    const fetches = [];

    for (const name of names) {
        const pokeUrl = baseUrl + 'pokemon/' + name;
        console.log('url: ', pokeUrl);
        const request = fetch(pokeUrl)
            .then(resp => resp.json())
            .catch(err => { //se c'\e un errore, lo gestisce e ritornanull cos\isipuò controllare facilmente.
                console.log(err.message);
                return null;
            }); //salvo ogni chiamata in una variabile e la metto da parte
        fetches.push(request);
    }

    Promise.all(fetches).then(data => {
        const filteredData = data.filter(elem => elem != null);

        console.log('risultato promise all', filteredData);

        return filteredData;
    }); //chiama tutte le richieste contemporaneamente
}

//parallelFetch();

function sequentialFetch() {
    bulbasaUrl = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';

    fetch(bulbasaUrl)
        .then(resp => resp.json())
        .then(bulbasaur => {

            const newUrl = bulbasaur.location_area_encounters;
            return fetch(newUrl).then(resp => resp.json())
                .then(enc => {
                    console.log('enc', enc);
                    const newObj = {
                        name: bulbasaur.name,
                        first_encounter: enc[0].location_area.name
                    }
                    return newObj;
                })
        }).then(enc => console.log(enc))
}

//sequentialFetch();


function getAllPokemon() {
    const pokeUrl = 'https://pokeapi.co/api/v2/pokemon';

    fetch(pokeUrl)
        .then(resp=>resp.json())
        .then(data => {
            const requests =[];
            for (const result of data.results) {
                const detailUrl = result.url;

                const request = fetch(detailUrl)
                    .then(resp => resp.json())
                    .catch(err => null);
                requests.push(request);
            }
            return Promise.all(requests);
        }).then(data => console.log(data));
}

getAllPokemon();
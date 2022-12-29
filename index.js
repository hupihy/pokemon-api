//отрисовка покемонов по поиску//
const namePokemonInput = document.getElementById('search-pokemon-input');
const searchButton = document.getElementById('search-button');
const renderSearchPokemon = (pokemonName)=> {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('#pokemon-box').innerHTML = `
          <div>
             <img id="pokemon-img" src='${data.sprites.other['official-artwork'].front_default} 'alt="${data.name}">
          </div>
          <div id="pokemon-info">
             <h2 id="pokemon-name">${(data.name)}</h2>
             <p>Weidht:${data.weight}</p>`
        })
        .catch((err)=>{
            document.querySelector('#pokemon-box').innerHTML = `<div id="not-found"><h2>Pokemon not found</h2></div>`
        })
}
searchButton.addEventListener('click',()=>{renderSearchPokemon(namePokemonInput.value.toLowerCase())})
namePokemonInput.addEventListener('keyup', event=>{
    if(event.code =='Enter'){
        renderSearchPokemon(namePokemonInput.value.toLowerCase());
    }
})
//поиск покемонов по кнопкам next  и past//
const renderButtonPokemon = (value)=>{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then((response)=>response.json())
        .then((pokemonData)=> {
            const pokemon = pokemonData.results[value];
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                .then((response)=>response.json())
                .then((data)=>{
                    document.querySelector('#pokemon-box').innerHTML=`
          <div>
             <img id="pokemon-img" src='${data.sprites.other['official-artwork'].front_default}' alt="${data.name}">
          </div>
          <div id="pokemon-info">
             <h2 id="pokemon-name">${(data.name)}</h2>
             <p>Widht:${data.weight}</p>
          </div>`
                })
        })
}
let pokemonNowIndex= 0
const nextPokemonButton = document.getElementById('next-pokemon');
const pastPokemonButton = document.getElementById('ex-pokemon');
nextPokemonButton.textContent ='next'
pastPokemonButton.textContent ='past'
const renderPokemonIndex = button=>{
    if(button ==='next'){
        
        pokemonNowIndex ++
        renderButtonPokemon(pokemonNowIndex)
    }
    else {
        if(pokemonNowIndex === 0){
            return
        }
        pokemonNowIndex --
        renderButtonPokemon(pokemonNowIndex)
    }
}
nextPokemonButton.addEventListener('click',()=>{renderPokemonIndex("next")})
pastPokemonButton.addEventListener('click',()=>{renderPokemonIndex("past")})
renderButtonPokemon(pokemonNowIndex);
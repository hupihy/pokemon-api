const renderPokemonData  = ()=>{
    const pokemonName = document.getElementById('search-pokemon-input').value


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>response.json())
        .then((data)=>{

          document.querySelector('#pokemon-box').innerHTML=`
          <div>
             <img id="pokemon-img" src='${data.sprites.other['official-artwork'].front_default}' alt="${data.name}">
          </div>
          <div id="pokemon-info">
             <h2 id="pokemon-name">${data.name}</h2>
             <p>Widht:${data.weight}</p>
          </div>
          `
        })
}

document.getElementById('search-button').addEventListener('click',renderPokemonData)




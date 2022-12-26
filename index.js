function capitalizeFirstChar  (string){
    return string.charAt(0).toUpperCase() + string.slice(1);

}

const loverCaseName = (string) =>{
    return string.toLowerCase();
}
let pokemonNow = 0;



const searchPokemon  = ()=>{
    const Name = document.getElementById('search-pokemon-input').value;
    const pokemonName = loverCaseName(Name);
    const findindexpokemon = ()=>{
        fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then().then((response)=>response.json())
            .then((indexPokemon)=> {
                for(let index = 0 ; indexPokemon.results.length;index++){
                    if(indexPokemon.results[index].name ===pokemonName){
                        pokemonNow = index
                    }

                }


            })

    }
    findindexpokemon()


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>response.json())
        .then((data)=>{

          document.querySelector('#pokemon-box').innerHTML=`
          <div>
             <img id="pokemon-img" src='${data.sprites.other['official-artwork'].front_default}' alt="${data.name}">
          </div>
          <div id="pokemon-info">
             <h2 id="pokemon-name">${capitalizeFirstChar(data.name)}</h2>
             <p>Widht:${data.weight}</p>
          `


        })

}

document.getElementById('search-button').addEventListener('click', searchPokemon);


const renderPokemon  = (i) =>{

    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then().then((response)=>response.json())
        .then((pokemondata)=> {
         const pokemon = pokemondata.results[i];

         fetch(`https://pokeapi.co/api/v2/pokemon/${ pokemon.name}`).then().then((response)=>response.json())
             .then((data)=> {
                 document.querySelector('#pokemon-box').innerHTML=`
          <div>
             <img id="pokemon-img" src='${data.sprites.other['official-artwork'].front_default}' alt="${data.name}">
          </div>
          <div id="pokemon-info">
             <h2 id="pokemon-name">${capitalizeFirstChar(data.name)}</h2>
             <p>Widht:${data.weight}</p>
          </div>
          `
             })



        })

}
const renderNextPokemon = ()=>{
    pokemonNow ++
    renderPokemon(pokemonNow)
}
const renderPastPokemon = ()=>{
    if(pokemonNow <= 0){
        return
    }
    pokemonNow --
    renderPokemon(pokemonNow)
}

const nextPokemon = document.getElementById('next-pokemon')
const pastPokemon = document.getElementById('ex-pokemon')
nextPokemon.addEventListener('click', renderNextPokemon)
pastPokemon.addEventListener('click',renderPastPokemon)
renderPokemon(pokemonNow)


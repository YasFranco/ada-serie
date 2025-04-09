const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelector(elem);

const $inputSearch = $("#input-search");
const $selectType = $("#search-type");
const $selectOrder = $("#select-order");
const $buttonSearch = $("#button-search");
const $divContainerResults = $("#container-results");
const $buttonFirstPag = $("#button-first-pag");
const $buttonPreviousPag = $("#button-previous-pag");
const $buttonNextPag =  $("#button-next-pag");
const $buttonLastPag = $("#button-last-pag");
const $divEpisodeDetail = $("#episode-detail");
const $divCharacterDetail = $("#characters-detail");

// const showData = (array,type) => {
//     $divContainerResults.innerHTML = "";

//     for (const item of array) {
//         $divContainerResults.innerHTML += `<img class="mx-4 h-5 w-5" src="https://rickandmortyapi.com/api/${type}"/>` 
//     }
// }

const showData = (arrayPersonajes) =>{
    $divContainerResults.innerHTML = "";

    for (const personaje of arrayPersonajes) {
        $divContainerResults.innerHTML += `<div class="flex flex-col items-center m-6 bg-white rounded-2x1 shadow-md overflow-hidden w-72 hover:scale-105 transition-transform">
        <img class="w-full h-60 object-cover" src="${personaje.image}" alt="${personaje.name}" />
        <div class="p-4 space-y-2">
        <h3 class="text-xl font-bold text-slate-800">${personaje.name}</h3>
        </div>
        </div>` 
    }
}

let dataCharacters = [];

const getData = async () => {
    try {
        const { data } = await axios.get("https://rickandmortyapi.com/api/character")
        dataCharacters = data.results
        console.log("funcion get data",dataCharacters)

        showData(dataCharacters);

    } catch (error) {
        console.log(error)
    }
}

window.onload = async () => {
    await getData()
}
// https://rickandmortyapi.com/api/episode
// https://rickandmortyapi.com/api/character
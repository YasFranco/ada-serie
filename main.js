const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelector(elem);

const $inputSearch = $("#input-search");
const $selectType = $("#search-type");
const $selectOrder = $("#select-order");
const $buttonSearch = $("#button-search");
const $divContainerResults = $("#container-results");
const $buttonFirstPag = $("#button-first-pag");
const $buttonPreviousPag = $("#button-previous-pag");
const $buttonNextPag = $("#button-next-pag");
const $buttonLastPag = $("#button-last-pag");
const $divEpisodeDetail = $("#episode-detail");
const $divCharacterDetail = $("#characters-detail");

// const showData = (array,type) => {
//     $divContainerResults.innerHTML = "";

//     for (const item of array) {
//         $divContainerResults.innerHTML += `<img class="mx-4 h-5 w-5" src="https://rickandmortyapi.com/api/${type}"/>` 
//     }
// }

const showData = (arrayPersonajes) => {
    $divContainerResults.innerHTML = "";

    for (const item of arrayPersonajes) {

        if (item.image) {
            $divContainerResults.innerHTML += `<div class="flex flex-col items-center m-6 bg-white rounded-2x1 shadow-md overflow-hidden w-72 hover:scale-105 transition-transform">
        <img class="w-full h-60 object-cover" src="${item.image}" alt="${item.name}" />
        <div class="p-4 space-y-2">
        <h3 class="text-xl font-bold text-slate-800">${item.name}</h3>
        </div>
        </div>`
        } else {
            $divContainerResults.innerHTML += `
            <div class="flex flex-col  m-6 bg-white rounded-2x1 shadow-md overflow-hidden w-72 hover:scale-105 transition-transform">
             <div class="p-6 space-y-2 text-center">
                <img src="./img/rick-and-morty-episodes.jpg"/>
                <h3 class="text-xl font-bold text-slate-800">${item.name}</h3>
                <p class="text-sm text-gray-600">Episodio:${item.episode}</p>
             </div>
            </div>
            `
        }

    }
}

let dataAPI = [];

const getData = async () => {
    const selectedType = $selectType.value;

    try {
        if (selectedType === "characters") {
            const { data } = await axios.get("https://rickandmortyapi.com/api/character")
            dataAPI = data.results
            showData(dataAPI);
        } else if(selectedType === "episode"){
            const { data } = await axios.get("https://rickandmortyapi.com/api/episode");
            dataAPI = data.results;
            showData(dataAPI)
        }

    } catch (error) {
        console.log(error)
    }
}

$buttonSearch.addEventListener("click", getData);

window.onload = async () => {
    await getData()
}
// https://rickandmortyapi.com/api/episode
// https://rickandmortyapi.com/api/character
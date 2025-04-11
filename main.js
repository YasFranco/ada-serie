const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelector(elem);

const $inputSearch = $("#input-search");
const $selectType = $("#search-type");
const $selectFilter = $("#select-filter");
const $buttonSearch = $("#button-search");
const $divContainerResults = $("#container-results");
const $buttonFirstPag = $("#button-first-pag");
const $buttonPreviousPag = $("#button-previous-pag");
const $buttonNextPag = $("#button-next-pag");
const $buttonLastPag = $("#button-last-pag");
const $divEpisodeDetail = $("#episode-detail");
const $divCharacterDetail = $("#characters-detail");
const $divContainerFilter = $("#container-filter");
const $statusFilter = $("#status-filter");
const $genderFilter = $("#gender-filter");


let dataAPI = [];
let page = 1;
let pageMax = 0;


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

const getData = async () => {
    const selectedType = $selectType.value;
    const inputSearchValue = $inputSearch.value.trim().toLowerCase();

    try {
        if (selectedType === "character") {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}&name=${inputSearchValue}`)
            dataAPI = data.results
            pageMax = data.info.pages;
            $divContainerFilter.classList.remove("hidden"),
            showData(dataAPI);
            filtersUrl();
            paginationButtons();
        } else if (selectedType === "episode") {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}&name=${inputSearchValue}`);
            dataAPI = data.results;
            pageMax = data.info.pages;
            $divContainerFilter.classList.add("hidden"),
            showData(dataAPI)
            filtersUrl();
            paginationButtons();
        }

    } catch (error) {
        console.log(error)
        $divContainerResults.innerHTML = `<p class="text-red-500 text-center mt-4">No se encontraron resultados para "${inputSearchValue}"</p>`
    }
}

const paginationButtons = () => {
    if (page <= 1) {
        $buttonPreviousPag.classList.add("hidden");
        $buttonFirstPag.classList.add("hidden");
    } else {
        $buttonPreviousPag.classList.remove("hidden");
        $buttonFirstPag.classList.remove("hidden");
    }

    if (page >= pageMax) {
        $buttonNextPag.classList.add("hidden");
        $buttonLastPag.classList.add("hidden");
    } else {
        $buttonNextPag.classList.remove("hidden");
        $buttonLastPag.classList.remove("hidden");
    }
};

const filtersUrl = async () => {
    const status = $statusFilter.value;
    const gender = $genderFilter.value;
    const inputSearchValue = $inputSearch.value.trim().toLowerCase();

    if(status){
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}&name=${inputSearchValue}&status=${status}&gender=${gender}`)
        dataAPI = data.results
    }
    if(gender){
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}&name=${inputSearchValue}&status=${status}&gender=${gender}`)
        dataAPI = data.results
    }
}


$buttonSearch.addEventListener("click",() => {
    page = 1;
    getData();
});

$buttonFirstPag.addEventListener("click", async () => {
    $divContainerResults.innerHTML = "";
    if(page > 1){
        page = 1;
        const selectedType = $selectType.value;
        const { data } = await axios.get(`https://rickandmortyapi.com/api/${selectedType}/?page=${page}`)
        dataAPI = data.results
        showData(dataAPI);
        paginationButtons();
    }
})

$buttonPreviousPag.addEventListener("click", async () => {
    $divContainerResults.innerHTML = "";
    if (page > 1) {
        page -= 1;
        const selectedType = $selectType.value;
        const { data } = await axios.get(`https://rickandmortyapi.com/api/${selectedType}/?page=${page}`)
        dataAPI = data.results
        showData(dataAPI);
        paginationButtons();
    }
})

$buttonNextPag.addEventListener("click", async () => {
    $divContainerResults.innerHTML = "";
    if (page < pageMax) {
        page += 1;
        const selectedType = $selectType.value;
        const { data } = await axios.get(`https://rickandmortyapi.com/api/${selectedType}/?page=${page}`)
        dataAPI = data.results
        showData(dataAPI);
        paginationButtons();
    }


})

$buttonLastPag.addEventListener("click", async() => {
    $divContainerResults.innerHTML = "";
    if(page < pageMax){
        page = pageMax;
        const selectedType = $selectType.value;
        const { data } = await axios.get(`https://rickandmortyapi.com/api/${selectedType}/?page=${page}`)
        dataAPI = data.results
        showData(dataAPI);
        paginationButtons();
    }
})

window.onload = async () => {
    await getData()
}
// https://rickandmortyapi.com/api/episode
// https://rickandmortyapi.com/api/character
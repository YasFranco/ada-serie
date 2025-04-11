const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

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
let detailItem = [];

const showData = (arrayPersonajes) => {
    $divContainerResults.innerHTML = "";

    for (const item of arrayPersonajes) {

        if (item.image) {
            $divContainerResults.innerHTML += `<div class="detail flex flex-col items-center m-6 bg-white rounded-2x1 shadow-md overflow-hidden w-72 hover:scale-105 transition-transform">
        <img id="${item.id}" class="img w-full h-60 object-cover" src="${item.image}" alt="${item.name}" />
        <div class="p-4 space-y-2">
        <h3 class="text-xl font-bold text-slate-800">${item.name}</h3>
        </div>
        </div>`
        } else {
            $divContainerResults.innerHTML += `
            <div class="flex flex-col  m-6 bg-white rounded-2x1 shadow-md overflow-hidden w-72 hover:scale-105 transition-transform">
             <div class="detail p-6 space-y-2 text-center">
                <img id="${item.id}" src="./img/rick-and-morty-episodes.jpg"/>
                <h3 class="text-xl font-bold text-slate-800">${item.name}</h3>
                <p class="text-sm text-gray-600">Episodio:${item.episode}</p>
             </div>
            </div>
            `
        }
    }

    const itemsAPI = $$(".detail");

    itemsAPI.forEach(elem => {
        elem.addEventListener("click", async () => {
            await detailItems(elem.id);
            const selectedType = $selectType.value
            $divContainerResults.innerHTML = "";
            // $buttonFirstPag.classList.add("hidden")
            // $buttonLastPag.classList.add("hidden")
            // $buttonNextPag.classList.add("hidden")
            // $buttonPreviousPag.classList.add("hidden")

            if (selectedType === "character") {
                
                $divContainerResults.innerHTML = `<div class="flex flex-col items-center m-6 bg-white rounded-2xl shadow-lg overflow-hidden w-80">
                <img class="w-full h-64 object-cover" src="${detailItem.image}" alt="${detailItem.name}" />
                <div class="p-4 space-y-2 text-center">
                    <h2 class="text-2xl font-bold text-emerald-600">${detailItem.name}</h2>
                    <p class="text-gray-700">Estado: <span class="font-semibold">${detailItem.status}</span></p>
                    <p class="text-gray-700">Especie: <span class="font-semibold">${detailItem.species}</span></p>
                    <p class="text-gray-700">Género: <span class="font-semibold">${detailItem.gender}</span></p>
                </div>
                </div>`
            } else if (selectedType === "episode") {
                
                $divContainerResults.innerHTML = `
                <div class="flex flex-col items-center m-6 bg-white rounded-2xl shadow-lg overflow-hidden w-80">
                <img class="w-full h-64 object-cover" src="./img/rick-and-morty-episodes.jpg" alt="${detailItem.name}" />
                <div class="p-4 space-y-2 text-center">
                    <h2 class="text-2xl font-bold text-emerald-600">${detailItem.name}</h2>
                    <p class="text-gray-700">Fecha de emisión: <span class="font-semibold">${detailItem.air_date}</span></p>
                    <p class="text-gray-700">Episodio: <span class="font-semibold">${detailItem.episode}</span></p>
                    <p class="text-gray-700">Creado el: <span class="font-semibold">${new Date(detailItem.created).toLocaleDateString()}</span></p>
                </div>
                </div>`;
            }
        })
    })
}

const getData = async () => {
    const selectedType = $selectType.value;
    const urlAPI = filtersUrl();

    try {
        if (selectedType === "character") {
            const { data } = await axios.get(urlAPI)
            dataAPI = data.results
            pageMax = data.info.pages;
            $divContainerFilter.classList.remove("hidden"),
                showData(dataAPI);
            paginationButtons();
        } else if (selectedType === "episode") {
            const { data } = await axios.get(urlAPI);
            dataAPI = data.results;
            pageMax = data.info.pages;
            $divContainerFilter.classList.add("hidden"),
                showData(dataAPI)
            filtersUrl();
            paginationButtons();
        }

    } catch (error) {
        console.log(error)
        
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

const filtersUrl = () => {
    const selectedType = $selectType.value;
    const status = $statusFilter?.value;
    const gender = $genderFilter?.value;
    const inputSearchValue = $inputSearch.value.trim().toLowerCase();

    let urlAPI = `https://rickandmortyapi.com/api/${selectedType}?page=${page}`

    if (inputSearchValue) {
        urlAPI += `&name=${inputSearchValue}`
    }

    if (status && status !== "all") {
        urlAPI += `&status=${status}`
    }

    if (gender && gender !== "all") {
        urlAPI += `&gender=${gender}`
    }

    return urlAPI
}

const detailItems = async (id) => {
    try {
        const selectedType = $selectType.value;

        const { data } = await axios.get(`https://rickandmortyapi.com/api/${selectedType}/${id}`);
        detailItem = data
    } catch (error) {
        console.log(error)
    }
}

$buttonSearch.addEventListener("click", () => {
    page = 1;
    getData();
});

$buttonFirstPag.addEventListener("click", async () => {
    $divContainerResults.innerHTML = "";
    if (page > 1) {
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

$buttonLastPag.addEventListener("click", async () => {
    $divContainerResults.innerHTML = "";
    if (page < pageMax) {
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
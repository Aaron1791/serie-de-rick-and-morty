const api = "https://rickandmortyapi.com/api"

let characters = `${api}/character`

const container = document.querySelector("#container")

const inputBuscar = document.querySelector("#inputBuscar")

const Buscar = document.querySelector("#Buscar")

const atras = document.querySelector("#atras")
const siguiente = document.querySelector("#siguiente")

const filters = document.querySelectorAll(".btn-check")
let items;

const dibujarCards = (results) => {
    let cardAcumuladas = "";

    for (i = 0; i < results.length; i++) {

        let card = `
    <div class="col-4 mb-5 mt-5 d-flex justify-content-center">
        <div class="card" style="width: 25rem;">
            <img src="${results[i].image}" class="card-img-top" alt="...">
           <div class="card-body text-info bg-dark">
            <h5 class="card-title">${results[i].name}</h5>
            <p class="card-text">${results[i].gender}</p>
            <p class="card-text">${results[i].species}</p>
            <p class="card-text">${results[i].status}</p>
            </div>
        </div>
        </div>`
          

        cardAcumuladas += card;
    }
    container.innerHTML = cardAcumuladas
}

const buscarAction = () => {
    characters = `${api}/character/?name=${inputBuscar.value}`
    cargarDatos();
}

Buscar.addEventListener("click", buscarAction)

siguiente.addEventListener("click", () => {
    if (items.info.next) {
        siguiente.disabled = true;
        characters = items.info.next;
       cargarDatos();
    }

})

atras.addEventListener("click", () => {
    if (items.info.prev) {
        characters = items.info.prev
        cargarDatos();
    }

})

const addFilterCharacter = (value, origin) => {
    let queryString = "";
    switch(origin){
        case "status":
            queryString = `status=${value}`
        break;
        case "species":
            queryString = `species=${value}`
        break
        case "gender":
            queryString = `gender=${value}`
        break                
    }
    if(characters.includes('?')){
        characters = characters.concat(`&${queryString}`)
    }else{
        characters = characters.concat(`?${queryString}`)
    }
    cargarDatos();

}

filters.forEach(item => item.addEventListener('click', (event) =>{
    addFilterCharacter(event.target.labels[0].textContent, event.target.name);
}))

const cargarDatos = () => {
    window.fetch(characters)
        .then((response) => response.json())
        .then((responsejson) => {
            dibujarCards(responsejson.results)
            items = responsejson;
            siguiente.disabled = false
            //console.log(responsejson)
        })
        .catch(error => {
            container.innerHTML = "No se encontro nada en el FILTRO "
        })

}

cargarDatos();
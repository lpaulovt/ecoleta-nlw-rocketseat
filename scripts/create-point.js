const ufSelect = document.querySelector("[name=uf]")
const citySelect = document.querySelector("[name=city]")
const stateInput = document.querySelector("[name=state]")

function populateUfs(){
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        for (state of states){
            ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome}</option>`
        }
    } )
    
}

populateUfs()

function getCities(event){
    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for (city of cities){
            citySelect.innerHTML += `<option value="${city.id}"> ${city.nome}</option>`
        }
        citySelect.disabled = false
    })


    
}

ufSelect.addEventListener("change", getCities)
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

    citySelect.innerHTML="<option value> Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for (city of cities){
            citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome}</option>`
        }
        citySelect.disabled = false
    })


    
}

ufSelect.addEventListener("change", getCities)


//Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

//Input hidden para enviar os id's do array selectedItems junto com os dados do formulário
const collectedItems = document.querySelector("[name=items]")

//Para cada item clicado do grid executar a função handleSelectedItem
for (item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

//Array com os id's
let selectedItems = []

function handleSelectedItem(event){
    //Pega o item clicado
    const item = event.target

    //Adicionar a classe .selected nele
    item.classList.toggle("selected")

    //Vai pegar o id do item clicado
    const itemId = item.dataset.id

    //verificar se os itens que foram selecionados existem, se sim pegar ele
    const alreadySelected = selectedItems.findIndex( item => item == itemId)

    //se tive selecionado 
    if (alreadySelected>=0){

    //se ele tiver vai tirar a seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        }) 

        selectedItems = filteredItems
        
    } else {
        //se não tiver vai adicionar
        selectedItems.push(itemId)
    }

    //atualizar o input com o valor do array com os id's dos itens selecionados
    collectedItems.value = selectedItems
}

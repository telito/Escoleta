function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")



    const ufValue = event.target.value

    const index = event.target.selectedIndex
    console.log(index)
    stateInput.value = event.target.options[index].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value="">Selecione a cidade </option>'
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome}</option>`
            }
        })

    citySelect.disabled = false
}

document.querySelector("select[name=uf]").addEventListener(
    'change', getCities)

//Itens de coleta
//pegando todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems =document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    //add or remove
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id


    //verify selected items, if have
    //pick selected item

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })
    


    //if is select, remove item selected

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false

            return itemIsDifferent
        })

        selectedItems = filteredItems
    }

    //if not selected, add selection

    else{
        selectedItems.push(itemId)
    }

    console.log(selectedItems)
    //update hidden input if selected itens
    collectedItems.value = selectedItems
}
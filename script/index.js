const buttonSearch = document.querySelector('#page-home main a')
const fechar = document.querySelector('#modal .header a')
const modal = document.querySelector('#modal')

buttonSearch.addEventListener('click', () => {
    modal.classList.toggle('hide')
})

fechar.addEventListener('click', () => {
    modal.classList.toggle('hide')
})
console.log('clint side loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msgOne')
const msgTwo = document.querySelector('#msgTwo')
const resetButton = document.querySelector('#reset')


resetButton.addEventListener('click', () => {
    search.value = ''
    msgOne.textContent = ''
    msgTwo.textContent = ''
})
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgOne.textContent = 'Loading...'
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msgOne.textContent = data.error
        } else {
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast.summary
        }
    })
})
})
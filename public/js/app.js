

const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.err) return messageOne.textContent = data.err

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        })
    }).catch((err) => {
        console.log(err)
    })
})


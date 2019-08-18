

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

            messageOne.textContent = 'I am in ' + data.location + '.'
            messageTwo.textContent = 'Currently, temperature is ' + data.temperature + ', but min temperature is ' + data.temperatureMin + ' and max temperature is ' + data.temperatureMax + '.'

        })
    }).catch((err) => {
        console.log(err)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const fetchURL = '/weather?address=' + encodeURIComponent(location)

    messageOne.textContent = 'Retrieving your weather...'
    messageTwo.textContent = ''

    fetch(fetchURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = data.weatherDescription + '. It is currently ' + data.temperature + ' degrees. However, it feels like ' + data.feelsLike + ' degrees. The humidity is ' + data.humidity + '%.'
            }
            
        })
    })
})
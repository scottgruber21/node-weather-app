const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', function(e){
    e.preventDefault()
    message2.textContent = 'Loading'

    const location = search.value

    fetch(`/weather?address=${location}`)
        .then(res => res.json())
        .then(data => {
            if(data.error){
                message1.textContent = data.error
                message2.textContent = ''
            }
            else{
                message2.textContent = ''
                message1.textContent = `The temperature is ${data.temperature} in ${data.location}. It feels like ${data.feelslike} degrees. The weather conditions are ${data.conditions}`
            }
        })

})
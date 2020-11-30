console.log('client sode javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location+'').then((response) => {
    response.json().then((data) => {
        if(data.error){
            document.querySelector('#weather-report').textContent = data.error
        }else{
            document.querySelector('#weather-report').textContent = data.forecast
            document.querySelector('#weather-report1').textContent = data.address

        }
    })
})
})

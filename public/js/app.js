const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //prevent default behaviour of refreshing the browser
 
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
   
    var location = search.value

    if(!location) {
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser')
        }
        navigator.geolocation.getCurrentPosition((position) => {
           const LatitudeLongitudeString = position.coords.latitude + ',' + position.coords.longitude
        
            fetch('/weather?address=' + LatitudeLongitudeString).then((response) => {
                response.json().then((data) => {
                    if(data.error) {
                         messageOne.textContent = data.error;
                    } else {
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.forecast;
                    }
                })
            })
        })
    } else {
        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                     messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        })
    }
})

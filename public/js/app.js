// console.log('This is client side javascript file')
// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'


weatherform.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent ='Loading..'
    messageTwo.textContent= ''
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
        })
    })
})
console.log("client side javasript file is loaded")
// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.forecast)
//             console.log(data.location)

//         }
//     })
// })
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading...'
    messagetwo.textContent=''
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.location
            messagetwo.textContent=data.forecast

        }
    })
})
})
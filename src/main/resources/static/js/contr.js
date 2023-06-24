const textarea = document.querySelector('.main textarea')
const input = document.querySelector('.main input')
const submit = document.querySelector('button')

submit.addEventListener('click',function () {
    axios.get('/print?s='+input.value).then(function (res) {
        textarea.innerHTML += res.data.data
        textarea.innerHTML += '\n'
        textarea.innerHTML += '\n'
        textarea.innerHTML += '\n'
        console.log(res.data.data)
    })
})
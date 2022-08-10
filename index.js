const user_name = document.querySelector('#name')
const email = document.querySelector('#Email')
const city = document.querySelector('#city')
const postcode = document.querySelector('#postcode')
const how = document.querySelector('#how')
const hire = document.querySelector('#hire')
const question = document.querySelector('#question')
const comment = document.querySelector('#comment')
const message = document.querySelector('#textArea')
const form = document.querySelector('.form')
const hourRate = document.querySelector('.h-rate')

let reason = ''
// post REGEX
const POST_REGEX = /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/


hire.addEventListener('click', () => {
    reason = 'hire'
    hourRate.classList.replace('hidden', 'flex')
})

question.addEventListener('click', () => {
    reason = 'question'
    hourRate.classList.replace('flex', 'hidden')

})
comment.addEventListener('click', () => {
    reason = 'comment'
    hourRate.classList.replace('flex', 'hidden')
})

function submitForm() {
    let passedPost = POST_REGEX.test(postcode.value)
    if (!email.value && !user_name.value && !city.value && !passedPost && !reason && !how.value && !message.value) return
    if (reason === 'hire' && !hourRate.value) return
    fetch('https://httpbin.org/post',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user_name.value,
                postcode: postcode.value,
                email: email.value,
                city: city.value,
                reason: reason,
                how: how.value,
                message: message.value,
                hourRate: hourRate.value ? hourRate.value : undefined
            })
        }).then(response => {
            if (response.status == 200) {
                user_name.value = ''
                postcode.value = ''
                email.value = ""
                city.value = ""
                reason = ""
                how.value = ''
                hourRate.value = ''
                message.value = ''
                hire.checked = false
                question.checked = false
                comment.checked = false
            }
        })

}
form.onsubmit = function (e) {
    e.preventDefault()
    submitForm()
}

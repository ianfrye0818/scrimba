const numberInput = document.getElementById("number-input")
const rangeInput = document.getElementById("range-input")
const copyButton = document.getElementById("copy-button")
const passwordResult = document.getElementById("password-result")

numberInput.value = 12
rangeInput.value = 12

const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz".split('')
const upperCaseLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
const symbols = "!@#$%^&*()_+-=[]{}|;:'\"<>,.?/".split("");
const numbers = "0123456789".split('')

function buildPassword() {
    const passArray = []
    const passwordLength = document.getElementById("number-input").value
    const selectedArray = [
        [document.getElementById("upper-case-box").checked ? upperCaseLetter : []],
        [document.getElementById("lower-case-box").checked ? lowerCaseLetters : []],
        [document.getElementById("symbols-box").checked ? symbols : []],
        [document.getElementById("number-box").checked ? numbers : []]
    ].flat().flat()

    for (let i = 0; i < passwordLength; i ++) {
        passArray.push(selectedArray[Math.floor(Math.random() * selectedArray.length)])
    }
    
    passwordResult.value = passArray.join('')
    console.log(passwordResult.value.length)
    console.log(rangeInput.value)
    console.log(numberInput.value)
}

numberInput.addEventListener("input", function() {
    rangeInput.value = this.value
})
rangeInput.addEventListener("input", function() {
    numberInput.value = this.value
})

function copyToClipboard() {
    passwordResult.select()
    document.execCommand("copy")
}

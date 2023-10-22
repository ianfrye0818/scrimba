const usrInput = document.getElementById("user-input");
const convertBtn = document.getElementById("convert-button")
const lengthResult = document.getElementById("length")
const volumeResult = document.getElementById('volume')
const massResult = document.getElementById('mass')

convertBtn.addEventListener('click', () => {
  if (usrInput.value) {
    lengthResult.innerHTML = convertLength(usrInput.value)
    volumeResult.innerHTML = convertVolume(usrInput.value)
    massResult.innerHTML = convertMass(usrInput.value)
  }
  else {
    lengthResult.innerHTML = ''
    volumeResult.innerHTML = ''
    massResult.innerHTML = ''
  }
})








function convertLength(userInput) {
  const feet = Math.round((userInput * 3.281) * 100) / 100
  const meter = Math.round((userInput / 3.281) * 100) / 100
  return `${userInput} meters = ${feet} feet | ${userInput} feet = ${meter} meters`
}

function convertVolume(userInput) {
  const gallons = Math.round((userInput / 3.785) * 100) / 100
  const liters = Math.round((userInput * 3.785) * 100) / 100
  return `${userInput} liters = ${gallons} gallons | ${userInput} gallons = ${liters} liters`
}

function convertMass(userInput) {
  const pounds = Math.round((userInput * 2.205) * 100) / 100
  const kilo = Math.round((userInput / 2.205) * 100) / 100
  return `${userInput} kilos = ${pounds} pounds | ${userInput} pounds = ${kilo} kilos`
}
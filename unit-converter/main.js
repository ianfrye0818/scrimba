const userInput = document.getElementById('user-input')
const tabHeaders = document.querySelectorAll('.selection-tabs li')
const tabContents = document.querySelectorAll('.tab-content')

selectTab('tab1')

tabHeaders.forEach(tabHeader => {
  tabHeader.addEventListener('click', () => {
    const tabId = tabHeader.getAttribute('data-tab')
    selectTab(tabId)
    const selectedTab = document.getElementById(tabId)
    const tabContentData = {
      tab1: convertMeterFeet(userInput.value),
      tab2: convertLiterGallon(userInput.value),
      tab3: convertKiloLbs(userInput.value)
    }
    
    const activeTabContent = tabContentData[tabId]
    selectedTab.innerHTML = activeTabContent
  })
})

function selectTab(tabId) {
  tabContents.forEach(content => {
    content.classList.remove('active')
  })

  const selectedTab = document.getElementById(tabId)
    selectedTab.classList.add('active')

  tabHeaders.forEach(header => {
    header.style.backgroundColor = '#49494967'
  })
  
  const selectedTabHeader = document.querySelector(`[data-tab="${tabId}"]`)
  selectedTabHeader.style.backgroundColor = '#3498db'
  
  const convertBtn = document.getElementById('convert-button')
  convertBtn.addEventListener('click', () => {
    const tabContentData = {
      tab1: convertMeterFeet(userInput.value),
      tab2: convertLiterGallon(userInput.value),
      tab3: convertKiloLbs(userInput.value)
    }
    
    const activeTabContent = tabContentData[tabId]
    selectedTab.innerHTML = activeTabContent
  })

}

function convertMeterFeet(measurement) {
  const meters = Math.round((measurement / 3.281) * 100) / 100
  const feet = Math.round((measurement * 3.281) * 100) / 100
  return `${measurement} meters = ${feet} feet | ${measurement} feet = ${meters} meters`
}

function convertLiterGallon(measurement) {
  const liters = Math.round((measurement / 3.785) * 100) / 100
  const gallons = Math.round((measurement * 3.785) * 100) / 100
  return `${measurement} gallons = ${liters} liters | ${measurement} liters = ${gallons} gallons`
}

function convertKiloLbs(measurement) {
  const pounds = Math.round((measurement / 2.204) * 100) / 100
  const kilos = Math.round((measurement * 2.204) * 100) / 100
  return `${measurement}kilos = ${pounds} lbs | ${measurement} lbs = ${kilos} kilos`
}
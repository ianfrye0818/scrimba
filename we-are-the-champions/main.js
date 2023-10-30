import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: ""
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsements")

// get user message input
// set up onclick to:
    // push user input to the database --
    // retrieve user input from the database --
    //populate the 'endorsement section' with a div with the message --
        //add to and from to the div
        //add a like 'heart' button for the user to click
        //check if the user has clicked
            //if so prevent them from clicking
//<div class="endorsement-box">

const publishButton = document.getElementById('publish-button')
const userMessageInput = document.getElementById('user-message-input')
const endorsementContainer = document.getElementById('endorsement-container')
const userInputFrom = document.getElementById('user-input-from')
const userInputTo = document.getElementById('user-input-to')

publishButton.addEventListener('click', () => {
    
    if (userMessageInput.value && userInputFrom.value && userInputTo.value) {
        endorsementContainer.innerHTML = ""
        const userInputObject = new DatabaseObject(userMessageInput.value, userInputTo.value, userInputFrom.value)
        push(endorsementListInDB, userInputObject)
        clearUserInput()
    }
   
})

onValue(endorsementListInDB, (snapshot) => {
    if(snapshot.exists()) {
        let endorsmentArray = Object.values(snapshot.val())
        console.log(endorsmentArray)
        endorsmentArray = endorsmentArray.reverse()
        endorsmentArray.forEach(item => {
            appendItemToEndorsmentDiv(item)
        })
    }
})

function clearUserInput() {
    userMessageInput.value = ""
    userInputFrom.value = ""
    userInputTo.value = ""
}

function appendItemToEndorsmentDiv(item) {


    endorsementContainer.innerHTML += `
    <div class="endorsement-box">
        <p class="output-to">To: ${item.to}</p>
        <p class="output-message">${item.message}</p>
        <p class="output-from">From: ${item.from}</p>
    </div>`
    // let newEl = document.createElement("div")
    // newEl.classList.add("endorsement-box")
    // newEl.textContent = `${item.to}${item.message}${item.from}`
    // endorsementContainer.append(newEl)
}

class DatabaseObject {
    constructor(message, to, from) {
        this.message = message
        this.to = to
        this.from = from
    }
}

const homeScoreLabel = document.getElementById("home-team-score")
const guestScoreLabel = document.getElementById("guest-team-score")

let homeTeamScore = 0
let guestTeamScore = 0

function addOne(team) {
    if (team === "home") {
        homeTeamScore += 1
    }
    else if (team === "guest") {
        guestTeamScore += 1
    }

    homeScoreLabel.innerHTML = homeTeamScore
    guestScoreLabel.innerHTML = guestTeamScore
}

function addTwo(team) {
    if (team === "home") {
        homeTeamScore += 2
    }
    else if (team === "guest") {
        guestTeamScore += 2
    }

    homeScoreLabel.innerHTML = homeTeamScore
    guestScoreLabel.innerHTML = guestTeamScore
}

function addThree(team) {
    if (team === "home") {
        homeTeamScore += 3
    }
    else if (team === "guest") {
        guestTeamScore += 3
    }

    homeScoreLabel.innerHTML = homeTeamScore
    guestScoreLabel.innerHTML = guestTeamScore
}

function resetAll() {
    homeTeamScore = 0
    guestTeamScore = 0
    homeScoreLabel.innerHTML = "0"
    guestScoreLabel.innerHTML = "0"
}
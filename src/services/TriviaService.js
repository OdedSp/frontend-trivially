
function pushRoundReport(state) {
    state.roundReports.push({
        quest: state.quest,
        answerId: state.answerId,
        answerTime: state.answerTime,
        userPts: state.userPts,
        rivalAnswerId: state.rivalAnswerId,
        rivalAnswerTime: state.rivalAnswerTime,
        rivalPts: state.rivalPts,
        correctAnswerId: state.correctAnswerId,
        percentage: _calculatePercentage(state)
    })
}

function _calculatePercentage(state) {
    let nom = state.quest.answeredCorrectlyCount
    let denom = state.quest.answeredCorrectlyCount+state.quest.answeredIncorrectlyCount+2
    if (state.userPts && state.rivalPts) {
        nom += 2
    } else if (!state.userPts && state.rivalPts || state.userPts && !state.rivalPts) {
        nom++
    } 
    return Math.round(nom/denom*100)
}

function resetRound(state, quest=null) {
    state.quest = quest
    state.roundStartTime = null
    state.answerId = null
    state.answerTime = null
    state.userPts = 0
    state.rivalAnswerId = null
    state.rivalAnswerTime = null
    state.rivalPts = 0
    state.correctAnswerId = null
}

function shuffleAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
}

export default {
    pushRoundReport,
    resetRound,
    shuffleAnswers
}
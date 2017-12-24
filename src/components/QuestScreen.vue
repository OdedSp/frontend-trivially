<template>
  <div>
      <h2>{{quests[i].question}}</h2>
      <button>{{quests[i].incorrect_answers[1]}}</button>
      <button>{{quests[i].incorrect_answers[2]}}</button>
      <button>{{quests[i].incorrect_answers[0]}}</button>
      <button>{{quests[i].correct_answer}}</button>
  </div>
</template>

<script>
export default {
    name: 'QuestScreen',
    data() {
        return {
            quests: [{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"The most graphically violent game to precede the creation of the ESRB (Entertainment Software Rating Board) was...","correct_answer":"Mortal Kombat","incorrect_answers":["Duke Nukem","Resident Evil","Doom"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"hard","question":"Which of these songs was released in 1996?","correct_answer":"The Smashing Pumpkins - '1979'","incorrect_answers":["Prince - '1999'","James Blunt - '1973'","David Bowie - '1984'"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"Which of the following former Yugoslavian states is landlocked?","correct_answer":"Serbia","incorrect_answers":["Bosnia and Herzegovina","Montenegro","Croatia"]},{"category":"Science: Computers","type":"multiple","difficulty":"hard","question":"The internet domain .fm is the country-code top-level domain for which Pacific Ocean island nation?","correct_answer":"Micronesia","incorrect_answers":["Fiji","Tuvalu","Marshall Islands"]},{"category":"Entertainment: Board Games","type":"multiple","difficulty":"medium","question":"Who is the main character in the VHS tape included in the board game Nightmare?","correct_answer":"The Gatekeeper","incorrect_answers":["The Kryptkeeper","The Monster","The Nightmare"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"When was the game 'Roblox' released?","correct_answer":"2006","incorrect_answers":["2003","2002","2007"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"hard","question":"What is the name of the supercomputer located in the control room in 'Jurassic Park'?","correct_answer":"Thinking Machines CM-5","incorrect_answers":["Cray X-MP","Cray XK7","IBM Blue Gene\/Q"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"easy","question":"In 2013, virtual pop-star Hatsune Miku had a sponsorship with which pizza chain?","correct_answer":"Domino&#039;s","incorrect_answers":["Papa John&#039;s","Pizza Hut","Sabarro&#039;s"]},{"category":"Science & Nature","type":"multiple","difficulty":"hard","question":"What is the scientific name for the extinct hominin known as 'Lucy'?","correct_answer":"Australopithecus Afarensis","incorrect_answers":["Australopithecus Africanus","Australopithecus Architeuthis","Australopithecus Antaris"]},{"category":"Celebrities","type":"multiple","difficulty":"medium","question":"Who is 'James Rolfe' better known as?","correct_answer":"The Angry Video Game Nerd","incorrect_answers":["TotalBiscuit","PeanutButterGamer","PewDiePie"]}],
            i: Math.floor(Math.random()*10)
        }
    }
}
</script>

<style>

</style>

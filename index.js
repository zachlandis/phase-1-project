document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/jokes')
    .then(res => res.json())
    .then(data => {data.forEach(joke => buildJokeCards(joke))})

    function buildJokeCards(joke) {
        let card = document.createElement('div')
        card.className = 'joke_card'

        let setup = document.createElement('h3')
        setup.textContent = `${joke.setup}`

        let likeBtn = document.createElement('button')
        likeBtn.textContent = "Like"
        likeBtn.addEventListener('click', (e) => {increaseLikes(joke)})

        document.querySelector('#joke_container').append(card)
        card.append(setup, likeBtn)   
    }
})

function increaseLikes(joke) {
    console.log(joke)
}
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/jokes')
    .then(res => res.json())
    .then(data => {data.forEach(joke => buildJokeCards(joke))})

    function buildJokeCards(joke) {
        let card = document.createElement('div')



        let setup = document.createElement('h3')
        setup.textContent = `${joke.setup}`

        document.querySelector('#joke_container').append(card)
        card.append(setup)
        
    }
})



document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/jokes')
    .then(res => res.json())
    .then(data => {data.forEach(joke => buildJokeCards(joke))})

    function buildJokeCards(joke) {
        let card = document.createElement('div')
        card.className = 'joke_card'

        let setup = document.createElement('h3')
        setup.textContent = `${joke.setup}`

        let delivery = document.createElement('p')

        let deliveryBtn = document.createElement('button')
        deliveryBtn.textContent = "Punchline"
        deliveryBtn.addEventListener('click', () => delivery.append(joke.delivery))

        let likes = document.createElement('p')
        likes.textContent = `Likes: ${joke.likes}`

        let likeBtn = document.createElement('button')
        likeBtn.textContent = "Like"
        likeBtn.addEventListener('click', () => {
            let likeCounter = joke.likes
            likeCounter = joke.likes ++
            fetch(`http://localhost:3000/jokes/${joke.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "likes": joke.likes
                })
            })
            likes.textContent = `Likes: ${joke.likes}`

        })
        document.querySelector('#joke_container').append(card)
        card.append(setup, delivery, deliveryBtn, likeBtn, likes)   
    }

    let form = document.querySelector('#submit_joke')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        submitJoke(e)
        form.reset()
    })

    let formSetupInput = document.querySelector(['#joke_setup'])
    let formDeliveryInput = document.querySelector(['#joke_delivery'])
    
    let nsfwCheckbox = document.querySelector("input[name=nsfw]")
    nsfwCheckbox.addEventListener('change', () => {
        if (nsfwCheckbox.checked) {
            nsfwCheckbox.setAttribute("value", true)
        } else {
            nsfwCheckbox.setAttribute("value", false)
        }
    })

    let religiousCheckbox = document.querySelector(['#religious'])
    religiousCheckbox.addEventListener('change', () => {
        if (religiousCheckbox.checked) {
            religiousCheckbox.setAttribute("value", true)
        } else {
            religiousCheckbox.setAttribute("value", false)
        }
    })

    let politicalCheckbox = document.querySelector(['#political'])
    politicalCheckbox.addEventListener('change', () => {
        if (politicalCheckbox.checked) {
            politicalCheckbox.setAttribute("value", true)
        } else {
            politicalCheckbox.setAttribute("value", false)
        }
    })

    let racistCheckbox = document.querySelector(['#racist'])
    racistCheckbox.addEventListener('change', () => {
        if (racistCheckbox.checked) {
            racistCheckbox.setAttribute("value", true)
        } else {
            racistCheckbox.setAttribute("value", false)
        }
    })
    
    let sexistCheckbox = document.querySelector(['#sexist'])
    sexistCheckbox.addEventListener('change', () => {
        if (sexistCheckbox.checked) {
            sexistCheckbox.setAttribute("value", true)
        } else {
            sexistCheckbox.setAttribute("value", false)
        }
    })
    
    let explicitCheckbox = document.querySelector(['#explicit'])
    explicitCheckbox.addEventListener('change', () => {
        if (explicitCheckbox.checked) {
            explicitCheckbox.setAttribute("value", true)
        } else {
            explicitCheckbox.setAttribute("value", false)
        }
    })
    

    function submitJoke(joke) {
        // console.log(formSetupInput.value)
        // console.log(formDeliveryInput.value)
        fetch(`http://localhost:3000/jokes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "setup": formSetupInput.value,
                    "delivery": formDeliveryInput.value,
                    "likes": 0,
                    "flags": {
                        "nsfw": nsfwCheckbox.value,
                        "religious": religiousCheckbox.value,
                        "political": politicalCheckbox.value,
                        "racist": racistCheckbox.value,
                        "sexist": sexistCheckbox.value,
                        "explicit": explicitCheckbox.value,
                    }

                })
            })
            .then(res => res.json())
            .then(data => buildJokeCards(data))
    }
    

})





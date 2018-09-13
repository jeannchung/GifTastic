$(document).ready(function () {

    $('#submitAnimal').on('click', function () {
        event.preventDefault()
        $.get(`https://api.giphy.com/v1/gifs/search?q=${$('#newAnimal').val().trim()}&api_key=uQ8h6AzuF7iNElFZYYTmD3NQUWiVZ3lx&limit=10`)
            .then(function (r) {
                console.log(r)
            })
            .catch(function (e) { console.error(e) })
    })

    var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"]

    function renderAnimals() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=${$('#newAnimal').val().trim()}&api_key=uQ8h6AzuF7iNElFZYYTmD3NQUWiVZ3lx&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var animalDiv = $("<div class='animal'>")
            var rating = response.rating
            var displayRating = $("<p>").text("Rating: " + rating)
            animalDiv.append(displayRating)
            var gifURL = response.embed_url
            var gifDisplay = $("<img>").attr("src", gifURL)
            animalDiv.append(gifDisplay)

            $("#gifArea").append(animalDiv)
        })
    }

    function renderButtons() {
        $("#buttonArea").empty()

        for (i = 0; i < animals.length; i++) {
            var newButton = $("<button>")
            newButton.addClass("animal-btn")
            newButton.attr("data-name", animals[i])
            newButton.text(animals[i])
            $("#buttonArea").append(newButton)
        }
    }

    $("#submitAnimal").on("click", function(event) {
        event.preventDefault()

        var animal = $("#newAnimal").val().trim()
        animals.push(animal)
        renderButtons()
    })

    $(document).on("click", ".animal-btn", renderAnimals)
    renderButtons()
})
'use strict'; 

function getMuseumItemById(query) {
    const museumIDUrl= 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
    const finalMuseumUrl= museumIDUrl + '/' + query;

    console.log(finalMuseumUrl);

    fetch(finalMuseumUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayMuseumPiece(responseJson))
    .catch(err => {
        $('#error-message').text('woops could not find that ID');
    });  
}

function checkValidForm(val) {
    if(val >= 1 && val <= 820721) {
      return true;
    }
    else {
      return false;
    }
  }

function watchForm1() {
    $('#search-by-id').submit(function(event) {
        event.preventDefault();
        const userInput = $('.search-input').val();
        if (checkValidForm(userInput)) {
            getMuseumItemById(userInput);
        }
        else {
            alert('Sorry that reference number is not valid')
        }
    });
    
}

function getRandomMuseumId(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getMuseumID() {
    const museumIDUrl= 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
    console.log(museumIDUrl);
    fetch(museumIDUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => {
    const rand = getRandomMuseumId(responseJson.objectIDs);
    const finalMuseumUrl = museumIDUrl + '/' + rand;

    console.log(finalMuseumUrl);

    fetch(finalMuseumUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayMuseumPiece(responseJson))
    .catch(err => {
        $('#error-message').text('no random image to display');
    });   
})
    .catch(err => {
        $('#error-message').text('no random image to display');
    });   
}

function displayMuseumPiece(responseJson) {
    $('#met-data').empty();
    if (responseJson.artistDisplayName === "" && responseJson.city === "" && responseJson.primaryImageSmall === "") {
        $('#met-data').append(
            `<li>
            <h3 class='title'>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p>Artist: UNKNOWN</p>
            <p>City: UNKNOWN</p>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            </li>`
            );
            $('#wiki').removeClass('hidden');
            $('#wiki-data').empty();
    }
    else if (responseJson.artistDisplayName === "" && responseJson.city === "") {
        $('#met-data').append(
            `<li>
            <h3 class='title'>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p>Artist: UNKNOWN</p>
            <p>City: UNKNOWN</p>
            <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
            </li>`
            );
            $('#wiki').removeClass('hidden');
            $('#wiki-data').empty();
    }
    else if (responseJson.artistDisplayName === "" && responseJson.primaryImageSmall === "") {
        $('#met-data').append(
            `<li>
            <h3 class='title'>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p>Artist: UNKNOWN</p>
            <p>City: ${responseJson.city}</p>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            <iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=${responseJson.city}&key=AIzaSyA9Wjfj0GNoiiZ2t1ZO93msjwhAgkddj54" allowfullscreen></iframe>
            </li>`
            );
            $('#wiki').removeClass('hidden');
            $('#wiki-data').empty();
    }
    else if (responseJson.city === "" && responseJson.primaryImageSmall === "") {
        $('#met-data').append(
            `<li>
            <h3 class='title'>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p class='artist-name'><span>Artist: </span>${responseJson.artistDisplayName}</p>
            <p>City: UNKNOWN</p>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            </li>`
            );
            $('#wiki').removeClass('hidden');
            $('#wiki-data').empty();
    }
    else if (responseJson.artistDisplayName === ""){
        $('#met-data').append(
            `<li>
            <h3 class='title'>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p>Artist: UNKNOWN</p>
            <p>City: ${responseJson.city}</p>
            <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
            <iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=${responseJson.city}&key=AIzaSyA9Wjfj0GNoiiZ2t1ZO93msjwhAgkddj54" allowfullscreen></iframe>
            </li>`
            );
            $('#wiki').removeClass('hidden');
            $('#wiki-data').empty();
    }
    else if (responseJson.primaryImageSmall === "") {
        $('#met-data').append(
            `<li>
            <h3 class='title'>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p class='artist-name'><span>Artist: </span>${responseJson.artistDisplayName}</p>
            <p>City: ${responseJson.city}</p>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            <iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=${responseJson.city}&key=AIzaSyA9Wjfj0GNoiiZ2t1ZO93msjwhAgkddj54" allowfullscreen></iframe>
            </li>`
            );
            $('#wiki').removeClass('hidden');
            $('#wiki-data').empty();
    }
    else if (responseJson.city === "") {
        $('#met-data').append(
            `<li>
            <h3 class='title'>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p class='artist-name'><span>Artist: </span>${responseJson.artistDisplayName}</p>
            <p>City: UNKNOWN</p>
            <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
            </li>`
            );
            $('#wiki').removeClass('hidden');
            $('#wiki-data').empty();
    }
    else {
        $('#met-data').append(
            `<li>
            <h3 class='title'>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p class='artist-name'><span>Artist: </span>${responseJson.artistDisplayName}</p>
            <p>City: ${responseJson.city}</p>
            <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
            <iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=${responseJson.city}&key=AIzaSyA9Wjfj0GNoiiZ2t1ZO93msjwhAgkddj54" allowfullscreen></iframe>
            </li>`
            );
            $('#wiki').removeClass('hidden');
            $('#wiki-data').empty();
    }
}

function watchForm2() {
    $('#random-id').submit(function(event) {
        event.preventDefault();
        getMuseumID();
    });
}

function formatEndpointUrl(parameters) {
    const userQuery= Object.keys(parameters)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
    return userQuery.join('&');
}

function getWiki(query) {
    const params = {
        search: query,
    };

    const searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=3&namespace=0&format=json&origin=*'
    const formatParams = formatEndpointUrl(params);
    const finalSearchUrl = searchUrl + '&' + formatParams;

    console.log(finalSearchUrl);


    fetch(finalSearchUrl)
    .then(response => {
        if (response.ok) {
        return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayWiki(responseJson))
    .catch(err => {
        $('#error-message2').text('no search results availible');
    }); 
}

function displayWiki(responseJson) {
    $('#wiki-data').empty();

    let wikiUrl = responseJson.pop();

    console.log(wikiUrl);

    if (wikiUrl === []) {
        $('#wiki-data').append(
            `<p>Sorry no results availible</p>`
        ); 
    }
    else {
        $('#wiki-data').append(
            `<a href='${wikiUrl[0]}'>View in Wikipedia</a>`
        );
        $('#wiki-data').append(
            `<a href='${wikiUrl[1]}'>View in Wikipedia</a>`
        );
        $('#wiki-data').append(
        `<a href='${wikiUrl[2]}'>View in Wikipedia</a>`
        );
    }
}

function watchForm3() {
    $('#wiki').on('click', '#wiki-button', function(event) {
        $('#error-message2').empty();
        event.preventDefault();
        getWiki($('.artist-name').html().toLowerCase().split(' ').join('_'));
    });
}

function init() {
    watchForm1();
    watchForm2();
    watchForm3();
}

$(init);
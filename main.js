'use strict'; 

///objectID

function getMuseumItemById(query) {
    const museumIDUrl= 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
    const finalMuseumUrl= museumIDUrl + '/' + query;

    fetch(finalMuseumUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayRandomImage(responseJson))
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
    .then(responseJson => displayRandomImage(responseJson))
    .catch(err => {
        $('#error-message').text('no random image to display');
    });   
})
    .catch(err => {
        $('#error-message').text('no random image to display');
    });   
}

function displayRandomImage(responseJson) {
    $('#met-data').empty();
    if (responseJson.artistDisplayName === "") {
        $('#met-data').append(
            `<li>
            <h3>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p>Artist: UNKNOWN</p>
            <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
            </li>`
            );
            $('#wiki').removeClass('hidden');
    }
    else if (responseJson.primaryImageSmall === ""){
        $('#met-data').append(
            `<li>
            <h3>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p class='artist-name'>${responseJson.artistDisplayName}</p>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            </li>`
            );
            $('#wiki').removeClass('hidden');
    }
    //this does not work...not sure why
    else if (responseJson.primaryImageSmall === "" && responseJson.artistDisplayName === "") {
        $('#met-data').append(
            `<li>
            <h3>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p>Artist: UNKNOWN</p>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            </li>`
            );
            $('#wiki').removeClass('hidden');
    }
    else {
    $('#met-data').append(
        `<li>
        <h3>${responseJson.title}</h3>
        <p>Reference Number: ${responseJson.objectID}</p>
        <p class='artist-name'>${responseJson.artistDisplayName}</p>
        <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
        </li>`
        );
        $('#wiki').removeClass('hidden');
    }
}

function watchForm2() {
    $('#random-id').submit(function(event) {
        event.preventDefault();
        getMuseumID();
    });
}

function getWikiLink(query) {
    const searchUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary' ///queryterm
    const finalSearchUrl = searchUrl + '/' + query;

    fetch(finalSearchUrl)
    .then(response => {
        if (response.ok) {
            response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayWikiLink(responseJson))
    .catch(err => {
        $('#error-message').text('no search results availible');
    }); 
}

function displayWikiLink(responseJson) {
    $('#wiki-data').empty();
    for(let x = 0; x < responseJson.desktop.length; x++) {
        $('#wiki-data').append(
            `<p>${responseJson.desktop[x].page}</p>`
        )};
}

function watchForm3() {
    $('#wiki').on('click', '#wiki-button', function(event) {
        event.preventDefault();
        getWikiLink($('.artist-name').html()); //this is formated incorrectly 
    });
}

function init() {
    watchForm1();
    watchForm2();
    watchForm3();
}

$(init);
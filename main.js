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
        $('#error-message').text('woops something went wrong');
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
        $('#error-message').text('woops something went wrong');
    });   
})
    .catch(err => {
        $('#error-message').text('woops something went wrong');
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
    }
    else if (responseJson.primaryImageSmall === ""){
        $('#met-data').append(
            `<li>
            <h3>${responseJson.title}</h3>
            <p>Reference Number: ${responseJson.objectID}</p>
            <p>Artist: ${responseJson.artistDisplayName}</p>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            </li>`
            );
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
    }
    else {
    $('#met-data').append(
        `<li>
        <h3>${responseJson.title}</h3>
        <p>Reference Number: ${responseJson.objectID}</p>
        <p>Artist: ${responseJson.artistDisplayName}</p>
        <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
        </li>`
        );
    }
}

function watchForm2() {
    $('#random-id').submit(function(event) {
        event.preventDefault();
        getMuseumID();
    });
}

function init() {
    watchForm1();
    watchForm2();
}

$(init);
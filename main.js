'use strict'; 

///objectID

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
    $('#met-data').append(
        `<li>
        <h3>${responseJson.title}</h3>
        <img src='${responseJson.primaryImage}' alt='no image availible'>
        </li>`
        );
}

function watchForm() {
    $('form').submit(function(event) {
        event.preventDefault();
        getMuseumID();
    });
}

function init() {
    watchForm();
}

$(init);
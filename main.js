'use strict'; 

///objectID

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
    .then(responseJson => console.log(responseJson))
    .catch(err => {
        $('#error-message').text('woops something went wrong');
    });
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
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
        $('#submit-error').empty();
        const userInput = $('.search-input').val();
        if (checkValidForm(userInput)) {
            getMuseumItemById(userInput);
        }
        else {
            $('#submit-error').append('Sorry that reference number is not valid');
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
            `<h3 class='title'>${responseJson.title}</h3>
            <li><p>Reference Number: ${responseJson.objectID}</p></li>
            <li><p class='artist-name'>Artist: Unknown</p></li>
            <li><p>City: Unknown</p></li>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            `
            );
            $('#wiki').removeClass('hidden');
            $('#wiki-data').empty();
            $('#wiki-error').empty();
    }
    else if (responseJson.artistDisplayName === "" && responseJson.city === "") {
        $('#met-data').append(
            `<h3 class='title'>${responseJson.title}</h3>
            <li><p>Reference Number: ${responseJson.objectID}</p></li>
            <li><p class='artist-name'>Artist: Unknown</p></li>
            <li><p>City: Unknown</p></li>
            <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
            `
            );
            $('#wiki').removeClass('hidden');
            $('#met').removeClass('hidden');
            $('#wiki-data').empty();
            $('#wiki-error').empty();
    }
    else if (responseJson.artistDisplayName === "" && responseJson.primaryImageSmall === "") {
        $('#met-data').append(
            `<h3 class='title'>${responseJson.title}</h3>
            <li><p>Reference Number: ${responseJson.objectID}</p></li>
            <li><p class='artist-name'>Artist: Unknown</p></li>
            <li><p>City: ${responseJson.city}</p></li>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            <iframe frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=${responseJson.city}&key=AIzaSyAM_l133bxxG5xGx8kXsI8PMYanQQJY3bA" allowfullscreen></iframe>
            `
            );
            $('#wiki').removeClass('hidden');
            $('#met').removeClass('hidden');
            $('#wiki-data').empty();
            $('#wiki-error').empty();
    }
    else if (responseJson.city === "" && responseJson.primaryImageSmall === "") {
        $('#met-data').append(
            `<h3 class='title'>${responseJson.title}</h3>
            <li><p>Reference Number: ${responseJson.objectID}</p></li>
            <li><p class='artist-name'>Artist: ${responseJson.artistDisplayName}</p></li>
            <li><p>City: Unknown</p></li>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            `
            );
            $('#wiki').removeClass('hidden');
            $('#met').removeClass('hidden');
            $('#wiki-data').empty();
            $('#wiki-error').empty();
    }
    else if (responseJson.artistDisplayName === ""){
        $('#met-data').append(
            `<h3 class='title'>${responseJson.title}</h3>
            <li><p>Reference Number: ${responseJson.objectID}</p></li>
            <li><p class='artist-name'>Artist: Unknown</p></li>
            <li><p>City: ${responseJson.city}</p></li>
            <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
            <iframe frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=${responseJson.city}&key=AIzaSyAM_l133bxxG5xGx8kXsI8PMYanQQJY3bA" allowfullscreen></iframe>
            `
            );
            $('#wiki').removeClass('hidden');
            $('#met').removeClass('hidden');
            $('#wiki-data').empty();
            $('#wiki-error').empty();
    }
    else if (responseJson.primaryImageSmall === "") {
        $('#met-data').append(
            `<h3 class='title'>${responseJson.title}</h3>
            <li><p>Reference Number: ${responseJson.objectID}</p></li>
            <li><p class='artist-name'>Artist: ${responseJson.artistDisplayName}</p></li>
            <li><p>City: ${responseJson.city}</p></li>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='no image availible'>
            <iframe frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=${responseJson.city}&key=AIzaSyAM_l133bxxG5xGx8kXsI8PMYanQQJY3bA" allowfullscreen></iframe>
            `
            );
            $('#wiki').removeClass('hidden');
            $('#met').removeClass('hidden');
            $('#wiki-data').empty();
            $('#wiki-error').empty();
    }
    else if (responseJson.city === "") {
        $('#met-data').append(
            `<h3 class='title'>${responseJson.title}</h3>
            <li><p>Reference Number: ${responseJson.objectID}</p></li>
            <li><p class='artist-name'>Artist: ${responseJson.artistDisplayName}</p></li>
            <li><p>City: Unknown</p></li>
            <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
            `
            );
            $('#wiki').removeClass('hidden');
            $('#met').removeClass('hidden');
            $('#wiki-data').empty();
            $('#wiki-error').empty();
    }
    else {
        $('#met-data').append(
            `<h3 class='title'>${responseJson.title}</h3>
            <li><p>Reference Number: ${responseJson.objectID}</p></li>
            <li><p class='artist-name'>Artist: ${responseJson.artistDisplayName}</p></li>
            <li><p>City: ${responseJson.city}</p></li>
            <img src='${responseJson.primaryImageSmall}' alt='no image availible'>
            <iframe frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=${responseJson.city}&key=AIzaSyAM_l133bxxG5xGx8kXsI8PMYanQQJY3bA" allowfullscreen></iframe>
            `
            );
            $('#wiki').removeClass('hidden');
            $('#met').removeClass('hidden');
            $('#wiki-data').empty();
            $('#wiki-error').empty();
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

    if (wikiUrl.length === 0) {
        $('#wiki-data').append(
            `<p>Sorry no results availible</p>`
        ); 
    }
    else if (wikiUrl.length === 1) {
        $('#wiki-data').append(
            `<p>Top result on Wikipedia</p>
            <a href='${wikiUrl[0]}'>#1</a>`
        );
    }
    else if (wikiUrl.length === 2) {
        $('#wiki-data').append(
            `<p>Top 2 results on Wikipedia</p>
            <a href='${wikiUrl[0]}'>#1</a>
            <a href='${wikiUrl[1]}'>#2</a>`
        );
    }
    else if (wikiUrl.length === 3) {
        $('#wiki-data').append(
            `<p>Top 3 results on Wikipedia</p>
            <a href='${wikiUrl[0]}'>#1</a>
            <a href='${wikiUrl[1]}'>#2</a>
            <a href='${wikiUrl[2]}'>#3</a>`
        );
    }
}

function watchForm3() {
    $('#wiki').on('click', '#wiki-button', function(event) {
        event.preventDefault();
        $('#wiki-error').empty();
        let wikiValue = $('.artist-name').text();
        let formatWikiValue = wikiValue.substring(8).toLowerCase().split(' ').join('_');

        console.log(wikiValue);
        console.log(formatWikiValue);
        
        if (formatWikiValue == 'unknown') {
            $('#wiki-error').append('Sorry no results availible');
        }
        else {
            getWiki($('.artist-name').text().substring(8).toLowerCase().replace(/[_\W]+/g, '_'));
        }
    });
}

function init() {
    watchForm1();
    watchForm2();
    watchForm3();
}

$(init);
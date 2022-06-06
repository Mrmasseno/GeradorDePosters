
/* const typedQuery = document.getElementById('squery'); 
let searchQuery = "";
squery.addEventListener('input', function (i) {
    searchQuery = i.target.value;
});

const getImagesButton = document.querySelector('.getImagesButton');
const imageToDisplay = document.querySelector('.imageToDisplay');
let requestUrl
getImagesButton.addEventListener('click', async () => {
    requestUrl = 'https://api.unsplash.com/search/photos?query='+searchQuery+'&client_id=YyFmNF6wbGncoP94VKDHrJxXFuoVUFEPwpRI4P7jmjs';
    console.log(requestUrl);
    let randomImage = await getNewImage();
    imageToDisplay.src = randomImage;
});

async function getNewImage() {

    let randomNumber = Math.floor(Math.random() * 10);
    return fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
            let allImages = data.results[randomNumber];
            return allImages.urls.regular;
        });
}

*/

const typedQuery = document.getElementById('squery'); 
let searchQuery = "";
let requestUrl;
const getImagesButton = document.querySelector('.getImagesButton');
let maindiv = document.querySelector('#main');

squery.addEventListener('input', function (i) {
    searchQuery = i.target.value;
    console.log(searchQuery);
});

getImagesButton.addEventListener('click', async () => {
    console.log("click");
    requestUrl = 'https://api.unsplash.com/search/photos?query='+searchQuery+'&client_id=YyFmNF6wbGncoP94VKDHrJxXFuoVUFEPwpRI4P7jmjs';
    console.log(requestUrl);
    let images = await getNewImages();
    maindiv.innerHTML = "<div class='fetchImagesWrapper'> <input type='text' id='squery' name='squery'> <button class='getImagesButton'> Get An Image </button> </div>";
    for (let i = 0; i < images.length; i++) {
        maindiv.innerHTML = maindiv.innerHTML+"<div class='imageDisplayWrapper' style='margin-top: 250x:'> <img class='imageToDisplay' style='width: 550px; height: 350px; border: 1px solid Oblack;' /> </div>";
        
    }
    imageToDisplay = document.querySelectorAll('.imageToDisplay');
    for (let j = 0; j < images.length; j++) {
    imageToDisplay[j].src = images[j].urls.regular;
    }
});

async function getNewImages() {

    let randomNumber = Math.floor(Math.random() * 10);
    return fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
            let allImages = data.results;
            return allImages;
        });
}

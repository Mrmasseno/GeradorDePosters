let img = [];
let loadImg = [];
let RectP = [];
let RectS = [];
let margin = 20;

let sX = [];
let sY = [];
let pX = [];
let pY = [];
let sXPoster;
let sYPoster;
let pXPoster;
let pYPoster;
let textMargin = 100;
let textX = [];
let textY = [];
let textSize = [];
let defaultTextSize = 260;

let posters = [];
let posterNum = 20;
let imageNum = 0;
let posterRandomNumber = [];
let posterText;
let textColor = [];
let picked = [];
let delay;

let avgRed = [];
let avgGreen = [];
let avgBlue = [];

let input;
let button;
let tokenTags;
let tags;
let texts;
let tokens;
let nouns = [];
let verbs1 = [];
let verbs2 = [];

let requestUrl;
let started;

var fonts = [];
var styles = ["NORMAL", "BOLD", "ITALIC", "BOLDITALIC"];
var fon = [];

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  console.log("posters setup: " + posters.length);

  colorMode(HSB);

  fonts[0] = "Joan";
  fonts[1] = "Lato";
  fonts[2] = "Montserrat";
  fonts[3] = "Kdam Thmor Pro";
  fonts[4] = "Nuosu SIL";
  fonts[5] = "Open Sans";
  fonts[6] = "Tai Heritage Pro";
  fonts[7] = "Poppins";
  fonts[8] = "Charis SIL";
  fonts[9] = "Source Sans Pro";
  fonts[10] = "Roboto";
  fonts[11] = "Abril Fatface";
  fonts[12] = "Acme";
  fonts[13] = "Alfa Slab One";
  fonts[14] = "Anton";
  fonts[15] = "Bebas Neue";
  fonts[16] = "Charis SIL";
  fonts[17] = "Cormorant Garamond";
  fonts[18] = "Dancing Script";
  fonts[19] = "Martel";
  fonts[20] = "Pacifico";
  fonts[21] = "Shadows Into Light";


  //--------- RiTA
  input = createInput();
  input.position(55, 30);
  button = createButton("Submit");
  button.position(195, 30);
  button.mousePressed(drawName);
  saveButton = createButton("Save Posters");
  saveButton.position(275, 30);
  saveButton.mousePressed(savePoster);

  //---------
  /* img = createImg('');
   img.loadPixels();
   let d = pixelDensity();
   let redAvg = [];
   let greenAvg = [];
   let blueAvg = [];
   let colorAvg = [];
   let brightnessAvg = [];
   
   let RectX1 = 0;
   let RectY1 = 0;
   let RectX2;
   let RectY2;
   for (let y = 0; y < img.width; y += 5) {
     for (let x = 0; x < img.height; x += 5) {
 
       //if (abs(brightnessAvg[x][y] - brightnessAvg[x - 4][y - 4]) > margin) {
       if (abs(brightness(img.get(x, y)) - brightness(img.get(x - 5, y - 5))) > margin) {
         RectX2 = x;
         RectY2 = y;
         RectP.append(RectX1, RectY1);
         RectS.append(RectX2, RectY2)
         RectX1 = x + 5;
         RectY1 = x + 5;
       }
     }
   }
   */

  delay = 0;
}

function draw() {
  background(255);
  for (let i = 0; i < RectP.length; i++) {
    fill(0, 0, 0);
    rect(RectX1, RectY1, RectX2, RectY2);
  }
  if (loadImg.length > 0) {
    drawPoster();
  } else if(started) {
    text("No Images Available", 48, 60);
  }
  delay++;
  //  console.log("delay: "+delay);
}

function drawPoster() {
  //  avgRed.length = 0;
  //  avgGreen.length = 0;
  //  avgBlue.length = 0;

  for (let i = 0; i < Math.min(posterNum, loadImg.length); i++) {
    posters[i].background(0);
    posters[i].image(loadImg[posterRandomNumber[i]], pX[posterRandomNumber[i]], pY[posterRandomNumber[i]], sX[posterRandomNumber[i]], sY[posterRandomNumber[i]]);
    if (i < (Math.min(posterNum, loadImg.length) / 2)) {
      pXPoster = i * (((windowHeight / 4) * 3508) / 4961) + i * 20 + 50;
      pYPoster = windowHeight / 5;
    } else {
      pXPoster = (i - (loadImg.length / 2)) * (((windowHeight / 4) * 3508) / 4961) + (i - (loadImg.length / 2)) * 20 + 50;
      pYPoster = windowHeight / 5 + windowHeight / 4 + 20;
    }
    sXPoster = ((windowHeight / 4) * 3508) / 4961;
    sYPoster = windowHeight / 4;


    /* for (let y = pYPoster; y < pYPoster+sYPoster; y += 100) {
       for (let x = pXPoster; x < pXPoster+sXPoster; x += 100) {
 
         avgRed[i] += red(get(x, y));
         console.log("red"+red(get(x, y)))
         avgGreen[i] += green(get(x, y));
         avgBlue[i] += blue(get(x, y));
 
       }
     }
 
     const numPixels = (windowHeight * windowWidth)/100;
     avgRed[i] /= numPixels;
     avgGreen[i] /= numPixels;
     avgBlue[i] /= numPixels;
     */

    posters[i].textSize(textSize[i]);
    posters[i].textWrap(WORD);
    posters[i].textFont("'" + fonts[fon[i]] + "'");
    //posters[i].fill(avgRed[i], avgGreen[i], avgBlue[i]);
    posters[i].fill(textColor[i]);
    if (textX[i] <= posters[i].width / 2) {
      if (textY[i] <= posters[i].width / 2) {
        posters[i].textAlign(LEFT, TOP);
      } else {
        posters[i].textAlign(LEFT, BOTTOM);
      }
      posters[i].text(posterText, textX[i], textY[i], posters[i].width - textX[i] - textMargin);
    } else {
      if (textY[i] <= posters[i].width / 2) {
        posters[i].textAlign(RIGHT, TOP);
      } else {
        posters[i].textAlign(RIGHT, BOTTOM);
      }
      posters[i].text(posterText, textX[i], textX[i] - textMargin);
    }

    if (mouseX >= pXPoster && mouseX <= pXPoster + sXPoster && mouseY >= pYPoster && mouseY <= pYPoster + sYPoster) {
      posters[i].background(0, 0, 0, 100);
      console.log("mouse over " + i);
      if (mouseIsPressed === true && delay > 100) {
        picked[i] = !picked[i];
        console.log("Picked: " + picked[i]);
        delay = 0;
      }
    }
    if (picked[i]) {
      strokeWeight(200);
      stroke(0);
    }
    image(posters[i], pXPoster, pYPoster, sXPoster, sYPoster);
    noStroke();
  }

}


async function images(data) {
  for (let i = 0; i < data.results.length; i++) {
    img.push(data.results[i].urls.regular);
  }
  for (let j = imageNum; j < img.length; j++) {
    let randomNumber = Math.floor(random(imageNum, img.length));
    loadImg[j] = await loadImage(img[j]);
    posters[j] = createGraphics(3508, 4961);
    posterRandomNumber[j] = Math.floor(random(0, loadImg.length));
    if (loadImg[j].height >= Math.sqrt(2) * loadImg[j].width) {
      sX[j] = posters[j].width;
      sY[j] = loadImg[j].height * posters[j].width / loadImg[j].width;
      pX[j] = 0;
      pY[j] = random(-abs((loadImg[j].height * posters[j].width / loadImg[j].width) - posters[j].height), 0);
    } else {
      sX[j] = loadImg[j].width * posters[j].height / loadImg[j].height;
      sY[j] = posters[j].height;
      pX[j] = random(-abs((loadImg[j].width * posters[j].height / loadImg[j].height) - posters[j].width), 0)
      pY[j] = 0;
    }
    textX[j] = random(margin, posters[j].width - margin);
    textY[j] = random(margin, posters[j].height - margin);
    textSize[j] = random(defaultTextSize, defaultTextSize + 500);
    fon[j] = Math.floor(random(0, fonts.length));
    textColor[j] = color(random(360), random(100), random(100));

  }
  /*
  for (let k = 0; k < posters.length; k++) {

    for (let y = 0; y < posters[k].height; y += 100) {
      for (let x = 0; x < posters[k].width; x += 100) {

        avgRed[k] += red(posters[k].get(x, y));
        console.log("red"+posters[k].get(x, y))
        avgGreen[k] += green(posters[k].get(x, y));
        avgBlue[k] += blue(posters[k].get(x, y));

      }
    }

    const numPixels = (posters[k].height * posters[k].width)/100;
    avgRed[k] /= numPixels;
    avgGreen[k] /= numPixels;
    avgBlue[k] /= numPixels;
  } 
  console.log("color: " + avgRed[0] + ", " + avgGreen[0] + ", " + avgBlue[0]); */
  imageNum += img.length;
  console.log(loadImg);
}

async function getNewImages(searchQuery) { //Unsplash

  let randomNumber = Math.floor(Math.random() * 10);
  requestUrl = 'https://api.unsplash.com/search/photos?query=' + searchQuery + '&client_id=YyFmNF6wbGncoP94VKDHrJxXFuoVUFEPwpRI4P7jmjs';
  console.log(requestUrl);
  fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      images(data);
    })
    .catch(error => console.log(error));
}


function drawName() {   //RiTA

  console.log("click");
  loadImg.length = 0;
  posters.length = 0;
  img.length = 0;
  sX.length = 0;
  sY.length = 0;
  pX.length = 0;
  pY.length = 0;
  imageNum = 0;
  picked.length = 0;

  posterText = input.value();

  texts = input.value();
  tokens = RiTa.tokenize(texts);
  tags = RiTa.getPosTags(tokens);
  // console.log ("tokens=",tokens, "tags=", tags);

  for (let n = 0; n < nouns.length; n++) {
    nouns[n] = null;
  }
  nouns.length = 0;

  for (let v = 0; v < verbs1.length; v++) {
    verbs1[v] = null;
  }
  verbs1.length = 0;

  for (let vv = 0; vv < verbs2.length; vv++) {
    verbs2[vv] = null;
  }
  verbs2.length = 0;

  for (let i = 0; i < tags.length; i++) {

    // see https://rednoise.org/rita/reference/postags.html
    if (tags[i] === "nnp" || tags[i] === "nn") {
      nouns[i] = tokens[i];
      //console.log (`name=${tokens[i]} (tag=${tags[i]})`);
    }

    if (tags[i] === "vb") {
      verbs1[i] = tokens[i];
    }

    if (tags[i] === "vbd" || tags[i] === "vbg" || tags[i] === "vbn" || tags[i] === "vbp" || tags[i] === "vbz") {
      verbs2[i] = tokens[i];
    }

  }
  nounsF = nouns.filter(function (element) {
    return element !== undefined;
  });
  nounsF = nouns.filter(function (element) {
    return !!element;
  });

  verbs1F = verbs1.filter(function (element) {
    return element !== undefined;
  });
  verbs1F = verbs1.filter(function (element) {
    return !!element;
  });

  verbs2F = verbs2.filter(function (element) {
    return element !== undefined;
  });
  verbs2F = verbs2.filter(function (element) {
    return !!element;
  });

  if (nounsF.length > 0) {
    object = loadJSON('https://api.conceptnet.io/related/c/en/' + nounsF[0] + '?limit=10&filter=/c/en');
    console.log(nounsF);
    console.log(object);
    for (let i = 0; i < nounsF.length; i++) {
      getNewImages(nounsF[i]);
    }
    console.log("nouns: " + nounsF.length);
    /*for (let i = 0; i < nounsF.length; i++) {
      images(nounsF[i]);
      console.log("nouns: "+i);
    }*/
  }
  if (nounsF.length == 0 && verbs1F.length > 0) {
    console.log(verbs1F);
    for (let i = 0; i < verbs1F.length; i++) {
      getNewImages(verbs1F[i]);
    }
  }
  if (nounsF.length == 0 && verbs1F.length == 0 && verbs2F.length > 0) {
    console.log(verbs2F);
    for (let i = 0; i < verbs2F.length; i++) {
      getNewImages(verbs2F[i]);
    }
  }
  console.log(posters[1]);
  started = true;
}

function savePoster() {
  for (let i = 0; i < Math.min(posterNum, loadImg.length); i++) {
    if (picked[i]) {
      save(posters[i], "Poster" + i + ".png");
    }
  }
}
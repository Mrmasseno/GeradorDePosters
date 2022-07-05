let img = [];
let loadImg = [];
let RectP = [];
let RectS = [];
let margin = 200;

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
let rectColor = [];
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

var fontsReg = [];
var fontsBold = [];
var fontsLight = [];
var fontsItalic = [];
var styles = ["NORMAL", "BOLD", "ITALIC", "BOLDITALIC"];
var fon = [];
let bbox = [];
let rectHeight = [];

let calls = 0;

function preload() {
  fontsReg[0] = loadFont("/fonts/Sans/Lato-Regular.ttf");
  fontsReg[1] = loadFont("/fonts/Sans/Montserrat-Regular.ttf");
  fontsReg[2] = loadFont("/fonts/Sans/OpenSans-Regular.ttf");
  fontsReg[3] = loadFont("/fonts/Sans/Poppins-Regular.ttf");
  fontsReg[4] = loadFont("/fonts/Sans/Roboto-Regular.ttf");
  fontsReg[5] = loadFont("/fonts/Sans/SourceSansPro-Regular.ttf");
  fontsReg[6] = loadFont("/fonts/Sans/BebasNeue-Regular.ttf");
  fontsReg[7] = loadFont("/fonts/Sans/Acme-Regular.ttf");
  fontsReg[8] = loadFont("/fonts/Sans/Anton-Regular.ttf");
  fontsReg[9] = loadFont("/fonts/Sans/KdamThmorPro-Regular.ttf");

  fontsReg[10] = loadFont("/fonts/Script/DancingScript-Regular.ttf");
  fontsReg[11] = loadFont("/fonts/Script/Pacifico-Regular.ttf");
  fontsReg[12] = loadFont("/fonts/Script/ShadowsIntoLight-Regular.ttf");

  fontsReg[13] = loadFont("/fonts/Serif/CharisSIL-Regular.ttf");
  fontsReg[14] = loadFont("/fonts/Serif/CormorantGaramond-Regular.ttf");
  fontsReg[15] = loadFont("/fonts/Serif/Martel-Regular.ttf");
  fontsReg[16] = loadFont("/fonts/Serif/TaiHeritagePro-Regular.ttf");
  fontsReg[17] = loadFont("/fonts/Serif/AbrilFatface-Regular.ttf");
  fontsReg[18] = loadFont("/fonts/Serif/Joan-Regular.ttf");
  fontsReg[19] = loadFont("/fonts/Serif/NuosuSIL-Regular.ttf");

  fontsReg[20] = loadFont("/fonts/Slab/AlfaSlabOne-Regular.ttf");


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  console.log("posters setup: " + posters.length);

  colorMode(HSB);


  //--------- RiTA
  input = createInput();
  input.position(55, 30);
  button = createButton("Submit");
  button.position(195, 30);
  button.mousePressed(drawName);
  saveButton = createButton("Save Posters");
  saveButton.position(275, 30);
  saveButton.mousePressed(savePoster);

  delay = 0;
}

function draw() {
  for (let i = 0; i < RectP.length; i++) {
    fill(0, 0, 0);
    rect(RectX1, RectY1, RectX2, RectY2);
  }
  
  delay++;
}

function drawPoster() {

  for (let i = 0; i < Math.min(posterNum, loadImg.length); i++) {
    posters[i].background(0);
    posters[i].image(loadImg[posterRandomNumber[i]], pX[posterRandomNumber[i]], margin * 3 + rectHeight[i] - 10, sX[posterRandomNumber[i]], sY[posterRandomNumber[i]]);
    if (i < (Math.min(posterNum, loadImg.length) / 2)) {
      pXPoster = i * (((windowHeight / 4) * 3508) / 4961) + i * 20 + 50;
      pYPoster = windowHeight / 5;
    } else {
      pXPoster = (i - (loadImg.length / 2)) * (((windowHeight / 4) * 3508) / 4961) + (i - (loadImg.length / 2)) * 20 + 50;
      pYPoster = windowHeight / 5 + windowHeight / 4 + 20;
    }
    sXPoster = ((windowHeight / 4) * 3508) / 4961;
    sYPoster = windowHeight / 4;

    posters[i].fill(255);
    posters[i].stroke(0);
    posters[i].strokeWeight(20);
    posters[i].fill(rectColor[i]);
    posters[i].rect(10, 10, posters[i].width - 10, margin * 4 + rectHeight[i] - 10);
    posters[i].noStroke();
    posters[i].textSize(textSize[i]);
    posters[i].textLeading(textSize[i] * 0.9);
    posters[i].textWrap(WORD);
    // posters[i].textStyle(BOLD);
    posters[i].textFont(fontsReg[fon[i]]);
    posters[i].fill(textColor[i]);
    posters[i].textAlign(LEFT, CENTER);
    posters[i].text(posterText.toUpperCase(), textX[i], textY[i], posters[i].width);

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
  calls++;
  for (let i = 0; i < data.results.length; i++) {
    img.push(data.results[i].urls.regular);
  }
  for (let j = imageNum; j < img.length; j++) {
    let randomNumber = Math.floor(random(imageNum, img.length));
    loadImg[j] = loadImage(img[j]);
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
    textX[j] = margin;
    fon[j] = Math.floor(random(0, fontsReg.length));
    textSize[j] = 1;
    bbox[j] = fontsReg[fon[j]].textBounds(posterText.toUpperCase(), textX[j], textY[j], textSize[j]);
    while (bbox[j].w < posters[j].width - (margin * 2)) {
      textSize[j]++;
      bbox[j] = fontsReg[fon[j]].textBounds(posterText.toUpperCase(), textX[j], textY[j], textSize[j]);
      rectHeight[j] = textSize[j];
      console.log(j + ": " + bbox[j].w);
    }
    console.log(textSize[j]);
    if (calls > 0) {
      let prevTextSize = textSize[j];
      textSize[j] = random(prevTextSize, prevTextSize * 1.2);
      if (textSize[j] > prevTextSize * 1.5) {
        console.log("peepee");
        rectHeight[j] *= 4;
      } else if (textSize[j] > prevTextSize * 1.2) {
        console.log("poopoo");
        rectHeight[j] *= 3;
      }
    }
    textY[j] = margin / 2 + rectHeight[j];
    fon[j] = Math.floor(random(0, fontsReg.length));

    let hue = random(360);
    let sat = random(100);
    let lit = random(100)

    textColor[j] = color(hue, sat, lit);
    rectColor[j] = color((hue + 180) % 360, sat, 100-lit);

  }
  imageNum += img.length;
  console.log(loadImg);

  var delayInMilliseconds = 2000; 
  setTimeout(function () {
    if (loadImg.length > 0) {
    drawPoster();
  } else if (started) {
    text("No Images Available", 48, 60);
  }
  }, delayInMilliseconds);
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
  textColor.length = 0;
  rectColor.length = 0;
  imageNum = 0;
  picked.length = 0;
  textSize.length = 0;
  bbox.length = 0;
  rectHeight.length = 0;
  calls = 0;

  posterText = input.value();

  texts = input.value();
  tokens = RiTa.tokenize(texts);
  tags = RiTa.getPosTags(tokens);
  console.log("tokens=", tokens, "tags=", tags);

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
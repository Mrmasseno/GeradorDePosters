let img = [];
let loadImg = [];
let RectP = [];
let RectS = [];
let margin = 200;

let textMargin = 100;
let textX = [];
let textY = [];
let defaultTextSize = 260;

let posters = [];
let posterNum = 16;
let imageNum = 0;
let posterRandomNumber = [];
let posterText = [];
let textColor = [];
let rectColor = [];
let picked = [];
let hovered = [];
let delay;

let sXPoster = [];
let sYPoster = [];
let pXPoster = [];
let pYPoster = [];

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
let rectHeight = [];

let calls = 0;

let population;

let postersSaved = 0;
let saveHover;
let saveImg;

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

  saveHover = loadImage("data/on.png");
  saveImg = loadImage("data/off.png");
}

function Hover() {
  image(saveHover, 275, 70);
  console.log("hover");
}
function Out() {
  image(saveImg, 275, 70);
  console.log("out");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  console.log("posters setup: " + posters.length);

  colorMode(RGB);
  console.log("width: " + windowWidth);


  //--------- RiTA
  input = createFileInput(fileUpload);
  input.style("border-radius", "25px");
  // input.style("background-color","#5c573e");
  input.style("color", "#FBFBF2");
  // input.style("width","125px");
  input.style("font-family", "Roboto");
  input.position(55, 70);

  button = createButton("Submit");
  button.style("border-radius", "25px");
  button.style("background-color", "#5c573e");
  button.style("color", "#FBFBF2");
  button.style("font-family", "Roboto");
  button.attribute('hover', '{ border:2px solid red; }');
  button.position(270, 70);
  button.mousePressed(drawName);

  saveButton = createImg("data/save.png");
  saveButton.mouseOver(Hover);
  saveButton.mouseOut(Out);
  saveButton.style("cursor", "pointer");
  saveButton.style("width", "30px");

  saveButton.position(350, 65);
  saveButton.mousePressed(savePoster);

  delay = 0;

  //pixelDensity(2.0);

}

var XP = 0;
var noText = false;
var noSave = false;
var k = 0;
var js = [];
var f = [];
var final = [];
var fp = [];
var st = [];
var rP = [];
let done = true;

function draw() {

  background(180);
  

  fill(251, 251, 242);
  noStroke();
  ellipseMode(CENTER);
  ellipse(365, 80, 33, 33);
  fill(251, 251, 242);
  noStroke();
  textStyle(NORMAL);
  textSize(42);
  textFont("Roboto");
  text("Posters", 81, 50);
  fill(69, 5, 12);
  text("X", 55, 50);

  if (dist(mouseX, mouseY, 370, 50 + 20) <= 20) {

    //fill(69, 5, 12);

    if (mouseIsPressed) {
      // fill(108, 197, 81);      
      noFill();
      strokeWeight(4);
      stroke(108, 197, 81);
      ellipseMode(CENTER);
      ellipse(365, 80, 30, 30);
    } else {
      noFill();
      strokeWeight(4);
      stroke(69, 5, 12);
      ellipseMode(CENTER);
      ellipse(365, 80, 30, 30);
    }
  }

  for (let i = 0; i < posterNum; i++) {
    if (population) {
      population.getIndiv(i).drawPoster();
      textSize(16);
      noStroke();
      fill(0);
      text(population.getIndiv(i).getFitness(), pXPoster[i] + (sXPoster[i] / 2), pYPoster[i] + sYPoster[i] + 20);
    }
    if (mouseX >= pXPoster[i] && mouseX <= pXPoster[i] + sXPoster[i] && mouseY >= pYPoster[i] && mouseY <= pYPoster[i] + sYPoster[i]) {
      hovered[i] = true;
      noFill();
      stroke(69, 5, 12);
      strokeWeight(3);
      rect(pXPoster[i], pYPoster[i], sXPoster[i], sYPoster[i]);
      if (mouseIsPressed === true && delay > 50) {
        picked[i] = !picked[i];
        console.log("Picked: " + picked[i]);
        delay = 0;
      }
    } else {
      hovered[i] = false;
    }
    if (picked[i]) {
      noFill();
      stroke(108, 197, 81);
      strokeWeight(3);
      rect(pXPoster[i], pYPoster[i], sXPoster[i], sYPoster[i]);
      population.getIndiv(i).setFitness(100);
    }
  }

  if (noText) {
    fill(232, 69, 30);
    textSize(12);
    textStyle(NORMAL);
    textFont("Roboto");
    text("Please insert .txt file", 55, 100);
  } else {

  }
  if (noSave) {
    fill(232, 69, 30);
    textSize(12);
    textStyle(NORMAL);
    textFont("Roboto");
    text("Please select the desired posters", 55, 100);
  } else {

  }


  if (js.length == final.length * 10) {
    if (k == 100) {
      console.log(js);

      var r1;
      var r2;

      r1 = round(random(0, final.length - 1));
      r2 = round(random(0, js.length - 1));
      getNewImages(final[r1]);
      getNewImages(js[r2]);
      console.log(final[r1]);
      console.log(js[r2]);
    }
  }

  if (final.length > 0 && k < 110) k++;

  if (k >= 110 && final.length <= 0) {
    k = 0;

  }

  delay++;
}


async function images(data) {
  calls++;
  console.log("img: " + img.length);
  for (let i = 0; i < data.results.length; i++) {
    img.push(data.results[i].urls.regular);
  }
  population = new Population(posterNum, img, 0.2);
  var delayInMilliseconds = 2000;
  background(236, 191, 44);
  fill(0);
  text("Loading...", 48, 60);
  setTimeout(function () {
    background(236, 191, 44);
    if (img.length > 0) {
      for (let i = 0; i < posterNum; i++) {

        if (i < (posterNum / 2)) {

          pXPoster[i] = i * (((windowHeight / 3) * 3508) / 4961) + i * (windowWidth / 100) + 50;
          pYPoster[i] = windowHeight / 2 - (windowHeight / 3) - 5;
        } else {
          pXPoster[i] = (i - (posterNum / 2)) * (((windowHeight / 3) * 3508) / 4961) + (i - (posterNum / 2)) * (windowWidth / 100) + 50;
          pYPoster[i] = windowHeight / 2 + 50;
        }
        sXPoster[i] = windowWidth / 9;
        sYPoster[i] = ((windowWidth / 9) * 4961) / 3508
        // console.log(population.getIndiv(i));

        population.getIndiv(i).setPoster(sXPoster[i], sYPoster[i], pXPoster[i], pYPoster[i], margin, posterText);
      }
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


function fileUpload(file) {
  if (file.type == "text") {
    posterText = split(file.data, "\r");
    console.log(posterText);
  }
}

function replacer(key, value) {
  if (typeof value === "number") {
    return undefined;
  }
  return value;
}
async function getRelated(searchQuery) {
  let randomNumber = Math.floor(Math.random() * 10);
  //for(var w=0;w<n;w++){
  requestUrl =
    "https://api.conceptnet.io/related/c/en/" +
    searchQuery +
    "?limit=9&filter=/c/en";
  //}

  console.log(requestUrl);
  fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data, replacer)
        .replace(/"|}|{|@id|:|related/g, "").replace(/_/g, " ")
        .replace(/\//g, "")
        .replace(/[\[\]']+/g, "")
        .replace(/,cen/g, ",")
        .replace("cen", "");
      js = js.concat(data.split(","));

      //console.log(js);
    })
    .catch((error) => console.log(error));
}
async function drawName() {
  if (input.value().length > 0) {
    if (texts != input.value()) {
      XP = 0;
    }/*else{
    XP++;
  }*/

    //RiTA

    background(236, 191, 44);
    console.log("Started");
    k = 0;
    final = [];
    js = [];   //RiTA
    f.length = 0;
    fp.length = 0;
    st.length = 0;
    console.log("click");
    loadImg.length = 0;
    posters.length = 0;
    img.length = 0;
    /*sX.length = 0;
    sY.length = 0;
    pX.length = 0;
    pY.length = 0;*/
    imageNum = 0;
    picked.length = 0;

    //posterText = input.value();

    texts = posterText[0];
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
      final = final.concat(nounsF);

    }

    if (nounsF.length == 0 && adj.length > 0) {
      final = final.concat(adjF);
    }
    if (nounsF.length == 0 && adj.length == 0 && verbs1F.length > 0) {
      final = final.concat(verbs1F);
    }
    if (
      nounsF.length == 0 &&
      adj.length == 0 &&
      verbs1F.length == 0 &&
      verbs2F.length > 0
    ) {
      final = final.concat(verbs2F);
    }

    if (
      nounsF.length == 0 &&
      adj.length == 0 &&
      verbs1F.length == 0 &&
      verbs2F.length == 0
    ) {
      final = final.concat(restoF);
    }

    for (var fi = 0; fi < final.length; fi++) {
      final[fi] = final[fi].toLowerCase();
      await getRelated(final[fi]);

    }


    console.log(js);
    // ready = !ready;
    console.log(posters[1]);
    started = true;
    noText = false;
  } else {
    noText = true;
    noSave = false;
  }

}

function savePoster() {
  if (picked.length > 0) {
    for (let i = 0; i < posterNum; i++) {
      if (picked[i]) {
        save(population.getIndiv(i).graphic, "Poster" + postersSaved + ".png");
        postersSaved++;
      }
    }
    noSave = false;

  } else {
    noSave = true;
    noText = false;
  }
}

function keyReleased() {
  for (let i = 0; i < posterNum; i++) {
    if (hovered[i]) {
      if (keyCode === 16 || keyCode === 107 || keyCode === 171) {
        population.getIndiv(i).setFitness(constrain(population.getIndiv(i).getFitness() + 10, 0, 100));
      }
      if (keyCode === 17 || keyCode === 109 || keyCode === 173) {
        population.getIndiv(i).setFitness(constrain(population.getIndiv(i).getFitness() - 10, 0, 100));
      }
    }
  }
  if (keyCode === 32) {
    console.log("space");
   // population.naturalSelection();
    population.evolve();
    population.clearFitness();
    for (let i = 0; i < posterNum; i++) {

      if (i < (posterNum / 2)) {

        pXPoster[i] = i * (((windowHeight / 3) * 3508) / 4961) + i * (windowWidth / 100) + 50;
        pYPoster[i] = windowHeight / 2 - (windowHeight / 3) - 5;
      } else {
        pXPoster[i] = (i - (posterNum / 2)) * (((windowHeight / 3) * 3508) / 4961) + (i - (posterNum / 2)) * (windowWidth / 100) + 50;
        pYPoster[i] = windowHeight / 2 + 50;
      }
      sXPoster[i] = windowWidth / 9;
      sYPoster[i] = ((windowWidth / 9) * 4961) / 3508
      // console.log(population.getIndiv(i));

      population.getIndiv(i).setPoster(sXPoster[i], sYPoster[i], pXPoster[i], pYPoster[i], margin, posterText);
      console.log("new individual: "+population.getIndiv(i));
    }
    picked.length = 0;
  }
}
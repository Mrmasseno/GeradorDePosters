class Poster {

    constructor(graphic, images) {
        this.genes = [];
        for (let i = 0; i < 11; i++) {
            this.genes[i] = random(100);
        }
        this.graphic = graphic;
        this.imageurls = [];
        this.imageurls = images;
        this.images = [];
        for (let i = 0; i < images.length; i++) {
            this.images[i] = loadImage(images[i]);
        }
        this.fitness = 0;
        console.log(graphic);
    }
    setPoster(w, h, x, y, margin, text) {

        let imageX;
        let imageWidth;
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;

        this.graphic.background(0);
        if (this.genes[1] < 50) {
            imageX = 0;
            imageWidth = this.graphic.width;
        } else {
            imageX = this.graphic.width / 2;
            imageWidth = this.graphic.width / 2
        }
        let rectHue = Math.floor(map(this.genes[2], 0, 100, 0, 360));
        let rectSat = Math.floor(this.genes[3]);
        let rectBri = Math.floor(this.genes[4]);
        let font = fontsReg[Math.floor(map(this.genes[5], 0, 100, 0, fontsReg.length))]

        let textSize1 = 1;
        let bbox = font.textBounds(text[0].toUpperCase(), margin, 0, textSize1);
        let rectHeight1 = 0;
        let rectHeight2 = 0;
        while (bbox.w < this.graphic.width - (margin * 2)) {
            textSize1++;
            bbox = font.textBounds(text[0].toUpperCase(), margin, 0, textSize1);
            rectHeight1 = textSize1;
        }

        let textSize2 = 1;
        if (text.length > 1&& text[1] != "" && text[1] != " ") {
            let bbox2 = font.textBounds(text[1].toUpperCase(), margin, 0, textSize2);
            while (bbox2.w < this.graphic.width - (margin * 2)) {
                textSize2++;
                bbox2 = font.textBounds(text[1].toUpperCase(), margin, 0, textSize2);
                rectHeight2 = textSize2;
            }
        }
        let textSize3;
        if (text.length > 2 && text[2] != "" && text[2] != " ") {
            textSize3 = text[2].length / map(this.genes[10], 0, 100, 1.8, 2.2);
            // textSize3 = 140;
        }
        let whichImage = this.images[Math.floor(map(this.genes[0], 0, 100, 0, this.images.length))];
        console.log(whichImage);

        let prevTextSize = textSize1;
        if (calls > 1) {
            textSize1 = random(prevTextSize * 0.8, prevTextSize * 1.3);
        } else {
            textSize1 = random(prevTextSize * 0.8, prevTextSize);
        }
        if (textSize1 > prevTextSize) {
            rectHeight1 *= 2;
        }


        let imagePX;
        let imagePY;
        let imageSX;
        let imageSY;
        let sw;
        let sh;
        let destPX;
        let destPY;
        let destSX;
        let destSY;

        if (text.length > 2&& text[2] != "" && text[2] != " ") {
            destPX = imageX;
            destPY = (margin * 2) + rectHeight1 - 10;
            destSX = this.graphic.width / 2;
            destSY = this.graphic.height - (rectHeight2 * 2) - margin - 10 - destPY;

            let windowAspect = (this.graphic.width / 2) / (this.graphic.height - ((this.graphic.height - 10) - (this.graphic.height - (rectHeight2 * 2) - margin - 10)) - (margin * 4 + rectHeight1 - 10));
            let imageAspect = whichImage.width / whichImage.height;
            if (windowAspect >= imageAspect) {
                sw = whichImage.width;
                sh = sw / windowAspect;
                imagePX = 0;
                imagePY = map(this.genes[9], 0, 100, 0, whichImage.height - sh);
                imageSX = sw;
                imageSY = sh;
            } else {
                sh = whichImage.height;
                sw = sh * windowAspect;
                imagePX = map(this.genes[8], 0, 100, 0, whichImage.width - sw);
                imagePY = 0;
                imageSX = sw;
                imageSY = sh;
            }

        } else if (text.length > 1&& text[1] != "" && text[1] != " ") {

            destPX = 0;
            destPY = (margin * 2) + rectHeight1 - 10;
            destSX = this.graphic.width;
            destSY = this.graphic.height - (rectHeight2 * 2) - margin - 10 - destPY;

            let windowAspect = this.graphic.width / (this.graphic.height - ((this.graphic.height - 10) - (this.graphic.height - (rectHeight2 * 2) - margin - 10)) - (margin * 4 + rectHeight1 - 10));
            let imageAspect = whichImage.width / whichImage.height;
            if (windowAspect >= imageAspect) {
                sw = whichImage.width;
                sh = sw / windowAspect;
                imagePX = 0;
                imagePY = map(this.genes[9], 0, 100, 0, whichImage.height - sh);
                imageSX = sw;
                imageSY = sh;
            } else {
                sh = whichImage.height;
                sw = sh * windowAspect;
                imagePX = map(this.genes[8], 0, 100, 0, whichImage.width - sw);
                imagePY = 0;
                imageSX = sw;
                imageSY = sh;
            }


        } else {
            destPX = 0;
            destPY = (margin * 2) + rectHeight1 - 10;
            destSX = this.graphic.width;
            destSY = this.graphic.height;

            let windowAspect = this.graphic.width / (this.graphic.height - destPY);
            let imageAspect = whichImage.width / whichImage.height;
            if (windowAspect >= imageAspect) {
                sw = whichImage.width;
                sh = sw / windowAspect;
                imagePX = 0;
                imagePY = map(this.genes[9], 0, 100, 0, whichImage.height - sh);
                imageSX = sw;
                imageSY = imagePY + sh;
            } else {
                sh = whichImage.height;
                sw = sh * windowAspect;
                imagePX = map(this.genes[8], 0, 100, 0, whichImage.width - sw);
                imagePY = 0;
                imageSX = imagePX + sw;
                imageSY = sh;
            }
        }
        this.graphic.noStroke();
        this.graphic.image(whichImage, destPX, destPY, destSX, destSY, imagePX, imagePY, imageSX, imageSY);

        if (Math.floor(map(this.genes[6], 0, 100, 0, 5)) == 0) {

            this.graphic.filter(THRESHOLD);//-
        }
        if (Math.floor(map(this.genes[6], 0, 100, 0, 5)) == 1) {
            this.graphic.filter(GRAY);
        }
        if (Math.floor(map(this.genes[6], 0, 100, 0, 5)) == 2) {
            this.graphic.filter(INVERT);
        }
        if (Math.floor(map(this.genes[6], 0, 100, 0, 5)) == 3) {
            this.graphic.filter(POSTERIZE, map(this.genes[7], 0, 100, 2, 255));
        }
        if (Math.floor(map(this.genes[6], 0, 100, 0, 5)) == 4) {
            this.graphic.filter(DILATE);
        }

        this.graphic.colorMode(HSB);
        this.graphic.fill(255);
        this.graphic.stroke(0);
        this.graphic.strokeWeight(30);
        this.graphic.fill(rectHue, rectSat, rectBri);


        if (text.length > 2&& text[2] != "" && text[2] != " ") {
            if (imageX == 0) {
                this.graphic.rect(this.graphic.width / 2 + 10, (margin * 2) + rectHeight1, this.graphic.width / 2 - 10, this.graphic.height - (rectHeight2 * 2) - margin - 20 - destPY);
            } else {
                this.graphic.rect(10, (margin * 2) + rectHeight1, this.graphic.width / 2 - 10, this.graphic.height - (rectHeight2 * 2) - margin - 20 - destPY);
            }
        }
        if (text.length > 1&& text[1] != "" && text[1] != " ") {
            this.graphic.rect(10, this.graphic.height - (rectHeight2 * 2) - margin - 10, this.graphic.width - 10, this.graphic.height - 10);
        }

        this.graphic.rect(10, 10, this.graphic.width - 10, (margin * 2) + rectHeight1 - 10);
        this.graphic.noStroke();




        this.graphic.textSize(textSize1);
        this.graphic.textLeading(textSize1 * 0.9);
        this.graphic.textWrap(WORD);
        // posters[i].textStyle(BOLD);
        this.graphic.textFont(font);
        this.graphic.fill((rectHue + 180) % 360, rectSat, 100 - rectBri);
        this.graphic.textAlign(CENTER, CENTER);

        this.graphic.text(text[0].toUpperCase(), margin / 2, margin / 2 + (rectHeight1 / 2), this.graphic.width - margin);
        if (text.length > 1&& text[1] != "" && text[1] != " ") {
            this.graphic.textSize(textSize2);
            this.graphic.textLeading(textSize2 * 0.9);
            this.graphic.text(text[1].toUpperCase(), margin / 2, this.graphic.height - (margin * 1.5) - rectHeight2 / 2, this.graphic.width - margin);
        }
        if (text.length > 2&& text[2] != "" && text[2] != " ") {
            this.graphic.textAlign(LEFT, BASELINE);
            this.graphic.textSize(textSize3);
            this.graphic.textLeading(textSize3 * 1.1);
            if (imageX == 0) {
                this.graphic.text(text[2].toUpperCase(), this.graphic.width / 2 + margin, destPY + margin, this.graphic.width / 2 - (margin * 2), destSY - (margin * 2));
            } else {
                this.graphic.text(text[2].toUpperCase(), margin, destPY + margin, this.graphic.width / 2 - (margin * 2), destSY - (margin * 2));
            }
        }

        this.graphic.noFill();
        this.graphic.stroke(0);
        this.graphic.strokeWeight(40);
        this.graphic.rect(10, 10, this.graphic.width - 20, this.graphic.height - 20);
        this.graphic.noStroke();
    }

    drawPoster() {
        image(this.graphic, this.x, this.y, this.w, this.h);
    }

    crossover(partner) {
        let child = new Poster(this.graphic, this.imageurls);
        let point = floor(random(this.genes.length));

        for (let i = 0; i < this.genes.length; i++) {
            if (i > point) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        }
        return child;
    }

    mutate(rate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < rate) {
                //this.genes[i] = random(100);
                this.genes[i] = constrain(this.genes[i] + random(-50, 50), 0, 100);
            }
        }
    }
    setFitness(fit) {
        this.fitness = fit;
    }
    getFitness() {
        return this.fitness;
    }

}

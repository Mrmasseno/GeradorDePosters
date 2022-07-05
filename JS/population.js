class Population {
    constructor(size, img, mutation) {
        this.popSize = size;
        this.population = [];
        this.canvas = [];
        this.mutation = mutation;
        this.images = [];
        this.images = img;
        this.pool;
        for (let i = 0; i < this.popSize; i++) {
            this.canvas[i] = createGraphics(3508, 4961);
            this.population[i] = new Poster(this.canvas[i], this.images);
        }
        this.generations = 0;
    }
    getIndiv(i) {
        return this.population[i];

    }
    naturalSelection() {
        this.pool = [];
        let maxFitness = 0;

        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
            }
        }
        console.log("max fitness: " + maxFitness);

        for (let i = 0; i < this.population.length; i++) {
            let fitness = map(this.population[i].fitness, 0, maxFitness, 0.5, 1);
            let n = floor(fitness * 100);
            for (let j = 0; j < n; j++) {
                this.pool.push(this.population[i]);
            }
        }
    }

    tournamentSelection() {
        let tournament = [];
        let tournamentSize = 4;
        for (let i = 0; i < tournamentSize; i++) {
            let randIndex = Math.floor(random(0, this.popSize));
            tournament[i] = this.population[randIndex];
            console.log("tournament i " + tournament[i] + " " + this.population[0]);
        }
        console.log("tournament: " + tournament);
        let fittest = tournament[0];
        for (let i = 1; i < tournamentSize; i++) {
            if (tournament[i].fitness > fittest.fitness) {
                fittest = tournament[i];
            }
        }
        return fittest;
    }

    evolve() {
        let eliteSize = 3;
        let newGen = [];

        /*
        let fitnesses = [];
        for (let i = 0; i < this.popSize; i++) {
            fitnesses[i] = this.population[i].getFitness();
        }
        fitnesses = sort(fitnesses);
        fitnesses = reverse(fitnesses);
        console.log(fitnesses);

        let items = [];
        for (let i = 0; i < this.popSize; i++) {
            items[i] = [this.population[i], this.population[i].getFitness()];
        }

        this.population.sort(function (a, b) {
            return fitnesses.indexOf(b) - fitnesses.indexOf(a);
        });

        for (let i = 0; i < eliteSize; i++) {
            newGen[i] = this.population[i];
        }
        */
        for (let i = 0; i < eliteSize; i++) {
            let fittest = this.population[i];
            for (let j = i + 1; j < this.popSize; j++) {
                if (this.population[j].fitness > fittest.fitness) {
                    fittest = j;
                }
            }
            let temp = this.population[i];
            this.population[i] = this.population[fittest];
            this.population[fittest] = temp;
            newGen[i] = this.population[i];
        }

        for (let i = eliteSize; i < this.popSize; i++) {
            let partnerA = this.tournamentSelection();
            let partnerB = this.tournamentSelection();
            console.log("partnerA: " + partnerA);
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutation);
            console.log("child " + child);
            newGen[i] = child;
        }
        this.population.length = [];
        for (let i = 0; i < this.popSize; i++) {
            this.population[i] = newGen[i];
            console.log("graphic " + this.population[i].graphic);
        }
        this.generations++;

    }
    clearFitness() {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].setFitness(0);
        }
    }

}
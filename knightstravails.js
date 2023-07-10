class Knight{
    constructor(){
        this.board = new Board().board;
        this.move = [[1,2], [2,1], [-1,2], [-2,1], 
                     [-2,-1], [-1,-2], [1,-2], [2,-1]];
        this.visited = [];
        this.queue = [];

    }

    knightMoves(starting, ending){
        let finalStep = this.findStep(new Step(starting), ending)
        let count = 1;
        let path = [finalStep.space]
        while(finalStep.previous != null){
            finalStep = finalStep.previous;
            path.unshift(finalStep.space);
            count ++;
        }

        console.log(`You made it in ${count} moves! Here is your path:`)
        while(path.length != 0){
            console.log(path.shift())
        }
    }

    findStep(step, ending, queue = [], visited = [step]){
        if(step.space[0] === ending[0] && step.space[1] === ending[1]) return step

        this.move.forEach(element => {
            let newStep = [element[0] + step.space[0], element[1]+step.space[1]];
            if(this.withinBoard(newStep) && (!this.beenVisited(newStep, visited)) ){
                queue.push(new Step(newStep, step));
                visited.push(newStep);
            }
        })

        if(this.beenVisited(ending, visited)) return this.returnStep(ending, queue);

        let nextStep = this.findStep(queue.shift(), ending, queue, visited)

        return nextStep
    }

    withinBoard(step){
        if((step[0] >= 1 && step[0] <= 8) && (step[1] >= 1 && step[1] <= 8)){
            return true        
        }else{
            return false
        }
    }

    beenVisited(step, visit){
        let visited = false
        visit.forEach(element => {
            if(element[0] === step[0] && element[1] === step[1]){
                visited = true
            }
        })
        return visited;
    }
    
    returnStep(ending, queue){
        let final;
        queue.forEach(element => {
            if(element.space[0] === ending[0] && element.space[1] === ending[1]){
                final = element;
            }
        })
        return final;
    }

}

class Board{
    constructor(){
        this.board = this.createBoard();
    }

    createBoard(){
        let board = [];
        for( let i = 1; i <= 8; i++){
            for(let j = 1; j <= 8; j++){
                let space = [i,j];
                board.push(space);
            }
        }
        return board;
    }
}

class Step{
    constructor(space, previous = null){
        this.space = space;
        this.previous = previous;
    }
}

test = new Knight;
test.knightMoves([1,1], [1,1]);
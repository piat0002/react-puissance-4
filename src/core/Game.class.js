import Cell from "./Cell.class"
import indexToCoord, { coordToIndex } from "./utils";

export default class Game{
    /**
     * @integer
     */
    _currentPlayer;

    /**
     * @integer
     */
    _currentTurn;

    /**
     * @array of 6 @array of 7 @cell 
     */
    _cells;

    constructor(){
        this._currentPlayer = 1;
        this._currentTurn = 1;
        this._cells = [];
        let counter = 0;
        for (let index = 0; index < 6; index++) {
            
            let array = new Array;
            for (let j = 0; j < 7; j++) {
                array.push(new Cell(counter));
                counter++;
            }
            this._cells.push(array);
        }
    }

    /**
     * methode qui change le player
     */
    changePlayer(){
        this._currentPlayer = this._currentPlayer % 2 + 1;
    }

    /**
     * modif la cell
     * @param {int} numberIndex 
     */
    modifCell(numberIndex){
        let coord = indexToCoord(numberIndex)
        this._cells[coord.y][coord.x].setPlayer(this._currentPlayer)
    }

    /**
     * 
     * @param {int} numberIndex 
     * @returns @boolean
     */
     isVictoryRow(numberIndex){
        let coord = indexToCoord(numberIndex)

        let debutBoucle = coord.x - 3; 
        let finBoucle = coord.x + 4;
        let compteurDePlayer = 0;
        
        console.log(coord)
        if(debutBoucle < 0){
            debutBoucle = 0
        }
        if(finBoucle > 7){
            finBoucle = 7
        }

        for (let index = debutBoucle; index < finBoucle; index++) {
            //console.log(`_cells[${coord.y}][${index}]`,this._cells[coord.y][index])
            if(this._cells[coord.y][index].getPlayer() !== this._currentPlayer){
                compteurDePlayer = 0;
                
            }
            else{
                compteurDePlayer++
            }
            if(compteurDePlayer === 4){
                return true
            }
        }
        return false
    }

    isVictoryCollum(numberIndex){

        let compteurDePlayer = 0;
        let coord = indexToCoord(numberIndex)
        let debutBoucle = coord.y - 3; 
        let finBoucle = coord.y + 4;
        if(debutBoucle < 0){
            debutBoucle = 0
        }
        if(finBoucle > 6){
            finBoucle = 6
        }

        for (let index = debutBoucle; index < finBoucle; index++) {
            if(this._cells[index][coord.x].getPlayer() !== this._currentPlayer){
                compteurDePlayer = 0;
            }
            else{
                compteurDePlayer++;
            }
            if(compteurDePlayer === 4){
                return true
            }
        }
        return false
    }

    isVictoryDiagonal(){
        //pour tous ↘ ou il peut avoir 4 d'affiler 
        let descande = [[14,22,30,38],[7,15,23,31,39],[0,8,16,24,32,40],[1,9,17,25,33,41],[2,10,18,26,34],[3,11,19,27]]
        let compteurDePlayer = 0
        let coord = 0;
        let retour = false
        descande.forEach(diago=>{
            compteurDePlayer = 0;
            diago.forEach(nbcell=>{
                coord = indexToCoord(nbcell);
                
                if(this._cells[coord.y][coord.x].getPlayer() !== this._currentPlayer){
                    compteurDePlayer = 0;
                }
                else{
                    compteurDePlayer++;
                }
                if(compteurDePlayer === 4){
                    retour = true;
                }
                
            })
            compteurDePlayer = 0;
        })

        //pour tous ↙ ou il peut avoir 4 d'affiler
        let montant = [[3,9,15,21],[4,10,16,22,28],[5,11,17,23,29,35],[6,12,18,24,30,36],[13,19,25,31,37],[20,26,32,38]]
        montant.forEach(diago=>{
            compteurDePlayer = 0;
            diago.forEach(nbcell=>{
                coord = indexToCoord(nbcell);
                //console.log(compteurDePlayer)
                if(this._cells[coord.y][coord.x].getPlayer() !== this._currentPlayer){
                    compteurDePlayer = 0;
                }
                else{
                    compteurDePlayer++;
                }
                if(compteurDePlayer === 4){
                    retour = true;
                }
            })
            compteurDePlayer = 0;
        })
        


        return retour
    }

    isvictory(numberIndex){
        return this.isVictoryRow(numberIndex) || this.isVictoryCollum(numberIndex) || this.isVictoryDiagonal()
    }

    isMatchNull(){
        if(this._currentTurn === 43){
            return true
        }
        return false 
    }


    reset(){
        this._currentPlayer = 1;
        this._currentTurn = 1;
        this._cells = [];
        let counter = 0;
        for (let index = 0; index < 6; index++) {
            
            let array = new Array;
            for (let j = 0; j < 7; j++) {
                array.push(new Cell(counter));
                counter++;
            }
            this._cells.push(array);
        }
    }

    findCellPlayableByCollum(collum){
        for (let i = 0; i < 6; i++) {
            //console.log(`coord${i} :${collum}  `,this._cells[i][collum])
            
            if(this._cells[i][collum].getPlayer() !== 0){
                //console.log("lol")
                if(i === 0){
                    return -1
                }
                let iRetour = i-1
                return coordToIndex({x:collum, y:iRetour})
            }            
        }



        return coordToIndex({x:collum, y:5})
    }

    play(collum){
        let nbcell = this.findCellPlayableByCollum(collum)
        //console.log(nbcell)
        if(nbcell === -1){
            //ne rien faire
            return {newCurrentPlayer:this._currentPlayer,victore:false,matchNull:this.isMatchNull()}
        }
        else{
            //l'ordre des instruction est important pas a modifier.
            //console.log(nbcell)
            this.modifCell(nbcell);
            let victoire = this.isvictory(nbcell);
            let matchNull = this.isMatchNull();
            this.changePlayer();
            this._currentTurn = this._currentTurn + 1;
            return {newCurrentPlayer:this._currentPlayer,victore:victoire,matchNull:matchNull}
        }

    }

 
}
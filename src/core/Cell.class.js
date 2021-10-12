export default class Cell{
    /**
     * @integer
     */
    _player;

    /**
     * @integer
     */
    _caseNumber


    constructor(caseNumber){
        if(caseNumber >= 0 && caseNumber <= 41){
            this._caseNumber = caseNumber;
        }else{
            throw new Error("casenumber value inccorect je recois:" +caseNumber )
        }


        this._player = 0;
    }

    getPlayer(){
        return this._player;
    }

    setPlayer(player){
        if(player === 1 || player === 2){
            this._player = player
        }
        else{
            throw new Error("value incorrect")
        } 
    }
}
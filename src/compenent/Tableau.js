import React, { useState, useEffect } from 'react';
import Game from '../core/Game.class';
const Tableau = ()=>{
    const [game,setgame]= useState(new Game)
    const [etatgame,setetatgame]= useState({ newCurrentPlayer: 1, victore: false, matchNull: false })
    const [player1,setplayer1] = useState("blue")
    const [player2,setplayer2] = useState('yellow')
    
    
    const clickPlay = collum=>{
        if(!etatgame.victore){
        setetatgame(game.play(collum))
        //console.log('_currentTurn',game._currentTurn)
        //console.log(etatgame)
        }
    }


    const affichagecurrentplayer = ()=>{
        if(!etatgame.victore){ 
            return 'joueur ' + (etatgame.newCurrentPlayer === 1 ?  player1 : player2) 
        } 
    } 

    const reset = ()=>{
        game.reset()
        setetatgame({ newCurrentPlayer: 1, victore: false, matchNull: false })
    }

    return <div>
            <table>
                {game._cells.map(array=> (
                    <tr>
                        {array.map((cell,index)=>{let color= "white";
                        if(cell.getPlayer() == 1){
                            color = player1
                        }
                        else if(cell.getPlayer() == 2){
                            color = player2
                        }
                        return (
                        <td>
                            <button className="cell"  style={{backgroundColor:color}} onClick={()=>{clickPlay(index)}}>css</button>
                        </td>)})}
                    </tr>
                ))}
            </table>
            <div>
                 {affichagecurrentplayer()}
            </div>
            <div>
            {
               etatgame.victore ? `🎊victoire de ${(etatgame.newCurrentPlayer  % 2 + 1) === 1 ? player1 : player2}🎊` : ''
            }
            </div>
            <button onClick={()=>{reset()}}>recommencer </button>
    </div>

}

export default Tableau;
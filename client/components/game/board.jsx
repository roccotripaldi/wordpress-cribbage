/**
 * External Dependencies
 */
import React, { Component } from 'react';
/**
 * Internal Dependencies
 */
import { imageDir } from '../constants';

class Board extends Component {
    render() {
        const boardSrc = imageDir + 'board.gif',
            pegPlayerSrc = imageDir + 'peg-player.gif',
            pegOpponentSrc = imageDir + 'peg-opponent.gif';
        return (
            <div className="board">
                <img src={ boardSrc } width="700" />
                <img className="peg player first pos-0" src={ pegPlayerSrc } />
                <img className="peg player second pos-0" src={ pegPlayerSrc } />
                <img className="peg opponent first pos-0" src={ pegOpponentSrc } />
                <img className="peg opponent second pos-0" src={ pegOpponentSrc } />
            </div>
        );
    }
}

export default Board;
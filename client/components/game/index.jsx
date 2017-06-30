/**
 * External Dependencies
 */
import React, { Component } from 'react';
/**
 * Internal Dependencies
 */
import Board from './board';
import Deck from "./deck";

class Game extends Component {
    render() {
        return (
            <div className="game">
                <Board />
                <Deck />
            </div>
        )
    }
}

export default Game;
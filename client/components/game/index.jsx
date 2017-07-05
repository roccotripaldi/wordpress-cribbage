/**
 * External Dependencies
 */
import React, { Component } from 'react';
/**
 * Internal Dependencies
 */
import Board from './board';
import Deck from "./deck";
import ScoreSummary from './score-summary';

class Game extends Component {
    render() {
        return (
            <div className="game">
                <Board />
                <Deck />
                <ScoreSummary />
            </div>
        )
    }
}

export default Game;
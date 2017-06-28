/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
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

export default connect()( Game );
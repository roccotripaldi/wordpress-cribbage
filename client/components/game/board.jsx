/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
/**
 * Internal Dependencies
 */
import { imageDir } from '../constants';

class Board extends Component {
    render() {
        const boardSrc = imageDir + 'board.gif';
        return (
            <div className="board">
                <img src={ boardSrc } width="700" />
            </div>
        );
    }
}

export default Board;
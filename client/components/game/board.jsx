/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
 */
import { imageDir } from '../constants';
import { getPegPositions } from 'state/selectors/board';
import { pegMatrix } from './peg-matrix';

class Board extends Component {
    getPosition( player, peg ) {
        const position = ( 'Opponent' === player ) ? this.props.positions.Opponent[ peg ] : this.props.positions.Player[ peg ],
            style = { top: 0, left: 0 }
        if ( -1 === position ) {
            style.left = 34;
            style.top = ( 'Opponent' === player ) ? 3 : 24;
        } else {
            const matrixPosition = pegMatrix[ player ][ position ];
            style.left = matrixPosition[0];
            style.top = matrixPosition[1];
        }
        return style;
    }

    render() {
        const boardSrc = imageDir + 'board.gif',
            pegPlayerSrc = imageDir + 'peg-player.gif',
            pegOpponentSrc = imageDir + 'peg-opponent.gif';
        return (
            <div className="board">
                <img src={ boardSrc } width="700" />
                <span
                    className="peg peg0 player"
                    style={ this.getPosition( 'Player', 0 ) }
                />
                <span
                    className="peg peg1 player"
                    style={ this.getPosition( 'Player', 1 ) }
                />
                <span
                    className="peg peg0 opponent"
                    style={ this.getPosition( 'Opponent', 0 ) }
                />
                <span
                    className="peg peg1 opponent"
                    style={ this.getPosition( 'Opponent', 1 ) }
                />
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            positions: getPegPositions( state )
        }
    }
)( Board );
/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
/**
 * Internal Dependencies
 */
import Board from './board';
import Deck from "./deck";
import PeggingCards from './pegging-cards';
import { getPeggingCards, isPegging } from 'state/selectors/game';
import { getPlayer, getOpponent } from 'state/selectors/players';

class Game extends Component {

    renderPeggingCards() {
        if ( ! this.props.pegging ) {
            return null;
        }
        return <PeggingCards />;
    }

    renderDeck() {
        return <Deck />;
    }

    render() {
        return (
            <div className="game">
                <Board />
                { this.renderPeggingCards() }
                { this.renderDeck() }
            </div>
        );
    }
}
export default connect(
    state => {
        return {
            peggingCards: getPeggingCards( state ),
            player: getPlayer( state ),
            opponent: getOpponent( state ),
            pegging: isPegging( state )
        }
    }
)( Game );
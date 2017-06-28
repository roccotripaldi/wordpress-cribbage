/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
/**
 * Internal Dependecies
 */
import { buildCard } from 'lib/deck';
import Card from 'components/game/card';

class Hand extends Component {
    render() {
        const classes = classNames( [ this.props.type, 'hand' ] ),
            card1 = buildCard( 'Ace', 'Spades' ),
            card2 = buildCard( 'King', 'Spades' ),
            card3 = buildCard( 'Queen', 'Spades' ),
            card4 = buildCard( 'Jack', 'Spades' ),
            card5 = buildCard( '10', 'Spades' ),
            card6 = buildCard( '9', 'Spades' ),
            label = ( this.props.type === 'opponent' ) ? "Opponent's Hand" : "Player's Hand";

        return (
            <div className={ classes }>
                <p>{ label }</p>
                <Card card={card1} faceDown={ this.props.isOpponent } />
                <Card card={card2} faceDown={ this.props.isOpponent } />
                <Card card={card3} faceDown={ this.props.isOpponent } />
                <Card card={card4} faceDown={ this.props.isOpponent } />
                <Card card={card5} faceDown={ this.props.isOpponent } />
                <Card card={card6} faceDown={ this.props.isOpponent } />
            </div>
        );
    }
}

Hand.propTypes = {
    type: PropTypes.string
};

export default connect()( Hand );
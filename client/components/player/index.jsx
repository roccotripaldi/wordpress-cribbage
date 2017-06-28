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

class Player extends Component {
    render() {
        const classes = classNames( { opponent: this.props.isOpponent, player: true } ),
            card1 = buildCard( 'Ace', 'Spades' ),
            card2 = buildCard( 'King', 'Spades' ),
            card3 = buildCard( 'Queen', 'Spades' ),
            card4 = buildCard( 'Jack', 'Spades' ),
            card5 = buildCard( '10', 'Spades' ),
            card6 = buildCard( '9', 'Spades' ),
            label = ( this.props.isOpponent ) ? "Opponent's Hand" : "Player's Hand";

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

Player.propTypes = {
    isOpponent: PropTypes.bool
};

export default connect()( Player );
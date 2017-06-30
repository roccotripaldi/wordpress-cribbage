/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
/**
 * Internal Dependecies
 */
import Card from 'components/game/card';
import { getPlayer, getOpponent } from 'state/selectors/players';

class Hand extends Component {
    renderLabel() {
        const { hand, initialDraw } = this.props.player;
        let label;
        if( isEmpty( hand ) && isEmpty( initialDraw ) ) {
            return null;
        }
        label = isEmpty( hand ) ? 'Initial Draw' : this.props.type + "'s hand:";
        return <p>{ label }</p>;
    }

    renderCards() {
        const { hand, initialDraw } = this.props.player;
        let cards, faceDown;
        if( isEmpty( hand ) && isEmpty( initialDraw ) ) {
            return null;
        }
        cards = isEmpty( hand ) ? initialDraw : hand;
        if ( isEmpty( hand ) ) {
            faceDown = false;
        } else if ( 'Opponent' === this.props.type ) {
            faceDown = true;
        } else {
            faceDown = false;
        }
        return (
            <div className="cards">
                { cards.map( card => (
                    <Card key={ card.name + card.suit } card={ card } faceDown={ faceDown } />
                ) ) }
            </div>
        );
    }

    render() {
        const classes = classNames( [ this.props.type, 'hand' ] );

        return (
            <div className={ classes }>
                { this.renderLabel() }
                { this.renderCards() }
            </div>
        );
    }
}

Hand.propTypes = {
    type: PropTypes.string
};

export default connect(
    ( state, ownProps ) => {
        return {
            player: ( ownProps.type === "Opponent" ) ? getOpponent( state ) : getPlayer( state )
        }
    }
)( Hand );
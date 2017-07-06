/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import difference from 'lodash/difference';
/**
 * Internal Dependecies
 */
import Card from 'components/game/card';
import Button from 'components/ui/button';
import { getPlayer, getOpponent } from 'state/selectors/players';
import { getNextAppointment, isPaused } from 'state/selectors/controller';
import { playerDiscards } from 'state/actions/player';
import { getDealer, getScore } from 'state/selectors/game';

class Hand extends Component {
    constructor( props ) {
        super( props );
        this.state = { selectedCards: [] };
    }

    componentDidUpdate() {
        if ( this.props.player.hand.length === 0 && this.state.selectedCards.length === 2 ) {
            // Fixes a bug that shows the discard button after game is reset.
            this.setState( { selectedCards: [] } );
        }
    }

    isCribFaceDown() {
        return (
            this.props.nextAppointment !== 'gameComplete' &&
            isEmpty( this.props.cribScores )
        );
    }

    isHandFaceDown() {
        return (
            'Opponent' === this.props.type &&
            isEmpty( this.props.playerScores ) &&
            this.props.nextAppointment !== 'gameComplete' &&
            ! isEmpty( this.props.player.hand )
        );
    }

    handleClick = ( event ) => {
        const index = parseInt( event.target.getAttribute( 'data-index' ) ),
            { selectedCards } = this.state;
        event.preventDefault();
        if ( selectedCards.includes( index ) ) {
            const newArray = difference( selectedCards, [ index ] );
            this.setState( { selectedCards: newArray } );
        } else if ( selectedCards.length < 2 ) {
            const newArray = selectedCards.slice();
            newArray.push( index );
            this.setState( { selectedCards: newArray } );
        }
    };

    handleDiscard = ( event ) => {
        event.preventDefault();
        if ( ! this.props.paused ) {
            const cards = this.state.selectedCards.map( ( index ) => {
                return this.props.player.hand[ index ];
            } );
            this.props.playerDiscards(
                cards,
                this.state.selectedCards,
                this.props.dealer
            );
            this.setState( { selectedCards: [] } );
        }
    };

    renderCrib() {
        const { crib } = this.props.player;

        if ( this.props.dealer !== this.props.type ) {
            return null;
        }

        return (
            <div className="crib">
                <div className="crib__cards">
                    { crib.map( ( card, index ) => {
                        return (
                            <Card
                                key={ card.name + card.suit }
                                card={ card }
                                faceDown={ this.isCribFaceDown() }
                                index={ index }
                            />
                        )
                    } ) }
                </div>
            </div>
        );
    }

    renderLabel() {
        const { hand, initialDraw } = this.props.player;
        let label, person;
        if( isEmpty( hand ) && isEmpty( initialDraw ) ) {
            return null;
        }
        person = ( this.props.type === 'Player' ) ? 'Your' : "Opponent's"
        label = isEmpty( hand ) ? 'Initial Draw' : person + ' hand:';
        return <p>{ label }</p>;
    }

    renderCards() {
        const { hand, initialDraw } = this.props.player;
        let cards, onClick = null, selected = false;
        if( isEmpty( hand ) && isEmpty( initialDraw ) ) {
            return null;
        }
        cards = isEmpty( hand ) ? initialDraw : hand;

        if (
            'Player' === this.props.type &&
            'playerDiscards' === this.props.nextAppointment &&
            ! this.props.paused
        ) {
            onClick = this.handleClick;
        }
        return (
            <div className="cards">
                { cards.map( ( card, index ) => {
                    const selected = this.state.selectedCards.includes( index );
                    return (
                        <Card
                            key={ card.name + card.suit }
                            card={ card }
                            faceDown={ this.isHandFaceDown() }
                            onClick={ onClick }
                            index={ index }
                            selected={ selected }
                        />
                    )
                } ) }
            </div>
        );
    }

    renderDiscardButton() {
        if ( this.state.selectedCards.length < 2 || this.props.type === 'Opponent' ) {
            return null;
        }
        return <Button onClick={ this.handleDiscard }>Send Cards To Crib</Button>;
    }

    render() {
        const classes = classNames( [ this.props.type, 'hand' ] );

        return (
            <div className={ classes }>
                { this.renderLabel() }
                { this.renderCards() }
                { this.renderCrib() }
                { this.renderDiscardButton() }
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
            player: ( ownProps.type === "Opponent" ) ? getOpponent( state ) : getPlayer( state ),
            nextAppointment: getNextAppointment( state ),
            paused: isPaused( state ),
            dealer: getDealer( state ),
            playerScores: ( ownProps.type === "Opponent" ) ? getScore( state, 'opponentsHandScore' ) : getScore( state, 'playersHandScore' ),
            cribScores: getScore( state, 'cribScore' )
        }
    },
    { playerDiscards }
)( Hand );
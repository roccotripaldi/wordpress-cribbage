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
import Card from 'components/ui/card';
import Button from 'components/ui/button';
import { getPlayer, getOpponent } from 'state/selectors/players';
import { getNextAppointment, isPaused } from 'state/selectors/controller';
import { playerDiscards, playerPlays } from 'state/actions/player';
import { getDealer, getScore, getPlaySequence, getPeggingCards, canPersonPlay } from 'state/selectors/game';
import { getLowestPegForPerson } from 'state/selectors/board';
import { getPlayValue } from "../../state/selectors/game";

class Hand extends Component {
    constructor( props ) {
        super( props );
        this.state = { selectedCards: [], selectedPlayCard: -1 };
    }

    componentDidUpdate() {
        if (
            this.props.player.hand.length === 0 &&
            ( this.state.selectedCards.length === 2 || this.state.selectedPlayCard > -1 )
        ) {
            // Fixes a bug that shows play buttons after game is reset.
            this.setState( { selectedCards: [], selectedPlayCard: -1 } );
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

    handleDiscardClick = ( event ) => {
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

    handlePlayClick = ( event ) => {
        const index = parseInt( event.target.getAttribute( 'data-index' ) ),
            { selectedPlayCard } = this.state;
        event.preventDefault();
        if ( selectedPlayCard === index ) {
            this.setState( { selectedPlayCard: -1 } );
        } else if ( selectedPlayCard === -1 ) {
            this.setState( { selectedPlayCard: index } );
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

    handlePlay = ( event ) => {
        event.preventDefault();
        const card = this.props.player.peggingHand[ this.state.selectedPlayCard ];
        this.setState( { selectedPlayCard: -1 } );
        this.props.playerPlays(
            this.props.sequence,
            card,
            this.props.playersLowestPeg
        );
    };

    cardIsClickable( selected, card ) {
        if ( this.props.paused ) {
            return false;
        } else if ( selected ) {
            return true;
        } else if (
            'Player' === this.props.type &&
            'playerPlays' === this.props.nextAppointment &&
            this.state.selectedPlayCard === -1 &&
            this.props.playerCanPlay &&
            ( card.value + this.props.playValue <= 31 )
        ) {
            return true;
        } else if (
            'Player' === this.props.type &&
            'playerDiscards' === this.props.nextAppointment &&
            this.state.selectedCards.length < 2
        ) {
            return true;
        }
        return false;
    }

    getOnClick( clickable ) {
        if ( ! clickable ) {
            return null;
        }
        if (
            'Player' === this.props.type &&
            'playerDiscards' === this.props.nextAppointment &&
            ! this.props.paused
        ) {
            return this.handleDiscardClick;
        } else if (
            'Player' === this.props.type &&
            'playerPlays' === this.props.nextAppointment &&
            ! this.props.paused &&
            this.props.playerCanPlay
        ) {
            return this.handlePlayClick;
        }
        return null;
    }

    renderCrib() {
        const { crib } = this.props.player;

        if ( this.props.dealer !== this.props.type ) {
            return null;
        }

        return (
            <div className="crib indentation">
                <div className="crib__cards indentation-inner">
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
        person = ( this.props.type === 'Player' ) ? 'Your' : "Opponent's";
        label = isEmpty( hand ) ? 'Initial Draw' : person + ' hand:';
        return <p>{ label }</p>;
    }

    renderCards() {
        const { hand, initialDraw, peggingHand } = this.props.player;
        let cards;
        
        if( isEmpty( hand ) && isEmpty( initialDraw ) ) {
            return null;
        }

        if( isEmpty( hand ) ) {
            cards = initialDraw;
        } else if ( ! isEmpty( peggingHand ) || ! isEmpty( this.props.peggingCards ) ) {
            cards = peggingHand;
        } else {
            cards = hand;
        }

        return (
            <div className="cards">
                { cards.map( ( card, index ) => {
                    const selected = this.state.selectedCards.includes( index ) ||
                        this.state.selectedPlayCard === index,
                        clickable = this.cardIsClickable( selected, card ),
                        onClick = this.getOnClick( clickable );
                    return (
                        <Card
                            key={ card.name + card.suit }
                            card={ card }
                            faceDown={ this.isHandFaceDown() }
                            onClick={ onClick }
                            index={ index }
                            selected={ selected }
                            clickable={ clickable }
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
        return( <Button onClick={ this.handleDiscard } id="discard-button">Send Cards To Crib</Button> );
    }

    renderPlayButton() {
        if ( this.state.selectedPlayCard === -1 || this.props.type === 'Opponent' ) {
            return null;
        }
        return( <Button onClick={ this.handlePlay } id="play-button">Play Card</Button> );
    }

    render() {
        const classes = classNames( [ this.props.type, 'hand' ] );

        return (
            <div className={ classes }>
                { this.renderLabel() }
                { this.renderCards() }
                { this.renderCrib() }
                { this.renderDiscardButton() }
                { this.renderPlayButton() }
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
            cribScores: getScore( state, 'cribScore' ),
            sequence: getPlaySequence( state ),
            playersLowestPeg: getLowestPegForPerson( state, 'Player' ),
            peggingCards: getPeggingCards( state ),
            playerCanPlay: canPersonPlay( state, 'player' ),
            playValue: getPlayValue( state )
        }
    },
    { playerDiscards, playerPlays }
)( Hand );
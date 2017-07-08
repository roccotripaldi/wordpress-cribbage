/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
 */
import Card from 'components/ui/card';
import Banner from 'components/ui/banner';
import Button from 'components/ui/button';
import CardSymbol from 'components/ui/card-symbol';
import { getNextAppointment, isPaused } from 'state/selectors/controller';
import { getDealer, getCutCard, getScore } from 'state/selectors/game';
import { getPlayer, getOpponent } from 'state/selectors/players';
import { getLowestPegForPerson } from 'state/selectors/board';
import { acceptScore } from 'state/actions/player';

const summaryAppointments = [
    'playerAcceptsOwnScore',
    'playerAcceptsOpponentsScore',
    'playerAcceptsCribScore'
];

class ScoreSummary extends Component {
    approveScore = ( event ) => {
        let pegIndex = this.props.playersLowestPeg;
        event.preventDefault();
        if ( this.props.paused ) {
            return;
        }
        if (
            'playerAcceptsOpponentsScore' === this.props.nextAppointment ||
            ( 'playerAcceptsCribScore' === this.props.nextAppointment && this.props.dealer === 'Opponent' )
        ) {
            pegIndex = this.props.opponentsLowestPeg;
        }
        this.props.acceptScore(
            this.props.scores.score,
            this.props.nextAppointment,
            this.props.dealer,
            pegIndex
        );
    };

    getLabel() {
        switch ( this.props.nextAppointment ) {
            case 'playerAcceptsOwnScore':
                return 'Score Summary for Your Hand:';
            case 'playerAcceptsOpponentsScore':
                return 'Score Summary for Opponent\'s Hand:';
            case 'playerAcceptsCribScore':
                const person = ( this.props.dealer === 'Player' ) ? 'Your' : 'Opponent\'s';
                return 'Score Summary for ' + person + ' Crib:';
        }
    }

    renderCardCombination = ( combination, index ) => {
        return (
            <li key={ index }><a>
                { combination.map( ( card, cardIndex ) => {
                    return (
                        <CardSymbol card={ card } key={ cardIndex } />
                    );
                })}
            </a></li>
        )
    };

    renderFifteensScore() {
        const { fifteens } = this.props.scores;
        if ( fifteens.score === 0 ) {
            return null;
        }
        return(
            <div>
                <p>Fifteens: { fifteens.score } points</p>
                <ul>
                { fifteens.cards.map( this.renderCardCombination ) }
                </ul>
            </div>
        );
    }

    renderPairScore() {
        const { pairs } = this.props.scores;
        if ( pairs.score === 0 ) {
            return null;
        }
        return(
            <div>
                <p>Pairs: { pairs.score } points</p>
                <ul>
                { pairs.cards.map( this.renderCardCombination ) }
                </ul>
            </div>
        );
    }

    renderRunScore() {
        const { runs } = this.props.scores;
        if ( runs.score === 0 ) {
            return null;
        }
        return(
            <div>
                <p>Runs: { runs.score } points</p>
                <ul>
                { runs.cards.map( this.renderCardCombination ) }
                </ul>
            </div>
        );
    }

    renderRightJackScore() {
        const { rightJack } = this.props.scores;
        return ( rightJack === 0 ) ? null : <p>Right Jack: 1 point</p>;
    }

    renderFlushScore() {
        const { flush } = this.props.scores;
        return ( flush === 0 ) ? null : <p>Flush: { flush } points</p>;
    }

    renderTotalScore() {
        const { score } = this.props.scores;
        return ( score === 0 ) ? null : <p className="total">Total: { score } points</p>;
    }

    renderScores() {
        const { score } = this.props.scores;
        if ( score === 0 ) {
            return <p>No score!</p>;
        }
        return (
            <div>
                { this.renderFifteensScore() }
                { this.renderPairScore() }
                { this.renderRunScore() }
                { this.renderRightJackScore() }
                { this.renderFlushScore() }
                { this.renderTotalScore() }
            </div>
        );
    }

    render() {
        if ( ! summaryAppointments.includes( this.props.nextAppointment ) ) {
            return null;
        }
        return (
            <div className="summary">
                <div className="summary__inner1">
                    <Banner label={ this.getLabel() } />
                    <div className="scores inner3">
                        <div className="inner4">
                            <p className="heading">Score Breakdown:</p>
                            { this.renderScores() }
                        </div>
                    </div>
                    <div className="cards inner3">
                        <div className="inner4">
                            <p>Cards:</p>{
                            this.props.cards.map( ( card, index ) => {
                                return (
                                    <Card
                                        key={ card.name + card.suit }
                                        card={ card }
                                        index={ index }
                                    />
                                );
                            } ) }
                            <p>Cut Card:</p>
                            <Card
                                card={ this.props.cutCard }
                                index={ 4 }
                            />
                        </div>
                    </div>
                    <Button onClick={ this.approveScore }>Ok</Button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        let cards = null, scores = null;
        const nextAppointment = getNextAppointment( state ),
            dealer = getDealer( state );
        if ( 'playerAcceptsOwnScore' === nextAppointment ) {
            cards = getPlayer( state ).hand;
            scores = getScore( state, 'playersHandScore' );
        } else if ( 'playerAcceptsOpponentsScore' === nextAppointment ) {
            cards = getOpponent( state ).hand;
            scores = getScore( state, 'opponentsHandScore' );
        } else if ( 'playerAcceptsCribScore' === nextAppointment ) {
            cards = ( 'Player' === dealer ) ? getPlayer( state ).crib : getOpponent( state ).crib;
            scores = getScore( state, 'cribScore' );
        }
        return {
            nextAppointment,
            cards,
            dealer,
            scores,
            playersLowestPeg: getLowestPegForPerson( state, 'Player' ),
            opponentsLowestPeg: getLowestPegForPerson( state, 'Opponent' ),
            cutCard: getCutCard( state ),
            paused: isPaused( state )
        }
    },
    { acceptScore }
)( ScoreSummary );
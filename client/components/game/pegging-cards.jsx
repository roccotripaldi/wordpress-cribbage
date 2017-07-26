/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
 */
import Card from 'components/ui/card';
import { getPeggingCards } from 'state/selectors/game';

class PeggingCards extends Component {

    renderCard = ( card, index ) => {
        if ( ! card ) {
            return ( <Card key={ 'pegging-' + index } faceDown={ true } index={ index } /> );
        }
        return ( <Card key={ 'pegging-' + card.name + card.suit } card={ card } index={ index } /> );
    };

    render() {
        const cards = this.props.peggingCards.slice( 0 ).reverse();
        return (
            <div className="pegging-cards indentation">
                <div className="indentation-inner">
                    { cards.map( this.renderCard ) }
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            peggingCards: getPeggingCards( state )
        }
    }
)( PeggingCards );
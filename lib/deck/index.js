import { findIndex, isEmpty } from 'lodash';

export default class Deck {
    constructor() {
        this.cards = [];
        this.suits = [ 'Clubs', 'Diamonds', 'Hearts', 'Spades' ];
        this.names = [ 'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King' ];
    }

    getCardValueByName( name ) {
        switch ( name ) {
            case 'Jack':
            case 'Queen':
            case 'King':
                return 10;
            default:
                return this.names.indexOf( name ) + 1;
        }
    }

    buildCard( name, suitNameOrValue ) {
        let suit, suitValue;
        if( -1 === this.names.indexOf( name ) ) {
            return null;
        }
        if ( this.suits[ suitNameOrValue ] ) {
            suitValue = suitNameOrValue;
            suit = this.suits[ suitValue ];
        } else if ( this.suits.indexOf( suitNameOrValue ) > -1 ) {
            suit = suitNameOrValue;
            suitValue = this.suits.indexOf( suit );
        } else {
            return null;
        }
        return {
            name,
            suitValue,
            suit,
            value: this.getCardValueByName( name ),
            sequence : this.names.indexOf( name )
        }
    }
    
    getCard( card = null ) {
        if( isEmpty( this.cards ) ) {
            return null;
        }
        
        if ( ! card ) {
            return this.cards.shift();
        }

        const cardIndex = findIndex( this.cards, ( c ) => {
            return ( c.name === card.name  && c.suit === card.suit );
        } );
        
        return cardIndex === -1 ?
            null :
            this.cards.splice( cardIndex, 1 )[0];
    }

    build() {
        this.cards = [];
        this.suits.forEach( ( suit, suitValue ) => {
            this.names.forEach( ( value ) => {
                this.cards.push( this.buildCard( value, suitValue, suit ) );
            } );
        } );
    }
}

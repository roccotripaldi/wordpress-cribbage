export const cardSuits = [ 'Clubs', 'Diamonds', 'Hearts', 'Spades' ];
export const cardNames = [ 'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King' ];

export const getCardValueByName = ( name ) => {
    switch ( name ) {
        case 'Jack':
        case 'Queen':
        case 'King':
            return 10;
        default:
            return cardNames.indexOf( name ) + 1;
    }
};

export const buildCard = ( name, suit ) => {
    let suitValue;
    if( -1 === cardNames.indexOf( name ) || -1 === cardSuits.indexOf( suit ) ) {
        return null;
    }
    suitValue = cardSuits.indexOf( suit );
    return {
        name,
        suitValue,
        suit,
        value: getCardValueByName( name ),
        sequence: cardNames.indexOf( name )
    }
};

export const buildDeck = () => {
    const deck = [];
    cardSuits.forEach( ( suit ) => {
        cardNames.forEach( ( value ) => {
            deck.push( buildCard( value, suit ) );
        } );
    } );
    return deck;
};

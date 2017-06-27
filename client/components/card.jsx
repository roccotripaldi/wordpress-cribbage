import React from 'react';

const imageDir = 'http://gamesfortheroad.com/wp-content/plugins/wp-cribbage/images/';

export default function( props ) {
    const { faceDown, card } = props,
        src = ( faceDown ) ?
            imageDir + 'card-back.gif' :
            imageDir + card.name + '-' + card.suit + '.gif';


    return <image src={ src } />;
};
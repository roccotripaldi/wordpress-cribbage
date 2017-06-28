/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';

/**
 * Internal Dependencies
 */
import { imageDir } from '../constants';

class Card extends Component {
    render() {
        const { faceDown, card } = this.props,
            src = ( faceDown ) ?
                imageDir + 'card-back.gif' :
                imageDir + card.name + '-' + card.suit + '.gif';


        return <img src={ src } />;
    }
}

Card.propTypes = {
    faceDown: PropTypes.bool,
    card: PropTypes.object
};

export default Card;
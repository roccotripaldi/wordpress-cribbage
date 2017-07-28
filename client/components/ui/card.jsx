/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';


/**
 * Internal Dependencies
 */
import { imageDir } from '../constants';

class Card extends Component {
    render() {
        const { faceDown, card } = this.props,
            src = ( faceDown ) ?
                imageDir + 'card-back.png' :
                imageDir + card.name + '-' + card.suit + '.gif',
            classes = classNames( {
                selected: this.props.selected,
                [ 'card' + this.props.index ]: true,
                clickable: this.props.clickable,
                'facedown': this.props.faceDown
            } );


        return <img
            src={ src }
            onClick={ this.props.onClick }
            data-index={ this.props.index }
            className={ classes }
            style={ this.props.style }
        />;
    }
}

Card.propTypes = {
    faceDown: PropTypes.bool,
    card: PropTypes.object,
    onClick: PropTypes.func,
    index: PropTypes.number,
    selected: PropTypes.bool
};

export default Card;
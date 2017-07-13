/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';

class CardSymbol extends Component {
    getSuitSymbol( suit ) {
        let symbol, color;
        switch ( suit ) {
            case 'Hearts':
                color = 'red';
                symbol = '♥';
                break;
            case 'Spades':
                color = 'black';
                symbol = '♠';
                break;
            case 'Clubs':
                color = 'black';
                symbol = '♣';
                break;
            case 'Diamonds':
                color = 'red';
                symbol = '♦';
                break;
        }
        return <span className={ color }>{ symbol }</span>;
    }

    getNameSymbol( name ) {
        switch ( name ) {
            case 'Queen':
            case 'King':
            case 'Jack':
            case 'Ace':
                return name.substr( 0, 1 );
            default:
                return name;
        }
    }

    render() {
        const { card } = this.props;
        return (
            <span className="card-symbol">
                { this.getNameSymbol( card.name ) }
                { this.getSuitSymbol( card.suit ) }
            </span>
        );
    }
}

CardSymbol.propTypes = {
    card: PropTypes.object
};

export default CardSymbol;
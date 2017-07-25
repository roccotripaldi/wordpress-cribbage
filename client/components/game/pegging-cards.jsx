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
    render() {
        return (
            <div className="pegging-cards indentation">
                <div className="indentation-inner">
                    play
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
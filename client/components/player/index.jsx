import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
    render() {
        return <p>Player</p>;
    }
}

Player.propTypes = {
    isOpponent: PropTypes.bool
};

export default connect()( Player );
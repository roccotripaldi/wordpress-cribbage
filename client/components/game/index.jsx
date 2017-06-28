import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
    render() {
        return <p>Game</p>;
    }
}

export default connect()( Game );
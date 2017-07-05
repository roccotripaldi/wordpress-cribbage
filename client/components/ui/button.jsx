/**
 * External Dependencies
 */
import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <a { ...this.props } className="button">
                <span className="button__inner">
                    { this.props.children }
                </span>
            </a>
        );
    }
}

export default Button;
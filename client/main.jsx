import React from 'react';
/*
 * Internal Dependencies
 */
import Hand from 'components/hand';
import Game from 'components/game';
import Menu from 'components/menu/';

let Main = () => {
    return(
        <div className="cribbage">
            <Menu />
            <Hand type="opponent" />
            <Game />
            <Hand type="player" />
        </div>
    );
};

export default Main;

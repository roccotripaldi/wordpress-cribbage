import React from 'react';
/*
 * Internal Dependencies
 */
import Player from 'components/player';
import Game from 'components/game';
import Menu from 'components/menu/';

let Main = () => {
    return(
        <div className="cribbage">
            <Menu />
            <Player isOpponent />
            <Game />
            <Player />
        </div>
    );
};

export default Main;

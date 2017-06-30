import React from 'react';
/*
 * Internal Dependencies
 */
import Hand from 'components/hand';
import Game from 'components/game';
import Menu from 'components/menu/';
import Controller from 'components/controller';

let Main = () => {
    return(
        <div className="cribbage">
            <Menu />
            <Controller />
            <Hand type="Opponent" />
            <Game />
            <Hand type="Player" />
        </div>
    );
};

export default Main;

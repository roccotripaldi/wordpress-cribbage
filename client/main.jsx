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
            <div className="cribbage__inner1">
                <Menu />
                <div className="play-area">
                    <div className="play-area__inner1">
                        <div className="play-area__inner2">
                            <div className="play-area__inner3">
                                <Controller />
                                <Hand type="Opponent" />
                                <Game />
                                <Hand type="Player" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;

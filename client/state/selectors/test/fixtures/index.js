import { defaultState as game } from '../../../reducers/game';
import { defaultState as board } from '../../../reducers/board';
import { defaultState as controller } from '../../../reducers/controller';
import { defaultState as players } from '../../../reducers/players';

export const defaultState = { game, board, controller, players };

export const initializedState = {
    game: {
        deck: [1,2,3]
    }
};
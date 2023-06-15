import { CharacterService } from '../services/CharacterService';
import { store } from '../stores/store';
import { setCharacters } from '../stores/character.slice';

const CharacterRequest = () => {
    CharacterService.getAll().then((res) => {
        //const charStore = store.getState().characters

        if (res instanceof Error) return console.log(res.message);
        store.dispatch(setCharacters(res));
    });
};

export default CharacterRequest;

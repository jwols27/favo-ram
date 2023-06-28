import { CharacterService } from '../services/CharacterService';
import { store } from '../stores/store';
import { setCharacterLoading, setCharacters } from '../stores/character.slice';

const CharacterRequest = async () => {
    store.dispatch(setCharacterLoading(true));

    const res = await CharacterService.getAll();
    res instanceof Error
        ? console.log(res.message)
        : store.dispatch(setCharacters(res));

    store.dispatch(setCharacterLoading(false));
};

export default CharacterRequest;

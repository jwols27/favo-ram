import { OriginService } from '../services/OriginService';
import { store } from '../stores/store';
import { setOrigins } from '../stores/origin.slice';

const CharacterRequest = () => {
    OriginService.getAll().then((res) => {
        if (res instanceof Error) return console.log(res.message);
        store.dispatch(setOrigins(res));
    });
};

export default CharacterRequest;

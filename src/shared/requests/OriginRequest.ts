import { OriginService } from '../services/OriginService';
import { store } from '../stores/store';
import { setOriginLoading, setOrigins } from '../stores/origin.slice';

const CharacterRequest = async () => {
    store.dispatch(setOriginLoading(true));

    const res = await OriginService.getAll();
    res instanceof Error
        ? console.log(res.message)
        : store.dispatch(setOrigins(res));

    store.dispatch(setOriginLoading(false));
};

export default CharacterRequest;

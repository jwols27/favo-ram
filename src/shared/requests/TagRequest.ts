import { TagService } from '../services/TagService';
import { store } from '../stores/store';
import { setTagLoading, setTags } from '../stores/tag.slice';

const TagRequest = async () => {
    store.dispatch(setTagLoading(true));

    const res = await TagService.getAll();
    res instanceof Error
        ? console.log(res.message)
        : store.dispatch(setTags(res));

    store.dispatch(setTagLoading(false));
};

export default TagRequest;

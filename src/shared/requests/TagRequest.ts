import { TagService } from '../services/TagService';
import { store } from '../stores/store';
import { setTags } from '../stores/tag.slice';

const TagRequest = () => {
    TagService.getAll().then((res) => {
        if (res instanceof Error) return console.log(res.message);
        store.dispatch(setTags(res));
    });
};

export default TagRequest;

import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import { RouteObject } from 'react-router/dist/lib/context';
import HomeView from './templates/Home.view';
import TagsView from './templates/Tags.view';
import OriginsView from './templates/Origins.view';
import CharactersView from './templates/Characters.view';

const routerData: RouteObject[] = [
    //HOME
    {
        path: '',
        element: <HomeView />,
        // children: [
        //     {
        //         path: "",
        //         element: ,
        //     },
        // ]
    },
    //CHARACTERS
    {
        path: 'characters',
        element: <CharactersView />,
    },
    //ORIGINS
    {
        path: 'origins',
        element: <OriginsView />,
    },
    //TAGS
    {
        path: 'tags',
        element: <TagsView />,
    },
];

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <App>
                <Outlet />
            </App>
        ),
        children: routerData,
    },
]);

export default router;

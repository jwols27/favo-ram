import { createBrowserRouter, Outlet } from 'react-router-dom';
import { RouteObject } from 'react-router/dist/lib/context';

import App from './App';
import HomeView from './templates/Home.view';
import TagsView from './templates/Tags.view';
import OriginsView from './templates/Origins.view';
import CharactersView from './templates/Characters.view';
import NotFoundView from './templates/NotFound.view';
import EmporiumView from './templates/Emporium.view';

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
    //TAGS
    {
        path: 'emporium',
        element: <EmporiumView />,
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

    //TAGS
    {
        path: '*',
        element: <NotFoundView />,
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

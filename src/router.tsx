import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import { RouteObject } from 'react-router/dist/lib/context';
import HomeView from './pages/Home.view';

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

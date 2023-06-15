import ReactDOM from 'react-dom/client';
import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './router';
import { store } from './shared/stores/store';

import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);

import React from 'react';

import './App.css';

interface IAppProps {
    children: React.ReactNode;
}

const App = ({ children }: IAppProps) => {
    return children;
};

export default App;

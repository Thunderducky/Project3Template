import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider, MovieProvider } from './utils/GlobalStore';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <MovieProvider>
                <App />
            </MovieProvider>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

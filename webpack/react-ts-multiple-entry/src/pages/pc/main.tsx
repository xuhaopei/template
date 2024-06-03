import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './lang/react-i18next-config' 
import { AliveScope } from 'react-activation'
import router from './router';
ReactDOM.render(
    <AliveScope>{router}</AliveScope>, 
    document.getElementById('root')
);


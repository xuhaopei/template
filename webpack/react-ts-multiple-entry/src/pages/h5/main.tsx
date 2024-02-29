import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './lang/react-i18next-config' 
import { AliveScope } from 'react-activation'
ReactDOM.render(
    <AliveScope><App/></AliveScope>, 
    document.getElementById('root')
);


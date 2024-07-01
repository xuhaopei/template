import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import Main from 'src/components/index';

let html = renderToString(<Main></Main>)
console.log('html', html)


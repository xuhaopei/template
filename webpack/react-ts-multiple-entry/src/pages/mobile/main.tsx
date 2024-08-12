import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Index from './components/index';
import store from './store';
import { Provider } from "react-redux";
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}><Index/></Provider>);



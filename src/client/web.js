import 'core-js';
import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import App from './app';

loadableReady(() => {
    const app = document.getElementById('app');
    hydrate(<App />, app);
});

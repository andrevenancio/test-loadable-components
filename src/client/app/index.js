import React from 'react';
import loadable from '@loadable/component';

const TitleAsync = loadable(() =>
    import(/* webpackChunkName: "title" */ '../components/title')
);

const LoremIpsumAsync = loadable(() =>
    import(/* webpackChunkName: "lorem-ipsum" */ '../components/lorem-ipsum')
);

export default function App() {
    return (
        <div>
            <h1>test</h1>
            <TitleAsync />
            <LoremIpsumAsync />
        </div>
    );
}

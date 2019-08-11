import React from 'react';
import loadable from '@loadable/component';

const A = loadable(() =>
    import(/* webpackChunkName: "test-a" */ './letters/a')
);
const B = loadable(() => import('./letters/b'), { ssr: true });
const C = loadable(() => import('./letters/c'), {
    ssr: true,
    fallback: <p>preload c</p>,
});

export default function App() {
    return (
        <div>
            <h1>Test SSR and chunks</h1>
            <A />
            <B />
            <C />
        </div>
    );
}

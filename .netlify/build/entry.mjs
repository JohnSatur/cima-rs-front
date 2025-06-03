import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BpJSMV6l.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/about.astro.mjs');
const _page1 = () => import('./pages/blog.astro.mjs');
const _page2 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/cookies.astro.mjs');
const _page5 = () => import('./pages/privacy.astro.mjs');
const _page6 = () => import('./pages/properties/construction/_id_.astro.mjs');
const _page7 = () => import('./pages/properties/land/_id_.astro.mjs');
const _page8 = () => import('./pages/properties.astro.mjs');
const _page9 = () => import('./pages/test-construcciones.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/about.astro", _page0],
    ["src/pages/blog/index.astro", _page1],
    ["src/pages/blog/[...slug].astro", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/cookies.astro", _page4],
    ["src/pages/privacy.astro", _page5],
    ["src/pages/properties/construction/[id].astro", _page6],
    ["src/pages/properties/land/[id].astro", _page7],
    ["src/pages/properties/index.astro", _page8],
    ["src/pages/test-construcciones.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "4de85a39-e321-4628-bec1-d48d424ced4b"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

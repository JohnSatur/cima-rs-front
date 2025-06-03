import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_DcVXrGD6.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/","cacheDir":"file:///C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/node_modules/.astro/","outDir":"file:///C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/dist/","srcDir":"file:///C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/","publicDir":"file:///C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/public/","buildClientDir":"file:///C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/dist/","buildServerDir":"file:///C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"cookies/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cookies","isIndex":false,"type":"page","pattern":"^\\/cookies\\/?$","segments":[[{"content":"cookies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cookies.astro","pathname":"/cookies","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"properties/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/properties","isIndex":true,"type":"page","pattern":"^\\/properties\\/?$","segments":[[{"content":"properties","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/properties/index.astro","pathname":"/properties","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"test-construcciones/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/test-construcciones","isIndex":false,"type":"page","pattern":"^\\/test-construcciones\\/?$","segments":[[{"content":"test-construcciones","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/test-construcciones.astro","pathname":"/test-construcciones","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/test-construcciones.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/test-construcciones@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/cookies.astro",{"propagation":"none","containsHead":true}],["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/privacy.astro",{"propagation":"none","containsHead":true}],["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/properties/construction/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/properties/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/pages/properties/land/[id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/cookies@_@astro":"pages/cookies.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/properties/construction/[id]@_@astro":"pages/properties/construction/_id_.astro.mjs","\u0000@astro-page:src/pages/properties/land/[id]@_@astro":"pages/properties/land/_id_.astro.mjs","\u0000@astro-page:src/pages/properties/index@_@astro":"pages/properties.astro.mjs","\u0000@astro-page:src/pages/test-construcciones@_@astro":"pages/test-construcciones.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BpJSMV6l.mjs","C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DpMTpDL4.mjs","C:\\Users\\fasto\\OneDrive\\Documentos\\Repositorios\\cima-rs\\cima-rs-front\\.astro\\content-assets.mjs":"chunks/content-assets_PGeWNiND.mjs","C:\\Users\\fasto\\OneDrive\\Documentos\\Repositorios\\cima-rs\\cima-rs-front\\.astro\\content-modules.mjs":"chunks/content-modules_BdzgISKO.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_9VVRDZda.mjs","C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/content/posts/2025-02-21-post-1.mdx?astroPropagatedAssets":"chunks/2025-02-21-post-1_zUwkU6a0.mjs","C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/content/posts/2025-02-22-post-2.mdx?astroPropagatedAssets":"chunks/2025-02-22-post-2_CUMtS6aR.mjs","C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/content/posts/2025-02-23-post-3.mdx?astroPropagatedAssets":"chunks/2025-02-23-post-3_QCIvH3nI.mjs","C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/content/posts/2025-02-21-post-1.mdx":"chunks/2025-02-21-post-1_CaOMEjNo.mjs","C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/content/posts/2025-02-22-post-2.mdx":"chunks/2025-02-22-post-2_BLXWBARZ.mjs","C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/content/posts/2025-02-23-post-3.mdx":"chunks/2025-02-23-post-3_yyBWEVXZ.mjs","C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/components/sections/properties/PropertyGallerySection.astro?astro&type=script&index=0&lang.ts":"_astro/PropertyGallerySection.astro_astro_type_script_index_0_lang.QDPp-qbH.js","C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/components/layout/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.BCECQxf2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/fasto/OneDrive/Documentos/Repositorios/cima-rs/cima-rs-front/src/components/layout/Header.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"menuButton\"),n=document.getElementById(\"closeButton\"),e=document.getElementById(\"mobileMenu\");t?.addEventListener(\"click\",()=>{e?.classList.remove(\"translate-x-full\"),document.body.style.overflow=\"hidden\"});n?.addEventListener(\"click\",()=>{e?.classList.add(\"translate-x-full\"),document.body.style.overflow=\"\"});"]],"assets":["/_astro/temp6.BBN_zDaW.jpeg","/_astro/claudia-1.BlfAqk-l.jpg","/_astro/contact-bg.DvxE-l9M.jpg","/_astro/temp1.49qSwflz.jpeg","/_astro/office.BUuibO0t.jpg","/_astro/mission.DAwLa_JN.jpg","/_astro/temp5.B2Nz7Ogi.jpeg","/_astro/no-images.D65wBfh7.jpg","/_astro/luisa-1.Dk1-3cfu.jpg","/_astro/about-hero.Ja2IZiR5.jpg","/_astro/temp3.Blg3Ibua.jpeg","/_astro/temp4.DnENpHko.jpeg","/_astro/main-house.BI8awqDJ.jpg","/_astro/logo-blanco.D9Qm80Uz.png","/_astro/logo.CL-Qe-Zv.png","/_astro/post-2.DGZJdYha.jpeg","/_astro/about.BiGIix77.css","/favicon.ico","/favicon.svg","/_astro/PropertyGallerySection.astro_astro_type_script_index_0_lang.QDPp-qbH.js","/_astro/PropertyGallerySection.Cacu5y9W.css","/about/index.html","/blog/index.html","/contact/index.html","/cookies/index.html","/privacy/index.html","/properties/index.html","/test-construcciones/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"GEHIevJJrhXkOg1/kr8AEPW1RjDHRy0MmZlPBkdAjwE="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };

if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const t=e=>i(e,o),u={module:{uri:o},exports:l,require:t};s[o]=Promise.all(n.map((e=>u[e]||t(e)))).then((e=>(r(...e),l)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/button-BmVo_1Ww.js",revision:null},{url:"assets/CartPage-DnBKpVeX.js",revision:null},{url:"assets/Home-C8yBNfvY.js",revision:null},{url:"assets/index-CTzV3bGT.css",revision:null},{url:"assets/index-E8zi_L0b.js",revision:null},{url:"assets/main-Bi5fGRn2.js",revision:null},{url:"assets/NotFound-BWqmdJhF.js",revision:null},{url:"assets/ProductPage-BfCImwOg.js",revision:null},{url:"assets/utils-uYTjRYPR.js",revision:null},{url:"index.html",revision:"3c8f8ad33064b29246c47e2992483123"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"android-chrome-192x192.png",revision:"e555116428b001928ba4ed1b72f135ef"},{url:"android-chrome-512x512.png",revision:"e2d4579308a5b6e4a11123ac560d0e91"},{url:"apple-touch-icon.png",revision:"f025a3b7c86354395d13683857672b04"},{url:"favicon.ico",revision:"6fb72ff2d9e0697d712532a678670a3d"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"manifest.webmanifest",revision:"4049584c5d7dab56bed1a8770c28aef1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

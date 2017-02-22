<!-- TITLE/ -->

<h1>Jest Mock AsyncStorage for react-native</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-travisci"><a href="http://travis-ci.org/devmetal/mock-async-storage" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/devmetal/mock-async-storage/master.svg" alt="Travis CI Build Status" /></a></span>

<!-- /BADGES -->


[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


<!-- DESCRIPTION/ -->

Its a mock of react-native AsyncStorage for jest tests

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>
<li>Install: <code>npm install --save mock-async-storage</code></li>
<li>Module: <code>require('mock-async-storage')</code></li></ul>

<h3><a href="https://github.com/bevry/editions" title="Editions are the best way to produce and consume packages you care about.">Editions</a></h3>

<p>This package is published with the following editions:</p>

<ul><li><code>mock-async-storage/src/index.js</code> is Source + <a href="https://babeljs.io/docs/learn-es2015/" title="ECMAScript Next">ESNext</a> + <a href="https://babeljs.io/docs/learn-es2015/#modules" title="ECMAScript Modules">Import</a> + Flow</li>
<li><code>mock-async-storage</code> aliases <code>mock-async-storage/lib/index.js</code></li>
<li><code>mock-async-storage/lib/index.js</code> is <a href="https://babeljs.io" title="The compiler for writing next generation JavaScript">Babel</a> Compiled + <a href="http://babeljs.io/docs/plugins/preset-es2015/" title="ECMAScript 2015">ES2015</a> + <a href="https://nodejs.org/dist/latest-v5.x/docs/api/modules.html" title="Node/CJS Modules">Require</a></li></ul>

<p>Older environments may need <a href="https://babeljs.io/docs/usage/polyfill/" title="A polyfill that emulates missing ECMAScript environment features">Babel's Polyfill</a> or something similar.</p>

<!-- /INSTALL -->


<h1>Usage</h1>

In your test codes:

```JavaScript
const mockStorage = require('mock-async-storage');
// or import { mock, release } from 'mock-async-storage';
// mock();
// release();

// For mock AsyncStorage
mockStorage.mock();

// For unmock
mockStorage.release();
```

Working example:

```JavaScript
import 'react-native';
import { mock, release } from 'mock-async-storage'
import React from 'react';
import Index from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

mock()

import { AsyncStorage as storage } from 'react-native'

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});

it('Mock Async Storage working', async () => {
  await storage.setItem('myKey', 'myValue')
  const value = await storage.getItem('myKey')
  expect(value).toBe('myValue')
})
```

[![Auth0 Extend][auth0-extend-image]][auth0-extend-url] [![Auth0 Extend Docs][extend-docs-image]][extend-docs-url] [![License][license-image]][license-url]

[auth0-extend-image]:https://cdn.auth0.com/auth0-extend/badges/extend-5.svg
[auth0-extend-url]: https://a0e-1147409ed911764f3380bf71372283aa.run.webtask.io/a0-extend-gh-badge?repository=extend-editor-react&urlPath=developers
[extend-docs-image]:https://cdn.auth0.com/auth0-extend/badges/extend-docs-5.svg
[extend-docs-url]: https://a0e-1147409ed911764f3380bf71372283aa.run.webtask.io/a0-extend-docs-gh-badge?repository=extend-editor-react&urlPath=libraries/extend-editor#integration-options
[license-image]: http://img.shields.io/npm/l/auth0-lock.svg?style=flat-square
[license-url]: #license

# Extend Editor for React

**Extend Editor** can be integrated into your product to provide your users with a first-class, web-based development experience for extensions.

![](https://camo.githubusercontent.com/e359a3721463fafdd3380ef1477533fa0a0ab1d2/68747470733a2f2f63646e2e61757468302e636f6d2f626c6f672f657874656e642d776562686f6f6b732f73657474696e67732d656469742d636f64652e706e67)

It can be customized to provide your users with the most streamlined, built-in experience with just a few lines of code:

```javascript
import React from 'react';
import { Component } from 'react';
import ExtendEditor from 'extend-editor-react';

export default class MyApp extends Component {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <ExtendEditor
          settings={{
            token: 'ey...',
            webtaskName: 'empty-function'
          }}
        />
      </div>
    );
  }
}
```

## Install

From [npm](https://npmjs.org):

```sh
npm install extend-editor-react
```

## Usage
### Props

| Name  | Type | Description | Default |
| ------------- | ------------- |-------------|-------------|
| settings  | Object  | Extend Editor configuration object. For more info click [here](https://auth0.com/extend/docs/libraries/extend-editor#configuring-extend-editor). | - |
| libUrl | Integer | The Url to the Extend Editor library. | `https://cdn.auth0.com/auth0-extend/1/extend-editor.js` |
| on | Object | The handler for the Extend Editor events like `didWebtaskLoad`. | - |
| height | Integer | The heigh of the Extend Editor. | `450px` |
| width | Integer | The width of the Extend Editor. | `100%` |

### Examples

#### Customizing the Editor

```javascript
import React from 'react';
import { Component } from 'react';
import ExtendEditor from 'extend-editor-react';

export default class MyApp extends Component {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <ExtendEditor
          settings= {{
            token: 'ey...',
            webtaskName: 'empty-function',
            theme: 'light',
            allowSwitching: false
          }}
          height={500}
        />
      </div>
    );
  }
}
```

**Note**: For more information about settings click [here](https://auth0.com/extend/docs/libraries/extend-editor#configuring-extend-editor).

#### Attaching to events

```javascript
import React from 'react';
import { Component } from 'react';
import ExtendEditor from 'extend-editor-react';

export default class MyApp extends Component {
  onEditorDidSaveWebtask(data) {
    console.log(data);
  }

  onEditorError(data) {
    console.log(data);
  }

  render() {
    return (
      <div>
        <h1>My App</h1>
        <ExtendEditor
          on={{
            didSaveWebtask: this.onEditorDidSaveWebtask,
            error: this.onEditorError
          }}
        />
      </div>
    );
  }
}
```


## What is Auth0 Extend?

We believe SaaS products should be easily extensible from within your product without deploying or maintaining servers. We make it easy for your customers, sales engineers, and partners to quickly extend your SaaS. We developed an Extensibility As A Service platform that accelerates time to value, it is called Auth0 Extend.

![](https://user-images.githubusercontent.com/302314/33046084-3aedd346-ce2e-11e7-9445-7b3f88fdf114.png)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository [issues section](https://github.com/auth0/extend-editor-react).

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

[![Auth0 Extend](https://cdn.auth0.com/auth0-extend/badges/extend-3.svg)](https://auth0.com/extend) [![Auth0 Extend Docs](https://cdn.auth0.com/auth0-extend/badges/extend-docs-3.svg)](https://auth0.com/extend/docs)

## Extend Editor - React Component

### Sample

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

## What is [Auth0 Extend](https://auth0.com/extend/)?

We believe SaaS products should be easily extensible from within your product without deploying or maintaining servers. We make it easy for your customers, sales engineers, and partners to quickly extend your SaaS. We developed an Extensibility As A Service platform that accelerates time to value, it is called Auth0 Extend.

![](https://user-images.githubusercontent.com/302314/33046084-3aedd346-ce2e-11e7-9445-7b3f88fdf114.png)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository [issues section](https://github.com/auth0/extend-editor-react).

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
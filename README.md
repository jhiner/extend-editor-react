## Extend Editor - React Component

### Sample

```javascript
import React from 'react';
import { PureComponent } from 'react';

import ExtendEditor from 'extend-editor-react';

export default class MyApp extends PureComponent {
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

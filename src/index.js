import React from 'react';
import { Component } from 'react';
import mapValues from 'lodash.mapvalues';

require('es6-promise').polyfill();

import Loader from './components/loader';
import ScriptLoader from './helpers/scriptLoader';

export default class ExtendEditor extends Component {
  state = {
    loading: true,
    styles: {
      height: '100%',
      display: 'none'
    }
  }

  libUrl = 'https://cdn.auth0.com/auth0-extend/1/extend-editor.js';

  registerEvent(editor, events, userHandlers, cb) {
    events.forEach((event) => {
      editor.on(event, (data) => {
        if (typeof userHandlers[event] === 'function') {
          userHandlers[event](data);
        }

        cb();
      });
    });
  }

  componentWillMount() {
    ScriptLoader(this.props.libUrl || this.libUrl)
      .then(() => {
        const editor = window.ExtendEditor;
        const userHandlers = this.props.on;
        const events = ['didLoadWebtask', 'didLoad', 'error'];

        editor.create(this.editorContainer, this.props.settings);

        mapValues(userHandlers, (handler, event) => {
          if (events.indexOf(event) === -1 && typeof handler === 'function') {
            editor.on(event, handler);
          }
        });

        this.registerEvent(editor, events, userHandlers, () => {
          this.setState({
            loading: false,
            styles: {
              height: '100%'
            }
          });
        });
      });
  }

  render() {
    return (
      <div style={{ height: this.props.height || 450, width: this.props.width || '100%' }}>
        { this.state.loading ? (<Loader settings={this.props.settings} />) : null }

        <div style={this.state.styles} ref={(c) => { this.editorContainer = c; }}></div>
      </div>
    );
  }
}

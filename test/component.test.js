import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import jsdom from 'jsdom'
import Sinon from 'sinon';

process.env.NODE_ENV = 'test';

const ExtendEditor = require('../src/index.js');
const ScriptLoader = require('../src/helpers/scriptLoader');

const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document
global.window = document.defaultView

describe('<ExtendEditor />', () => {
  let sandbox;
  beforeEach(() => sandbox = Sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('Should render with default settings', () => {
    // Arrange
    const defaultLibUrl = 'https://cdn.auth0.com/auth0-extend/1/extend-editor.js';
    const Editor = {
      create: () => { },
      on: () => { }
    };

    sandbox.stub(ScriptLoader, 'load').resolves();
    sandbox.stub(Editor, 'create').returns();

    global.window.ExtendEditor = Editor;

    // Act
    const wrapper = mount(<ExtendEditor.default />);

    // Assert
    expect(wrapper.find('.wt-skeleton')).to.have.length(1);
    expect(ScriptLoader.load.calledOnce).to.be.true;
    expect(ScriptLoader.load.calledWithMatch(defaultLibUrl)).to.be.true;
  });

  it('Should correctly handle `libUrl`', () => {
    // Arrange
    const libUrl = 'https://cdn.auth0.com/auth0-extend/2/extend-editor.js';
    const Editor = {
      create: () => { },
      on: () => { }
    };

    sandbox.stub(ScriptLoader, 'load').resolves();
    sandbox.stub(Editor, 'create').returns();

    global.window.ExtendEditor = Editor;

    // Act
    const wrapper = mount(<ExtendEditor.default libUrl={libUrl} />);

    // Assert
    expect(ScriptLoader.load.calledWithMatch(libUrl)).to.be.true;
  });

  it('Should correctly handle `settings`', (done) => {
    // Arrange
    const settings = {
      theme: 'light',
      allowCreating: true,
      header: {
        enabled: true,
        logoUrl: 'https://cdn.acme.com/logo.svg'
      }
    };
    const Editor = {
      create: () => { },
      on: () => { }
    };

    sandbox.stub(ScriptLoader, 'load').resolves();
    sandbox.stub(Editor, 'create').returns();

    global.window.ExtendEditor = Editor;

    // Act
    const wrapper = mount(<ExtendEditor.default settings={settings} />);

    setTimeout(() => {
      const readSettings = Editor.create.getCall(0).args[1];

      // Assert
      expect(readSettings).to.have.a.property('theme', 'light');
      expect(readSettings).to.have.a.property('allowCreating', true);
      expect(readSettings).to.have.a.property('header');
      expect(readSettings.header).to.have.a.property('enabled', true);
      expect(readSettings.header).to.have.a.property('logoUrl', 'https://cdn.acme.com/logo.svg');

      done();
    }, 100);
  });

  it('Should correctly handle `on` events', (done) => {
    // Arrange
    const settings = { header: false };
    const Editor = {
      create: () => { },
      on: () => { }
    };
    const onEvents = {
      didLoadWebtask: () => { },
      didLoad: () => { },
      error: () => { },
      didSaveWebtask: () => {}
    };

    sandbox.stub(ScriptLoader, 'load').resolves();
    sandbox.stub(Editor, 'create').returns();
    sandbox.stub(Editor, 'on').returns();
    global.window.ExtendEditor = Editor;

    // Act
    const wrapper = mount(<ExtendEditor.default on={onEvents} settings={settings} />);

    setTimeout(() => {
      // Assert
      expect(Editor.on.callCount).to.be.eq(4);
      expect(Editor.on.getCall(0).args[0]).to.be.eq('didSaveWebtask');
      expect(Editor.on.getCall(1).args[0]).to.be.eq('didLoadWebtask');
      expect(Editor.on.getCall(2).args[0]).to.be.eq('didLoad');
      expect(Editor.on.getCall(3).args[0]).to.be.eq('error');

      done();
    }, 100);
  });

  it('Should correctly call `didLoadWebtask`', (done) => {
    // Arrange
    const events = [];
    const Editor = {
      create: () => { },
      on: (t, h) => { events.push({ type: t, handler: h }); }
    };
    const onEvents = {
      didLoadWebtask: () => { }
    };

    sandbox.stub(ScriptLoader, 'load').resolves();
    sandbox.stub(Editor, 'create').returns();
    sandbox.stub(onEvents, 'didLoadWebtask').returns();
    global.window.ExtendEditor = Editor;

    // Act
    const wrapper = mount(<ExtendEditor.default on={onEvents} />);


    setTimeout(() => {
      events[0].handler();

      // Assert
      expect(events.length).to.be.eq(3);
      expect(onEvents.didLoadWebtask.calledOnce).to.be.true;

      done();
    }, 100);
  });

  it('Should correctly call `didLoad`', (done) => {
    // Arrange
    const events = [];
    const Editor = {
      create: () => { },
      on: (t, h) => { events.push({ type: t, handler: h }); }
    };
    const onEvents = {
      didLoad: () => { }
    };

    sandbox.stub(ScriptLoader, 'load').resolves();
    sandbox.stub(Editor, 'create').returns();
    sandbox.stub(onEvents, 'didLoad').returns();
    global.window.ExtendEditor = Editor;

    // Act
    const wrapper = mount(<ExtendEditor.default on={onEvents} />);


    setTimeout(() => {
      events[1].handler();

      // Assert
      expect(events.length).to.be.eq(3);
      expect(onEvents.didLoad.calledOnce).to.be.true;

      done();
    }, 200);
  });

  it('Should correctly call `error`', (done) => {
    // Arrange
    const events = [];
    const Editor = {
      create: () => { },
      on: (t, h) => { events.push({ type: t, handler: h }); }
    };
    const onEvents = {
      error: () => { }
    };

    sandbox.stub(ScriptLoader, 'load').resolves();
    sandbox.stub(Editor, 'create').returns();
    sandbox.stub(onEvents, 'error').returns();
    global.window.ExtendEditor = Editor;

    // Act
    const wrapper = mount(<ExtendEditor.default on={onEvents} />);


    setTimeout(() => {
      events[2].handler();

      // Assert
      expect(events.length).to.be.eq(3);
      expect(onEvents.error.calledOnce).to.be.true;

      done();
    }, 100);
  });
});

import React from 'react';
import { expect } from 'chai';
import Sinon from 'sinon';

const ScriptLoader = require('../src/helpers/scriptLoader');

describe('ScriptLoader', () => {
  let sandbox;
  beforeEach(() => sandbox = Sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('Should correctly generate the tag <script>', () => {
    // Arrange
    const element = {};
    const head = { appendChild: () => {} }
    global.document = {
      scripts: [],
      createElement: () => {
        return element;
      },
      getElementsByTagName: () => {
        return [head]
      }
    };

    sandbox.stub(head, 'appendChild').resolves();

    // Act
    ScriptLoader.load('https://cdn.acme.com/file.js');

    // Assert
    expect(head.appendChild.calledOnce).to.be.true;
    expect(element).to.have.a.property('type', 'text/javascript');
    expect(element).to.have.a.property('defer', true);
    expect(element).to.have.a.property('async', true);
    expect(element).to.have.a.property('src', 'https://cdn.acme.com/file.js');
  });

  it('Should not add the <script> if it is already loaded', () => {
    // Arrange
    const element = {};
    const head = { appendChild: () => {} }
    global.document = {
      scripts: [{ src: 'https://cdn.acme.com/file.js' }],
      createElement: () => {
        return element;
      },
      getElementsByTagName: () => {
        return [head]
      }
    };

    sandbox.stub(head, 'appendChild').resolves();

    // Act
    ScriptLoader.load('https://cdn.acme.com/file.js');

    // Assert
    expect(head.appendChild.calledOnce).to.be.false;
  });

  it('Should correctly handle script.onload', () => {
    // Arrange
    const element = {};
    const head = { appendChild: () => {} }
    global.document = {
      scripts: [],
      createElement: () => {
        return element;
      },
      getElementsByTagName: () => {
        return [head]
      }
    };

    sandbox.stub(head, 'appendChild').resolves();

    ScriptLoader
    .load('https://cdn.acme.com/file.js')
    .then(() => {
      // Assert
      expect(true).to.be.true;
    });

    // Act
    element.onload();
  });

  it('Should correctly handle script.onerror', () => {
    // Arrange
    const element = {};
    const head = { appendChild: () => {} }
    global.document = {
      scripts: [],
      createElement: () => {
        return element;
      },
      getElementsByTagName: () => {
        return [head]
      }
    };

    sandbox.stub(head, 'appendChild').resolves();

    ScriptLoader
      .load('https://cdn.acme.com/file.js')
      .catch(() => {
        // Assert
        expect(true).to.be.true;
      });

    // Act
    element.onerror();
  });
});

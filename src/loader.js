import React from 'react';
import { PureComponent } from 'react';

require('./loader.css');

export default class Loader extends PureComponent {
  isHeaderEnabled(onEnabled) {
    const headerOptions = typeof this.props.settings.header === 'undefined' ?
                                 { enabled: false } :
                                 this.props.settings.header;

    if (headerOptions === false) {
      return null;
    }

    if (typeof headerOptions === 'object'
          && headerOptions.enabled === false) {
      return null;
    }

    if (typeof headerOptions !== 'object' && typeof headerOptions !== 'boolean') {
      return null;
    }

    return onEnabled(headerOptions);
  }

  render() {
    return (
        <div className={`wt-workbench ${this.props.settings.theme === 'light' ? 'wt-theme-light' : ''}`}>
        { this.isHeaderEnabled(opts => (
          <div className="wt-header">
            { opts.logoUrl && opts.logoUrl.length > 0 ? (
              <div
                className="wt-header-logo" style={{
                  background: `url(${opts.logoUrl}) no-repeat`,
                  backgroundSize: 'auto 25px'
                }}
              ></div>
            ) : null }
          </div>
        ))
        }
        <div className="wt-container">
          <div className="wt-skeleton">
            <div className="wt-modal-container">
              <div className="wt-overlay"></div>
              <div className="wt-skeleton-message-container">
                <div className={`wt-skeleton-message wt-skeleton-loading`}>loading</div>
                <div className={`wt-spinner wt-spinner-sm`}>
                  <div className="wt-circle"></div>
                </div>
              </div>
            </div>
            <div className="wt-skeleton-container">
              <ol className="wt-skeleton-code">
                <li className="wt-skeleton-line">
                  <span className="wt-skeleton-line-content">■■■ ■■■■■■■ ■ ■■■■■■■■■■■■■■■■■■■</span>
                </li>
                <li className="wt-skeleton-line">
                  <span className="wt-skeleton-line-content">■■■ ■■■■■■■ ■ ■■■■■■■■■■■■■■■■■■■■■■■■■</span>
                </li>
                <li className="wt-skeleton-line">
                  <span className="wt-skeleton-line-content">■■■ ■■■■■■■ ■ ■■■■■■■■■■■■■■■■■■■■■■■</span>
                </li>
                <li className="wt-skeleton-line">
                  <span className="wt-skeleton-line-content">■■■ ■■■ ■ ■■■■■■■■■</span>
                </li>
                <li className="wt-skeleton-line"></li>
                <li className="wt-skeleton-line">
                  <span className="wt-skeleton-line-content">■■■■■■■■■■■■■■■■■■■■■■■■■■■</span>
                </li>
                <li className="wt-skeleton-line"></li>
                <li className="wt-skeleton-line">
                  <span className="wt-skeleton-line-content">■■■■■■■■■■■■ ■■■■■■■■ ■■■■■ ■■■■ ■</span>
                </li>
                <li className="wt-skeleton-line">
                  <span className="wt-skeleton-line-content">■■■■■■■■■■■■■■■■■■■■</span>
                </li>
                <li className="wt-skeleton-line"></li>
                <li className="wt-skeleton-line">
                  <span className="wt-skeleton-line-content">■■■</span>
                </li>
                <li className="wt-skeleton-line"></li>
                <li className="wt-skeleton-line">
                  <span className="wt-skeleton-line-content">■■■■■■■■■■■■■■ ■ ■■■■■■■■■■■■■■■■■■■■■■■■■</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

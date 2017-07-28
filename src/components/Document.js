import React, {Component} from 'react';

import './Document.css';
import moment from "moment";

export default class Document extends Component {

  renderDiffTable(change) {
    if (Object.keys(change.diff).length > 0) {
      return (
        <div className="row document-table">
          <div className="twelve columns centered">
            <table className="u-full-width">
              <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
              </thead>
              <tbody>
              {
                Object.keys(change.diff).map(
                  (key) => {
                    return (
                      <tr key={document._id + '.' + change.date + '.' + key}>
                        <td>
                          {key}
                        </td>
                        <td>
                          {change.diff[key]}
                        </td>
                      </tr>
                    );
                  }
                )
              }
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <div/>;
    }
  }

  render() {
    const document = this.props.document;

    const renderedChanges = document.changes.reverse().map(
      (change) => {
        return (
          <div key={document._id + '.' + change.date}>
            <div className="row">
              <div className="twelve columns ray-container">
                <div className="ray"/>
              </div>
            </div>
            <div className="row">
              <div className="twelve columns centered">
                <h5>{change.eventType} at {moment.unix(change.date).format('DD.MM.YYYY HH:mm')}</h5>
              </div>
            </div>
            {this.renderDiffTable(change)}
          </div>
        );
      }
    );

    return (
      <div className="row document-container">
        <div className="twelve columns">
          <div className="row">
            <div className="twelve columns">
              <h4>Document id: {document.document.id}</h4>
            </div>
          </div>
          <div className="row">
            <div className="twelve columns document-table">
              <table className="u-full-width">
                <thead>
                <tr>
                  <th>Attribut</th>
                  <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(document.document).map(
                  (key) => {
                    return (
                      <tr key={document._id + '.' + key}>
                        <td>{key}</td>
                        <td>{document.document[key]}</td>
                      </tr>
                    );
                  }
                )}
                </tbody>
              </table>
            </div>
          </div>
          {renderedChanges}
        </div>
      </div>
    );
  }
}

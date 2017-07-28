import React, {Component} from 'react';
import axios from 'axios';

import '../App.css';
import {API_URL} from "../config";

export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      documentTypes: [],
      attributes: [],
      selectedDocumentType: '',
      selectedAttribute: '',
      selectedValue: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onChanged = this.onChanged.bind(this);
  }

  componentWillMount() {
    this.retrieveDocTypes();
  }

  onChange(event) {
    const name = event.target.name;
    this.setState(
      {[name]: event.target.value},
      () => {
        if (name === 'selectedDocumentType') {
          this.retrieveDocTypeAttributes();
        }
      }
    );
  }

  onChanged(event) {
    event.preventDefault();
    if ('onChanged' in this.props) {
      this.props.onChanged(
        this.state.selectedDocumentType,
        this.state.selectedAttribute,
        this.state.selectedValue
      );
    }
  }

  retrieveDocTypes() {
    axios.get(API_URL + '/documents/types').then(
      (response) => {
        this.setState({documentTypes: response.data});
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  retrieveDocTypeAttributes() {
    axios.get(
      API_URL + '/documents/types/' + this.state.selectedDocumentType + '/attributes'
    ).then(
      (response) => {
        this.setState({attributes: response.data});
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  render() {

    const renderedSelectedDocumentType = (
      <div className="six columns">
        <label htmlFor="document_type">Document type</label>
        <select
          className="u-full-width"
          id="document_type"
          name="selectedDocumentType"
          onChange={this.onChange}
        >
          <option value={null}></option>
          {
            this.state.documentTypes.map(
              (documentType) => {
                return (
                  <option value={documentType} key={documentType}>
                    {documentType}
                  </option>
                );
              }
            )
          }
        </select>
      </div>
    );

    const renderedSelectedAttribute = (
      <div className="six columns">
        <label htmlFor="attribute">
          Attribute
        </label>
        <select
          id="attribute"
          className="u-full-width"
          value={this.state.selectedAttribute}
          name='selectedAttribute'
          onChange={this.onChange}
        >
          {
            this.state.attributes.map(
              (attribute) => {
                return (
                  <option key={attribute} value={attribute}>
                    {attribute}
                  </option>
                );
              }
            )
          }
        </select>
      </div>
    );

    const renderedSelectedValue = (
      <div className="six columns">
        <label htmlFor="value">
          Value
        </label>
        <input
          type="text"
          className="u-full-width"
          id="value"
          name="selectedValue"
          onChange={this.onChange}
          value={this.state.selectedValue}
        />
      </div>
    );

    const renderedSearchButton = (
      <div className="six columns">
        <button
          type="submit"
          className="button pull-button"
          onClick={this.onChanged}
        >
          Search
        </button>
      </div>
    );

    return (
      <div className="row">
        <div className="twelve columns">
          <form onSubmit={this.onChanged}>
            <div className="row">
              {renderedSelectedDocumentType}
              {this.state.selectedDocumentType ? renderedSelectedAttribute : null}
            </div>
            <div className="row">
              {this.state.selectedDocumentType ? renderedSelectedValue : null}
              {this.state.selectedDocumentType ? renderedSearchButton : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

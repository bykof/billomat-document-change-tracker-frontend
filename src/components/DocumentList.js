import React, {Component} from 'react';

import axios from 'axios';

import Document from "./Document";
import {API_URL} from "../config";


export default class DocumentList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      documents: [
        {
          document: {id: 'sexy', invoice_number: 'RE-434543'},
          changes: [
            {
              date: new Date(),
              eventType: 'updated',
              diff: {
                invoice_number: "nub"
              }
            }
          ]
        },
        {
          document: {id: 'hello', invoice_number: 'RE-1234'},
          changes: [
            {
              date: new Date(),
              eventType: 'updated',
              diff: {
                invoice_number: "be"
              }
            },
            {
              date: new Date(),
              eventType: 'created',
              diff: {
              }
            }
          ]
        }
      ]
    };
  }
  
  componentWillReceiveProps(newProps) {
    axios.get(
      API_URL + '/documents/search',
      {
        params: {
          type: newProps.selectedDocumentType,
          attribute: newProps.selectedAttribute,
          value: newProps.selectedValue,
        }
      }
    ).then(
      (response) => {
        this.setState({documents: response.data});
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }
  
  render() {
    
    const renderedDocuments = this.state.documents.map(
      (document) => {
        return (
          <div key={document.document.id}>
            <Document document={document}/>
            {
              this.state.documents.indexOf(document) === this.state.documents.length - 1 ?
              null :
              <hr/>
            }
          </div>
        );
      }
    );
    
    return (
      <div className="row">
        {renderedDocuments}
      </div>
    );
  }
}

import React, {Component} from 'react';

import './App.css';
import SearchBar from "./components/SearchBar";
import DocumentList from "./components/DocumentList";

export default class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      selectedDocumentType: '',
      selectedAttribute: '',
      selectedValue: '',
    };
  }
  
  
  render() {
    return (
      <div className="App container">
        <div className="row header">
          <div className="twelve columns">
            <h3>Billomat Document Tracker</h3>
          </div>
        </div>
        <hr/>
        <SearchBar
          onChanged={
            (selectedDocumentType, selectedAttribute, selectedValue) => {
              this.setState(
                {
                  selectedDocumentType: selectedDocumentType,
                  selectedAttribute: selectedAttribute,
                  selectedValue: selectedValue,
                }
              );
            }
          }
        />
        <hr/>
        <DocumentList
          selectedDocumentType={this.state.selectedDocumentType}
          selectedAttribute={this.state.selectedAttribute}
          selectedValue={this.state.selectedValue}
        />
      </div>
    );
  }
}

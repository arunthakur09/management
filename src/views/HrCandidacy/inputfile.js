import { Button } from './button'
import React from "react";
import ReactDOM from "react-dom"


export default class InputFile extends React.Component {
    triggerInput = e => {
        ReactDOM.findDOMNode(this._inputFile).click();
    }
    render() {
        return (
            <div >
              <Button onClick={this.triggerInput} >
                  <input 
                      name="file" 
                      type="file" 
                      //className="InputFile__input" 
                      ref={c => this._inputFile = c}
                      onChange={this.props.uploadFileHandler}
                  />
                  <label htmlFor="file" >{this.props.children}</label>
              </Button>
            </div>
        )
    }
}
import React from 'react';

class StopwatchDisplay extends React.Component {
    componentDidUpdate(){
        debugger
        if(window.hour || window.minute || window.second){

        }
    }
  render() {
    return (
      <div className={'stopwatch__display'}>
        <span>
          {this.props.formatTime(window.hour)}:
          {this.props.formatTime(window.minute)}:
          {this.props.formatTime(window.second)}
        </span>
      </div>
    );
  }
}

export default StopwatchDisplay;

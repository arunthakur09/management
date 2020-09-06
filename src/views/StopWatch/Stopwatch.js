class Stopwatch {
    constructor(display, results) {
        if (localStorage.getItem("mytime")===null){
            localStorage.setItem("mytime", [0, 0, 0, 0]);            
        }
        let value = (localStorage.getItem('mytime').split(',')).map((data)=>{
            return(
                parseFloat(data)
            )

        })
        console.log(value,'adfg')
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.times = value
        this.print(this.times);
    }
    
    reset= () => {
        this.times = [ 0, 0, 0, 0 ];
    }
    
    start = () => {
        let value = (localStorage.getItem('mytime').split(',')).map((data)=>{
            return(
                parseFloat(data)
            )

        })
        this.times = value
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    lap= () => {
        let times = this.times;
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li);
    }
    
    stop= (data) => {
        this.running=false;
        localStorage.setItem("mytime", this.times);
        this.time = null;
    }

    restart= () => {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    clear= () => {
        clearChildren(this.results);
    }
    
step = (timestamp) => {
    if(JSON.parse(localStorage.getItem("status"))){
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        localStorage.setItem("mytime", this.times);
        requestAnimationFrame(this.step.bind(this));
    }
      else{
        localStorage.setItem("mytime", this.times);
          return;
      } 
    }
    
    calculate = (timestamp) => {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[3] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[3] >= 100) {
            this.times[2] += 1;
            this.times[3] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[2] >= 60) {
            this.times[1] += 1;
            this.times[2] -= 60;
        }
        // Hours are 60 Minutes
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print = () => {
        console.log(this.times,"running")
        window.timerData =this.format(this.times)
        console.log(window.timerData)
        var event = new CustomEvent('timer', { detail: window.timerData });
        document.dispatchEvent(event);
        // this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

export default Stopwatch;
// let stopwatch = new Stopwatch(
//     document.querySelector('.stopwatch'),
//     document.querySelector('.results'));


// import React from 'react';
// import ReactDOM from 'react-dom';
// import StopwatchDisplay from './StopwatchDisplay.js';
// import StopwatchHistory from './StopwatchHistory.js';

// class Stopwatch extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       running: false,
//       currentTimeMs: 0,
//       currentTimeSec: 0,
//       currentTimeMin: 0,
//     };
//   }

//   formatTime = (val, ...rest) => {
//     let value = val.toString();
//     if (value.length < 2) {
//       value = '0' + value;
//     }
//     if (rest[0] === 'ms' && value.length < 3) {
//       value = '0' + value;
//     }
//     return value;
//   };

//   start = () => {
//     if (!this.state.running) {
//       this.setState({ running: true });
//       this.watch = setInterval(() => this.pace(), 10);
//     }
//   };

//   stop = () => {
//     this.setState({ running: false });
//     clearInterval(this.watch);
//   };

//   pace = () => {
//     this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
//     if (this.state.currentTimeMs >= 1000) {
//       this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
//       this.setState({ currentTimeMs: 0 });
//     }
//     if (this.state.currentTimeSec >= 60) {
//       this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
//       this.setState({ currentTimeSec: 0 });
//     }
//   };

//   reset = () => {
//     this.setState({
//       currentTimeMs: 0,
//       currentTimeSec: 0,
//       currentTimeMin: 0,
//     });
//   };

//   render() {
//     return (
//       <div className={'stopwatch'}>
//         <h2 ref="header">Stopwatch</h2>
//         {this.state.running === false && (
//           <button onClick={this.start}>START</button>
//         )}
//         {this.state.running === true && (
//           <button onClick={this.stop}>STOP</button>
//         )}
//         <button onClick={this.reset}>RESET</button>
//         <StopwatchDisplay
//           ref="display"
//           {...this.state}
//           formatTime={this.formatTime}
//         />
//         <StopwatchHistory {...this.state} formatTime={this.formatTime} />
//       </div>
//     );
//   }
// }

// export default Stopwatch;

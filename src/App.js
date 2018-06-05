import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvReplay from 'material-ui/svg-icons/av/replay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      currentTime: 1500,
      condition: "replay",
      currentState: "Session"
    }
  }

  handleClick = (e) => {
    let num;
    if (this.state.condition === "replay") {
      switch (e) {
        case "breakmin":
          num = this.state.breakLength - 1
          if (this.state.breakLength > 1) {
            this.setState({ breakLength: num });
            if (this.state.currentState === "Break")
              this.setState({ currentTime: this.state.currentTime - 60 });
          }
          break;
        case "breakplus":
          num = this.state.breakLength + 1
          if (this.state.breakLength < 60) {
            this.setState({ breakLength: num })
            if (this.state.currentState === "Break")
              this.setState({ currentTime: this.state.currentTime + 60 })
          }
          break;
        case "sessionmin":
          num = this.state.sessionLength - 1
          if (this.state.sessionLength > 1) {
            this.setState({ sessionLength: num, currentTime: this.state.currentTime - 60 });
            if (this.state.currentState === "Session")
              this.setState({ currentTime: this.state.currentTime - 60 });
          }
          break;
        case "sessionplus":
          num = this.state.sessionLength + 1
          if (this.state.sessionLength < 60) {
            this.setState({ sessionLength: num })
            if (this.state.currentState === "Session")
              this.setState({ currentTime: this.state.currentTime + 60 })
          }
          break;
        default:
          return null;
      }
    }
  }

  handleCondition = (e) => {
    switch (e) {
      case "play":
        this.setState({ condition: "play" })
        this.interval = setInterval(this.playTimer.bind(this), 1000)
        break;
      case "pause":
        this.setState({ condition: "pause" })
        clearInterval(this.interval);
        break;
      case "replay":
        this.setState({ condition: "replay", currentTime: this.state.sessionLength * 60, currentState: "Session" })
        clearInterval(this.interval)
        break;
      default:
        return null
    }

  }

  playTimer() {
    if (this.state.currentState === "Session" && this.state.currentTime === 0) {
      this.setState({ currentState: "Break", currentTime: this.state.breakLength * 60 })
    }
    else if (this.state.currentState === "Break" && this.state.currentTime === 0) {
      this.setState({ condition: "replay", currentTime: this.state.sessionLength * 60, currentState: "Session" })
        clearInterval(this.interval)
    }
    if (this.state.condition === "play") {
      this.setState({ currentTime: this.state.currentTime - 1 })
    }
    
  }


  render() {
    const breakMin = "breakmin", breakPlus = "breakplus", sessionMin = "sessionmin", sessionPlus = "sessionplus";
    const play = "play", pause = "pause", replay = "replay"
    let totalMin = Math.floor(this.state.currentTime / 60), totalSec = this.state.currentTime % 60

    if (totalMin < 10)
      totalMin = "0" + totalMin.toString()
    if (totalSec < 10)
      totalSec = "0" + totalSec.toString()

    return (
      <div className="container">
        <header className="pomodoro-header">
          <h1>Pomodoro Clock</h1>
        </header>

        <div className="break">
          <div className="break">Break Length</div>
          <div className="option">
            <MuiThemeProvider><FloatingActionButton mini={true} onClick={() => this.handleClick(breakMin)}><ContentRemove /></FloatingActionButton></MuiThemeProvider>
            {this.state.breakLength}
            <MuiThemeProvider><FloatingActionButton mini={true} onClick={() => this.handleClick(breakPlus)}><ContentAdd /></FloatingActionButton></MuiThemeProvider>
          </div>
        </div>
        <div className="session">
          <div className="session">Session Length</div>
          <div className="option">
            <MuiThemeProvider><FloatingActionButton mini={true} onClick={() => this.handleClick(sessionMin)}><ContentRemove /></FloatingActionButton></MuiThemeProvider>
            {this.state.sessionLength}
            <MuiThemeProvider><FloatingActionButton mini={true} onClick={() => this.handleClick(sessionPlus)}><ContentAdd /></FloatingActionButton></MuiThemeProvider>
          </div>
        </div>

        <div className="display">
          <h3>{this.state.currentState}</h3>
          <div className="countDown">
            <div>{totalMin}:{totalSec}</div>
          </div>
          <div className="control">
            <MuiThemeProvider><FloatingActionButton onClick={() => this.handleCondition(play)}><AvPlayArrow /></FloatingActionButton></MuiThemeProvider>
            <MuiThemeProvider><FloatingActionButton onClick={() => this.handleCondition(pause)}><AvPause /></FloatingActionButton></MuiThemeProvider>
            <MuiThemeProvider><FloatingActionButton onClick={() => this.handleCondition(replay)}><AvReplay /></FloatingActionButton></MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

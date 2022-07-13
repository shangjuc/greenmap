import React from 'react';
import ReactDOM from 'react-dom';
import './Timer.scss';
import { formatInTimeZone } from 'date-fns-tz'

// const date = new Date('2014-10-25T10:46:20Z')
const date = new Date()
console.log(formatInTimeZone(date, 'America/New_York', 'yyyy-MM-dd HH:mm:ss XXX'))
console.log(formatInTimeZone(date, 'Asia/Taipei', 'yyyy-MM-dd HH:mm:ss XXX'))


class Clock2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
    render(){
        return (
            <div className="container">
                <h1>Hello, {this.props.user}</h1>
                {/* <h2>{this.state.date.toLocaleTimeString()}</h2> */}
                <p>NY: {formatInTimeZone(this.state.date, 'America/New_York', 'yyyy-MM-dd HH:mm:ss XXX')}</p>
                <p>TW: {formatInTimeZone(this.state.date, 'Asia/Taipei', 'yyyy-MM-dd HH:mm:ss XXX')}</p>
            </div>
        )
    }
}

// function Clock(props) {
//     return (
//         <div className="container">
//             <h1>Hello, {props.user}</h1>
//             <h2>{props.date.toLocaleTimeString()}</h2>
//         </div>
//     )
// }


function tick() {
    if (!document.getElementById('timer')){
        return;
    }
    ReactDOM.render(
        <Clock2 user={'SJC'} />, 
        document.getElementById('timer')
        );
}

function Timer() {
    setInterval(tick, 1000);

    return ( 
        <div id="timer"></div>
    );
}

export default Timer;

import React from 'react';
import './Timer.scss';
import { formatInTimeZone } from 'date-fns-tz'
const date = new Date()
console.log(formatInTimeZone(date, 'America/New_York', 'yyyy-MM-dd HH:mm:ss XXX'))
console.log(formatInTimeZone(date, 'Asia/Taipei', 'yyyy-MM-dd HH:mm:ss XXX'))


class Clock2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        document.title = `Timer`;

        this.timerID = setInterval(
            () => this.tick(),
            2000
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
                <p>NY: {formatInTimeZone(this.state.date, 'America/New_York', 'MM-dd HH:mm:ss XXX')}</p>
                <p>TW: {formatInTimeZone(this.state.date, 'Asia/Taipei', 'MM-dd HH:mm:ss XXX')}</p>
            </div>
        )
    }
}

function Timer() {

    return ( 
        <div id="timer">
            <Clock2 user={'SJC'} />
        </div>
    );
}

export default Timer;

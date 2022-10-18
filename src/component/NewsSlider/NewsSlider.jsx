import React from 'react';
import './NewsSlider.scss';

function NewsSlider() {
    // setTimeout(() => {
    //     var objDiv = document.querySelector('.iframe-container');
    //     objDiv.scrollTop = objDiv.scrollHeight;
        
    // }, 1000);

    return ( 
        <div id="news-slider">
            
            <div className='iframe-container'>
                <iframe title='NewsSlider' src="https://islander.cc/top30event?date=2022-10-17" frameBorder="0" width={'1000px'} height={'4750px'} scrolling='no'></iframe>
            </div>
        </div>
    );
}

export default NewsSlider;

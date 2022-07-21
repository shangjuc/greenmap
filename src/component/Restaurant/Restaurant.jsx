import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
import api_service from '../../service/service';

import "./Restaurant.scss";

function Restaurant(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `Restaurant`;
    }, [])
    
    useEffect(() => {
        
        async function fetch_data() {
            const records = await api_service.fetchData('restaurant',0)
            .then(data=>{
                return data.records
            })
            setData(records)
        }
        fetch_data();
        

    }, []);

    // render
    if (true) {
        return (
            <div className='restaurant-list'>
                <h1>Restaurant</h1>

                <div className="restaurant-list-container">
                    <ul className='restaurant-list-ul'>
                        <li>
                            <div className='serialnumber fix'>序號</div>
                            <div className='county fix'>縣市</div>
                            <div className='name fix2'>名稱</div>
                            <div className='address grow'>地址</div>
                        </li>
                        {data.map(item =>
                            <li key={item.serialnumber}>
                                <div className='serialnumber fix'>{item.serialnumber}</div>
                                <div className='county fix'>{item.county}</div>
                                <div className='name fix2'>{item.name}</div>
                                <div className='address grow'>{item.address}</div>
                            </li>)}
                    </ul>
                </div>

            </div>
        )
    }
}



export default Restaurant;

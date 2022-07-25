import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
import api_service from '../../service/service';

import "./Restaurant.scss";

function Restaurant(props) {

    const [records, setRecords] = useState([]);
    const [pages, setPages] = useState([]);
    const [offset, setOffset] = useState(0);
    const [netStatus, setNetStatus] = useState(0);

    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `Restaurant`;
    }, [])
    
    useEffect(() => {
        setNetStatus(1)
        
        async function fetch_data() {
            const resp = await api_service.fetchData('restaurant', offset)
            .then(data=>{
                setNetStatus(200)
                return data
            })
            .catch(err=>{
                setNetStatus(400)

            })
            setRecords(resp.records);
            let pages = [];
            for ( let i = 0; i < Math.floor(+resp.total / 100) + 1; i++){
                pages.push(i);
            }
            // console.log(pages)
            setPages(pages);

        }
        fetch_data();
        

    }, [offset]);



    // render
    if (true) {
        return (
            <div className='restaurant-list'>
                <div className="title-container">
                    <h1>綠色餐廳列表</h1>
                </div>

                {/* <div className="container net-status-container">
                    {netStatus === 1 ? <span>Loading...</span> : null}
                    {netStatus === 200 ? <span>載入成功</span> : null}
                    {netStatus === 400 ? <span>載入失敗</span> : null}
                    
                </div> */}
                <div className="container page-btn-container">
                    {pages.map(item => <button key={item} className={offset === item * 100 ? "active" : ""} onClick={() => setOffset(item * 100)}>{item + 1}</button>)}
                    {/* <button onClick={()=>setOffset(0)}>1~100</button>
                    <button onClick={()=>setOffset(100)}>101~200</button>
                    <button onClick={()=>setOffset(200)}>201~300</button> */}
                </div>
                
                <div className="container restaurant-list-container">
                    {netStatus === 1 ? <span>Loading...</span> : null}
                    {netStatus === 200 ? <ul className='restaurant-list-ul'>
                        <li className="list-header">
                            <div className='serialnumber fix'>序號</div>
                            <div className='county fix'>縣市</div>
                            <div className='name fix2'>名稱</div>
                            <div className='address grow'>地址</div>
                        </li>
                        {records.map(item =>
                            <li key={item.serialnumber}>
                                <div className='serialnumber fix'>{item.serialnumber}</div>
                                <div className='county fix'>{item.county}</div>
                                <div className='name fix2'>{item.name}</div>
                                <div className='address grow'>{item.address}</div>
                            </li>)}
                    </ul> : null}
                    {netStatus === 400 ? <span>載入失敗</span> : null}
                    
                </div>
                

            </div>
        )
    }
}



export default Restaurant;

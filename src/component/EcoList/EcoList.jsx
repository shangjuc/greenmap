import { useState, useEffect } from 'react';
import { format } from 'date-fns'
import "./EcoList.scss";

function EcoList(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `Eco List`;
    })

    useEffect(() => {
        function getFetchUrl() {
            let urlStr;
            // urlStr = 'https://data.epa.gov.tw/api/v2/gis_p_11?api_key=173d3da4-59b6-4ecd-9f0f-014af21b74b8&limit=1000&sort=ImportDate%20desc&format=json';
            urlStr = 'http://localhost:3000/api/v2/gis_p_11?api_key=173d3da4-59b6-4ecd-9f0f-014af21b74b8&limit=1000&sort=ImportDate%20desc&format=json';

            return urlStr;
        }

        async function fetch_data() {
            try {
                const records = await fetch(getFetchUrl())
                    .then(r => r.json())
                    .then(function (resp) {
                        let arr = [];
                        console.log(resp)
                        resp.records.forEach((item, idx) => {
                            item.id = idx + 1;
                        });
                        arr = resp.records;
                        return arr;
                    });
                setData(records)

            } catch {
            }

        }

        fetch_data();
    }, []);

    // render
    if (true) {
        return (
            <div className='ecolist'>
                <h1>Eco List</h1>

                <div className="ecolist-container">
                    <ul className='ecolist-ul'>
                        {data.map(item =>
                            <li key={item.id}>
                                <div className='id fix'>{item.id}</div>
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



export default EcoList;

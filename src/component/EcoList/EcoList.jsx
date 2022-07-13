import { useState, useEffect } from 'react';
import { format } from 'date-fns'
import "./EcoList.scss";

function EcoList(props) {

    // const [data, setData] = useState([]);

    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `Eco List`;
        function getFetchUrl() {
            let urlStr;
            // urlStr = 'https://data.epa.gov.tw/api/v2/gis_p_11?api_key=173d3da4-59b6-4ecd-9f0f-014af21b74b8&limit=1000&sort=ImportDate%20desc&format=json';
            urlStr = 'http://localhost:3000/api/v2/gis_p_11?api_key=173d3da4-59b6-4ecd-9f0f-014af21b74b8&limit=1000&sort=ImportDate%20desc&format=json'; 

            return urlStr;
        }

        async function fetch_data() {
            try {
                const data = await fetch(getFetchUrl())
                    .then(r => r.json())
                    .then(function (resp) {
                        let arr = [];
                        console.log(resp)
                    });

            } catch {
            }

        }

        fetch_data();
});

    // render
    if (true) {
        return (
            <div>
                <h1>Eco List</h1>
            </div>
        )
    }
}



export default EcoList;

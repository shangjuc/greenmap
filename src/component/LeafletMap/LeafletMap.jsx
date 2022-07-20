import React from "react";
import L from "leaflet";
import api_service from '../../service/service';

import "leaflet/dist/leaflet.css";
import './LeafletMap.scss';
class LeafletMap extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            records: [],
            county: "臺北市",
            countyList: ["新北市", "臺北市"]
        }
    }
    // county = "臺北市";
    // countyList = ["新北市", "臺北市"]
    
    componentDidMount() {
        let self = this
        document.title = `Leaflet map`;
        self.myMap = L.map("mapid");
        self.fetchData();
        // self.drawMap("新北市");
        self.drawMap("臺北市");

    }
    
    fetchData(){
        let self = this
        async function fetch_data() {
            const records = await api_service.fetchData('restaurant')
                .then(data => {
                    return data.records
                })
            self.setState((state, props) => {
                return { records: records };
            });
            self.add_records_to_btn(records);
            self.add_records_to_map(records);

        }
        fetch_data();
    }

    drawMap(county = "臺北市") {
        let self = this
        self.setState((state, props) => {
            return { county: county };
        });
        self.myMap.setView([25.017583090887207, 121.53981656206982], 10);
        
        const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        L.tileLayer(OSMUrl).addTo(self.myMap);
        self.add_records_to_map(self.state.records);
    }

    add_records_to_btn(records){
        let self = this;
        records.forEach((item, idx) => {
            let countyList = self.state.countyList;

            if ( !countyList.includes(item.county)){
                countyList.push(item.county);
            };
            self.setState((state, props) => {
                return { countyList: countyList };
            });
            // console.log(self.state.countyList)

        })        

    }
    add_records_to_map(records) {
        let self = this;

        // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker
        function colorIcon(color = 'green') {
            return new L.Icon({
                iconUrl:
                    `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
                shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
        }

        // 清掉所有舊的markers
        function remove_child(className){
            const item = document.querySelector(className)
            while (item.firstChild) {
                item.removeChild(item.firstChild)
            }
        }
        remove_child('.leaflet-pane.leaflet-marker-pane')
        remove_child('.leaflet-pane.leaflet-shadow-pane')

        // 依照counter篩選資料
        let filtered = records.filter(item => item.county === self.state.county);
        filtered.forEach((item, idx) => {
            let lat_lng = [];
            lat_lng.push(Number(item.lat));
            lat_lng.push(Number(item.lng));

            // console.log(idx,lat_lng)
            if(idx === 1){
                self.myMap.setView(lat_lng, 10);
            }

            let marker = L.marker(lat_lng, { icon: colorIcon('green') }).addTo(self.myMap);
            marker.bindPopup(`<b>${item.name}</b>`);

            // L.circle(lat_lng, {
            //     color: "green",
            //     fillColor: "lightgreen",
            //     fillOpacity: 0.5,
            //     radius: 5
            // }).addTo(self.myMap);

        })
    }


    render() {
        // 設定 height 顯示地圖 ( 預設值 height : 0 )
        return (
            <div className="map-section">
                <div className="btn-container">

                    {this.state.countyList.map(item => {
                        return <button key={item} value={item} onClick={() => this.drawMap(item)}>{item}</button>
                    })}

                    {/* <button onClick={this.drawMap}>臺北市</button> */}
                </div>
                <div className="map-container">
                    <div id="mapid" style={{ minHeight: "500px" }} />
                </div>
            </div>

        )
        
    }
}



export default LeafletMap;
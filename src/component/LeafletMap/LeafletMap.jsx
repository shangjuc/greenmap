import React from "react";
import L from "leaflet";
import api_service from '../../service/service';

import "leaflet/dist/leaflet.css";
import './LeafletMap.scss';
class LeafletMap extends React.Component {

    constructor(props){
        super(props);
        this.records = [];
    }
    county = "臺北市";
    countyList = ["新北市", "臺北市"]
    
    componentDidMount() {
        document.title = `Leaflet map`;
        this.myMap = L.map("mapid");

        // this.drawMap("新北市");
        this.drawMap("臺北市");

    }
    
    drawMap(county = "臺北市") {
        console.log("drawMap this")
        this.county = county;
        let self = this
        // self.myMap.setView([25.176111, 121.521389], 12);
        self.myMap.setView([25.017583090887207, 121.53981656206982], 12);
        
        const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        L.tileLayer(OSMUrl).addTo(self.myMap);

        // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker

        async function fetch_data() {
            const records = await api_service.fetchData('restaurant')
                .then(data => {
                    return data.records
                })
            self.add_records_to_map(records)
        }
        fetch_data();

    }
    add_records_to_map(records) {
        let self = this;
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
        function remove_child(className){
            const item = document.querySelector(className)
            while (item.firstChild) {
                item.removeChild(item.firstChild)
            }
        }
        remove_child('.leaflet-pane.leaflet-marker-pane')
        remove_child('.leaflet-pane.leaflet-shadow-pane')

        records.forEach((item, idx) => {
            // if (item.county !== "臺北市") return;
            // console.log(self)
            if (item.county !== self.county) return;

            let lat_lng = [];
            lat_lng.push(Number(item.lat));
            lat_lng.push(Number(item.lng));
            let marker = L.marker(lat_lng, { icon: colorIcon('green') }).addTo(self.myMap);
            // L.circle(lat_lng, {
            //     color: "green",
            //     fillColor: "lightgreen",
            //     fillOpacity: 0.5,
            //     radius: 5
            // }).addTo(self.myMap);
            marker.bindPopup(`<b>${item.name}</b>`);

        })
    }


    render() {
        // 設定 height 顯示地圖 ( 預設值 height : 0 )
        return (
            <div className="section">
                <div className="btn-container">

                    {this.countyList.map(item => {
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
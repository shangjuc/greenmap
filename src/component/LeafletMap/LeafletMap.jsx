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
    componentDidMount() {
        document.title = `Leaflet map`;
        const myMap = L.map("mapid").setView([25.176111, 121.521389], 10);

        const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

        L.tileLayer(OSMUrl).addTo(myMap);

        // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker
        
        function colorIcon(color = 'green'){
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

        async function fetch_data() {
            const records = await api_service.fetchData('restaurant')
                .then(data=>{
                    return data.records
                })
            add_records_to_map(records)
        }
        fetch_data();

        function add_records_to_map(records){

            records.forEach((item,idx)=>{
                if (item.county !== "臺北市") return;

                let lat_lng = [];
                lat_lng.push(Number(item.lat));
                lat_lng.push(Number(item.lng));
                let marker = L.marker(lat_lng, { icon: colorIcon('green') }).addTo(myMap);
                L.circle(lat_lng, {
                    color: "red",
                    fillColor: "#f03",
                    fillOpacity: 0.5,
                    radius: 10
                }).addTo(myMap);
                marker.bindPopup(`<b>${item.name}</b>`);
    
            })
        }
    }

    render() {
        // 設定 height 顯示地圖 ( 預設值 height : 0 )
        return (
            <div className="map-container">
                <div id="mapid" style={{ minHeight: "500px" }} />
            </div>

        )
        
    }
}



export default LeafletMap;
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
        const mymap = L.map("mapid").setView([25.176111, 121.521389], 10);

        const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

        L.tileLayer(OSMUrl).addTo(mymap);

        // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker
        const greenIcon = new L.Icon({
            iconUrl:
                "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        const blueIcon = new L.Icon({
            iconUrl:
                "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
            shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });


        async function fetch_data() {
            const records = await api_service.fetchData('restaurant')
                .then()
            add_records_to_map(records)
        }
        fetch_data();

        function add_records_to_map(records){

            records.forEach((item,idx)=>{
                if (item.county != "臺北市") return;

                let latlng = [];
                latlng.push(Number(item.lat));
                latlng.push(Number(item.lng));
                let marker = L.marker(latlng, { icon: greenIcon }).addTo(mymap);
                L.circle(latlng, {
                    color: "red",
                    fillColor: "#f03",
                    fillOpacity: 0.5,
                    radius: 10
                }).addTo(mymap);
                marker.bindPopup(`<b>${item.name}</b>`);
    
            })
        }


        // const marker = L.marker([25.03418, 121.564517], { icon: blueIcon }).addTo(mymap);
        // L.circle([25.03418, 121.564517], {
        //     color: "red",
        //     fillColor: "#f03",
        //     fillOpacity: 0.5,
        //     radius: 10
        // }).addTo(mymap);
        // // marker.bindPopup("<b>Taipei 101</b><br>台北101").openPopup();
        // marker.bindPopup("<b>Taipei 101</b><br>台北101");


        // const marker2 = L.marker([25.176111, 121.521389], { icon: greenIcon }).addTo(
        //     mymap
        // );        
        // L.circle([25.176111, 121.521389], {
        //     color: "red",
        //     fillColor: "#f03",
        //     fillOpacity: 0.5,
        //     radius: 10
        // }).addTo(mymap);

        // // marker2.bindPopup("<b>大屯山</b><br>1092公尺").openPopup();
        // marker2.bindPopup("<b>大屯山</b><br>1092公尺");

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
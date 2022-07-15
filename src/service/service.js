const api_service = {}

api_service.getFetchUrl = function(type) {
    let urlStr;
    let urlHost = window.location.host;
    console.log(window.location)

    if(type === 'restaurant'){
        urlStr = 'https://data.epa.gov.tw/api/v2/gis_p_11?api_key=173d3da4-59b6-4ecd-9f0f-014af21b74b8&limit=1000&sort=ImportDate%20desc&format=json';
        if(urlHost.includes('localhost')){
            urlStr = 'http://localhost:3000/api/v2/gis_p_11?limit=1000&sort=ImportDate%20desc&format=json';
        } 
    }

    return urlStr;
}

api_service.fetchData = async function(type = 'restaurant') {
    let data;
    if (type === 'restaurant') {
        let restaurant_list = require('./restaurant_list.json');
        // console.log(restaurant_list)
        try {
            const records = await fetch(api_service.getFetchUrl(type))
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
            return records
        } catch {
            return restaurant_list.records;
        }
    }

    return data;
}


export default api_service
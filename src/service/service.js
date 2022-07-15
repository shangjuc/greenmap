const api_service = {}

api_service.getFetchUrl = function (type = 'restaurant') {
    let urlStr;
    // console.log(window.location)
    if (type === 'restaurant') {
        urlStr = 'https://data.epa.gov.tw/api/v2/gis_p_11';
        if (window.location.host.includes('localhost')) {
            urlStr = 'http://localhost:3000/api/v2/gis_p_11';
        }
    }

    return urlStr;
}

api_service.fetchData = async function (type = 'restaurant') {
    let data;
    let params = {
        api_key: "173d3da4-59b6-4ecd-9f0f-014af21b74b8",
        limit: 1000,
        sort: 'ImportDate desc',
        format: "json",
        offset: 990
    }

    if (type === 'restaurant') {
        let static_data = require('./restaurant_list.json');
        
        try { 
            const dynamic_data = await fetch( api_service.getFetchUrl(type) + "?" + new URLSearchParams(params), {
                method: 'GET',

            }).then(r => r.json())
                .then(function (resp) {
                    console.log(resp)
                    resp.records.forEach((item, idx) => {
                        item.id = idx + 1;
                    });
                    return resp;
                });
            return dynamic_data
        } catch {
            return static_data;
        }
    }

    return data;
}


export default api_service
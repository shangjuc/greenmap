const api_service = {}

const getFetchUrl = function (type = 'restaurant') {
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

api_service.fetchData = async function (type = 'restaurant', offset = 0, limit = 100) {
    let data;
    let params = {
        api_key: "173d3da4-59b6-4ecd-9f0f-014af21b74b8",
        limit: limit,
        // sort: 'ImportDate desc',
        sort: 'ImportDate asc',
        format: "json",
        offset: offset
    }

    if (type === 'restaurant') {
        let static_data = require('./restaurant_list.json');
        let url = getFetchUrl(type) + "?" + new URLSearchParams(params);
        try {
            const dynamic_data = await fetch(url, {
                method: 'GET',
            })
            .then(r => r.json())
            .then(function (resp) {
                // console.log(resp)
                resp.records.forEach((item, idx) => {
                    item.id = idx + 1;
                });
                return resp;
            });
            return dynamic_data
        } catch(err) {
            console.log(err)
            return static_data;
        }
    }

    return data;
}


export default api_service
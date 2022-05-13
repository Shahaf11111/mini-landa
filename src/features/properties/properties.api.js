import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_API_ACCESS_TOKEN,
    }
});

export async function listProperties(page = 1) {
    return axiosClient
        .get("/api/feed_properties", { params: { page_number: page } })
        .then((res) => res.data)
        .then(({ data }) => data.map(
            ({
                id,
                attributes: {
                    "static-data": { property_type },
                    address: { country, display },
                    status,
                    photos,
                }
            }) => ({
                id,
                details: {
                    type: property_type,
                    country,
                    address: display,
                    status,
                    photos,
                }
            })
        ));
}

export async function listPropertyIds(page = 1) {
    return axiosClient
        .get("/api/feed_properties", { params: { page_number: page } })
        .then((res) => res.data)
        .then(({ data }) => data.map(({ id }) => id));
}
// {
//     "type": "feed_properties",
//     "id": "US@8796PP-JNB",
//     "attributes": {
//         "ticker": "US@8796PP-JNB",
//         "status": "secondary",
//         "micro-address": "8796 Parliament",
//         "address": {
//             "country": "USA",
//             "city": "Jonesboro",
//             "street": "Parliament Place",
//             "display": "8796 Parliament Place, Jonesboro, GA 30238",
//             "house_number": "8796",
//             "neighborhood": "",
//             "state": "GA",
//             "zip_code": "30238"
//         },
//         "photos": [
//             "https://properties-static.landa.app/US@8796PP-JNB/photos/050-8796%20Parliament%20Pl_LO-RES-min.jpg",
//             "https://properties-static.landa.app/US@8796PP-JNB/photos/047-8796%20Parliament%20Pl_LO-RES-min.jpg",
//             "https://properties-static.landa.app/US@8796PP-JNB/photos/048-8796%20Parliament%20Pl_LO-RES-min.jpg",
//             "https://properties-static.landa.app/US@8796PP-JNB/photos/054-8796%20Parliament%20Pl_LO-RES-min.jpg",
//             "https://properties-static.landa.app/US@8796PP-JNB/photos/049-8796%20Parliament%20Pl_LO-RES-min.jpg",
//             "https://properties-static.landa.app/US@8796PP-JNB/photos/053-8796%20Parliament%20Pl_LO-RES-min.jpg",
//             "https://properties-static.landa.app/US@8796PP-JNB/photos/051-8796%20Parliament%20Pl_LO-RES-min.jpg",
//             "https://properties-static.landa.app/US@8796PP-JNB/photos/052-8796%20Parliament%20Pl_LO-RES-min.jpg"
//         ],
//         "eligible-states": [
//             "AL",
//             "AK",
//             "AZ",
//             "AR",
//             "CA",
//             "CO",
//             "CT",
//             "DE",
//             "DC",
//             "FL",
//             "GA",
//             "GU",
//             "HI",
//             "ID",
//             "IL",
//             "IN",
//             "IA",
//             "KS",
//             "KY",
//             "LA",
//             "ME",
//             "MD",
//             "MA",
//             "MI",
//             "MN",
//             "MS",
//             "MO",
//             "MT",
//             "NE",
//             "NV",
//             "NH",
//             "NJ",
//             "NM",
//             "NY",
//             "NC",
//             "ND",
//             "OH",
//             "OK",
//             "OR",
//             "PA",
//             "RI",
//             "SC",
//             "SD",
//             "TN",
//             "TX",
//             "UT",
//             "VT",
//             "VA",
//             "WA",
//             "WV",
//             "WI",
//             "WY"
//         ],
//         "static-data": {
//             "property_type": "Single Family Home",
//             "location": {
//                 "lng": -84.4065763,
//                 "lat": 33.5154577,
//                 "lon": -84.4065763
//             }
//         },
//         "ipo-stage": false,
//         "is-in-eviction-process": false
//     }
// }

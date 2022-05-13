import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_STOCKS_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export async function getStockPrice(propertyTicker) {
    return axiosClient
        .get(`/api/v1/stock/${propertyTicker}`)
        .then((res) => res.data);
}

import instance from "./axios.config";

const getBankByUserId = (userId) => {
    const URL_API = "/v1/api/getBankByUserId";
    const data = { userId }
    return instance.post(URL_API, data);
}

const getAllHistoryBank = () => {
    const URL_API = "/v1/api/history_money";
    return instance.get(URL_API);
}

export { getBankByUserId, getAllHistoryBank }
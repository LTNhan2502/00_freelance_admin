import instance from "./axios.config";

// API lấy ra ngân hàng mà user đã đăng kí
const getBankByUserId = (userId) => {
    const URL_API = "/v1/api/getBankByUserId";
    const data = { userId }
    return instance.post(URL_API, data);
}

// API lấy ra tất cả lịch sử bank 
const getAllHistoryBank = () => {
    const URL_API = "/v1/api/history_money";
    return instance.get(URL_API);
}

const updateAmountDeposit = (userId, statusDeposit, deposit) => {
    const URL_API = "/v1/api/update-amout-deposit";
    const data = { userId, statusDeposit, deposit };
    return instance.post(URL_API, data);
}

// API thêm lịch sử rút, nạp tiền
const addBankingHistory = (money, status, userId) => {
    const URL_API = 'v1/api/historyBank';
    const data = { money, status, userId }
    return instance.post(URL_API, data)
} 

export { getBankByUserId, getAllHistoryBank, updateAmountDeposit, addBankingHistory }
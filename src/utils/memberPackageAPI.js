import instance from "../utils/axios.config";

const getAllMemberPackage = () => {
   const URL_API = "/v1/api/member";
   return instance.get(URL_API);
}

const CreateMemberPackage = (packageName, price, distribution, discountFrom, discountTo) => {
   const URL_API = "/v1/api/member";
   const data = { packageName, price, distribution, discountFrom, discountTo }
   return instance.post(URL_API, data);
};

const DeleteMemberPackage = (memberId) => {
   const URL_API = "/v1/api/member";
   const data = { memberId }
   return instance.delete(URL_API, data);
};

export { getAllMemberPackage, CreateMemberPackage, DeleteMemberPackage }
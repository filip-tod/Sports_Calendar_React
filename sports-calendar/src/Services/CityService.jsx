import http from "../http-common";

const getCitys = ()=> {
    return http.get("/City")
};

const CityService  ={
    getCitys
}

export default CityService;
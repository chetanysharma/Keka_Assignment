import AxiosConfig from "./axiosConfigClass";
import baseURL from "./base";


function commonServiceAPI() {
    let common = new AxiosConfig(baseURL.common);
    return common;
}

export { commonServiceAPI };
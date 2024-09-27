import axios from "axios";

const api_url = "http://localhost:9696/api/users";

class UserService {


    getUsers(page = 0, size = 5,filters ={}){
        return axios.get(api_url,{
            params:{
                page: page,
                size: size,
                ...filters
            }
        });
    }


}

export default new UserService();



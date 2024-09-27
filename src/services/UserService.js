import axios from "axios";

const api_url = "http://localhost:9696/api/users";

class UserService {

    getUsers(){
        return axios.get(api_url);
    }

}

export default new UserService();

import axios from "axios";

const api_url_users = "http://localhost:9696/api/all";

class FetchAllUsers{

    getAllUsers(){
        return axios.get(api_url_users);
    }

    getAllProjects(){
        return axios.get(api_url_users)
    }

}

export default new FetchAllUsers();
import axios from "axios";

const api_url = "http://localhost:9696/api/users";

class UserService {

     // Fetch all users without pagination
     getUsersWithoutPagination() {
        return axios.get(api_url);
    }


    getUsers(page = 0, size = 5,filters ={}){
        return axios.get(api_url,{
            params:{
                page: page,
                size: size,
                ...filters
            }
        });
    }


    // New saveUser method to send the new user data to the backend
    saveUser(user){
        return axios.post(api_url,user);
    }

    // Update user data
    updateUser(id,user){
        return axios.put(`${api_url}/${id}`,user);
    }

    // Delete user
    deleteUser(id){
        return axios.delete(`${api_url}/${id}`);
    }


}

export default new UserService();



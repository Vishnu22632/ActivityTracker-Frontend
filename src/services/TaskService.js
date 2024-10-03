import axios from "axios";

const api_url_task = "http://localhost:9696/api/tasks";

class TaskService{

    getTasks(){
        return axios.get(api_url_task);
    }

    saveTask(task) {
       
        console.log(task);
    
        return axios.post(api_url_task, task);
    }

     // Delete user
     deleteTask(id){
        return axios.delete(`${api_url_task}/${id}`);
    }


    // Update user data
    updateTask(id,task){
        return axios.put(`${api_url_task}/${id}`,task);
    }



}

export default new TaskService();
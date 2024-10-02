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

}

export default new TaskService();
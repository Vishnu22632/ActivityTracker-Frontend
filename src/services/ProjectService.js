import axios from "axios";

const api_url_project = "http://localhost:9696/api/projects";

class ProjectService{

    getProjects(){
        return axios.get(api_url_project);
    }

    saveProject(project) {
        console.log(project);
        return axios.post(api_url_project, project);
    }

}

export default new ProjectService();
import axios from "axios";

const api_url_projects = "http://localhost:9696/api/all/projects";

class FetchAllProjects{

    
    getAllProjects(){
        return axios.get(api_url_projects);
    };

}

export default new FetchAllProjects();
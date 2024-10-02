import axios from "axios";

const api_url_project = "http://localhost:9696/api/projects";

class ProjectService{



    getProjects(page = 0, size = 5){
        return axios.get(api_url_project,{
            params: {
                page: page,
                size: size
            }
        });
    }


    // getProjects(){
    //     return axios.get(api_url_project);
    // }

    saveProject(project) {
        console.log(project);
        return axios.post(api_url_project, project);
    }

     // Delete project
     deleteProject(id){
        return axios.delete(`${api_url_project}/${id}`);
    }

    
    // Update project
    updateProject(id,project){
        return axios.put(`${api_url_project}/${id}`,project);
    }


}

export default new ProjectService();
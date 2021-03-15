import axios from "axios";

class BackendAPIDAO {
    
    // apiUrl = "https://ppm3xcxj70.execute-api.ca-central-1.amazonaws.com/dev";
    apiUrl = "https://ie02iiqgq9.execute-api.ca-central-1.amazonaws.com/dev";
    static myInstance = null;


    static getInstance() {
        if (BackendAPIDAO.myInstance == null) {
            BackendAPIDAO.myInstance = new BackendAPIDAO();
        }
        return this.myInstance;
    }

    post(request) {
        const api = request.api;
        const requestBody = request.requestBody;
        const serviceCallback = request.serviceCallback;
        const jwt = request.jwt;

        let headers = {}
        if(jwt !== undefined) {
				headers= { "Authorization": jwt, } ;
        }
        axios.post(this.apiUrl + "/" + api, requestBody, {headers})
        .then(response => {
            // manipulate the response here
                serviceCallback({status: response.status, data: response.data, message: 'success'});
          })
        .catch(error => {
            // manipulate the error response here
            serviceCallback({status: -1, data: {}, message: error.message});
        });
    }


    get(request) {
        const api = request.api;
        const serviceCallback = request.serviceCallback;
        const jwt = request.jwt;

        axios.get(this.apiUrl + "/" + api)
			.then(response => {
				// manipulate the response here
				serviceCallback({status: response.status, data: response.data, message: 'success'});
			})
			.catch(error => {
				// manipulate the error response here
				serviceCallback({status: -1, data: {}, message: error.message});
			}); 
    }

}
 
export default BackendAPIDAO;
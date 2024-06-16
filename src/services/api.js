import axios from 'axios'
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export default {
    get(endpoint) {
        var Token = localStorage.getItem('authtoken')
        var headerData = {
            headers: {
                Authorization: `Bearer ` + Token
            },
        }
        try {
            return axios.get(BASE_URL + endpoint, headerData);
        } catch (err) {
            return err;
        }
    },
    login(endpoint, body) {
        var headerData = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
        }
        try {
            return axios.post(BASE_URL + endpoint, body, headerData).then(response => {
                return response
            })
        }
        catch (err) {
            return err;
        }
    },
    post(endpoint, body) {
        var Token = localStorage.getItem('authtoken')
        var headerData = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ` + Token
            },
        }
        try {
            return axios.post(BASE_URL + endpoint, body, headerData).then(response => {
                return response
            })
        } catch (err) {
            return err;
        }
    },
    postJSON(endpoint, body) {
        var Token = localStorage.getItem('authtoken')
        var headerData = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ` + Token
            },
        }
        try {
            return axios.post(BASE_URL + endpoint, body, headerData).then(response => {
                return response
            })
        } catch (err) {
            return err;
        }
    },
    put(endpoint, body) {
        var Token = localStorage.getItem('authtoken')
        var headerData = {
            headers: {
                Authorization: `Bearer ` + Token
            },
        }
        try {
            return axios.put(BASE_URL + endpoint, body, headerData).then(response => {
                return response
            })
        } catch (err) {
            return err;
        }

    },
    delete(endpoint) {
        var Token = localStorage.getItem('authtoken')
        var headerData = {
            headers: {
                Authorization: `Bearer ` + Token
            },
        }
        return axios.delete(BASE_URL + endpoint, headerData).then(response => {
            return response
        })
    },
    patch(endpoint, body) {
        var Token = localStorage.getItem('authtoken')
        var headerData = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ` + Token
            },
        }
        try {
            return axios.patch(BASE_URL + endpoint, body, headerData).then(response => {
                return response
            })
        } catch (err) {
            return err;
        }
    },
    uploadImageorFile(endpoint, body){
        var formdata = new FormData();
        var Token = localStorage.getItem('authtoken')
        formdata.append("file_url", body.file_url, body.file_url.name);
        var headerData = {
            headers: {
                Authorization: `Bearer ` + Token
            },
            body: formdata
        };
        return axios.post(BASE_URL + endpoint, headerData).then(response => {
            return response
        })
        
    }
}
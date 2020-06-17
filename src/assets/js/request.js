import axios from "axios";
let serverUrl = "/api";

export default {
    get(url) {
        return new Promise((resolve, reject) => {
            axios.get(serverUrl + url).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(serverUrl + url, data).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
}
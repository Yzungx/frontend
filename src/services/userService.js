import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    console.log({ email: userEmail, password: userPassword });
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

export { handleLoginApi }

import axios from "../axios"

//check tren db login
const handleLoginApi = (userEmail, userPassword) => {
    console.log({ email: userEmail, password: userPassword });
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}
//get data tren db
const getAllUser = (inputId) => {
    //method get ~ query param
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

// getAllUserFromReact
const createNewUserService = (data) => {
    console.log('check data create new user', data);
    //bug
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // console.log('check data create new user', data);
    //bug
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        }
    })

}
export {
    handleLoginApi,
    getAllUser,
    createNewUserService,
    deleteUserService,
}

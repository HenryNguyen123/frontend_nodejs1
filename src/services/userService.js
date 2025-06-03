// import axios from 'axios'
import axios from '../setup/axios'

const registerUser = (email, name, userName, password, phone) => {
    return axios.post("/register", {
        email, name, userName, password, phone
    })
}

const loginUser = async(userName, password) => {
    return await axios.post( '/login', {
        userName, password
    }, {withCredentials: true})
}

const fetchAllUsers = async(page, limit) => {
    return await axios.get( `/user/show?page=${page}&limit=${limit}`, {withCredentials: true})
}

const deleteUser = async (item) => {
    return await axios.delete( `/user/delete`,
                            {data: {id: item.id}})
}

const createAddNewUser = async (userName, password, email, phone, name, address, gender, group) => {
    return await axios.post( '/user/create', {
        userName, password, email, phone, name, address, gender, group
    })
}

const handlefetchOneUser = async (id) => {
        return await axios.post( '/user/get-user', {id})
}

const fetchEditUser = async (userId, name, address, gender, group)=> {
    return await axios.put( '/user/update', {
        userId, name, address, gender, group
    })
}
export {registerUser, loginUser, fetchAllUsers, deleteUser, createAddNewUser, handlefetchOneUser, fetchEditUser}
import axios from 'axios'

const registerUser = (email, name, userName, password, phone) => {
    return axios.post(import.meta.env.VITE_LOCALHOST_API +"/register", {
        email, name, userName, password, phone
    })
}

const loginUser = async(userName, password) => {
    return await axios.post(import.meta.env.VITE_LOCALHOST_API + '/login', {
        userName, password
    })
}

const fetchAllUsers = async(page, limit) => {
    return await axios.get(import.meta.env.VITE_LOCALHOST_API + `/user/show?page=${page}&limit=${limit}`)
}

const deleteUser = async (item) => {
    return await axios.delete(import.meta.env.VITE_LOCALHOST_API + `/user/delete`,
                            {data: {id: item.id}})
}

const createAddNewUser = async (userName, password, email, phone, name, address, gender, group) => {
    return await axios.post(import.meta.env.VITE_LOCALHOST_API + '/user/create', {
        userName, password, email, phone, name, address, gender, group
    })
}

const handlefetchOneUser = async (id) => {
        return await axios.post(import.meta.env.VITE_LOCALHOST_API + '/user/get-user', {id})
}

const fetchEditUser = async (userId, name, address, gender, group)=> {
    return await axios.put(import.meta.env.VITE_LOCALHOST_API + '/user/update', {
        userId, name, address, gender, group
    })
}
export {registerUser, loginUser, fetchAllUsers, deleteUser, createAddNewUser, handlefetchOneUser, fetchEditUser}
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

export {registerUser, loginUser, fetchAllUsers, deleteUser}
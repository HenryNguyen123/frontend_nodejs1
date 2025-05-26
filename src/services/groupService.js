import axios from 'axios'

const getGroupAxios =async ()=> {
    return await axios.get(import.meta.env.VITE_LOCALHOST_API + '/group')
}

export { getGroupAxios}
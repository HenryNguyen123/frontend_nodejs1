// import axios from 'axios'
import axios from '../setup/axios'

const getGroupAxios =async ()=> {
    return await axios.get('/group')
}

export { getGroupAxios}
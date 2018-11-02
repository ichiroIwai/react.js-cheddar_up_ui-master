
import axios from 'axios'

axios.defaults.baseURL = `${process.env.REACT_APP_RAILS_PATH}api/`
axios.defaults.withCredentials = true

export default axios

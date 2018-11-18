import axios from 'axios'
import qs from 'qs'
import * as Sentry from '@sentry/browser'
const AXIOS = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    transformRequest: [
        data => {
            return qs.stringify(data, { arrayFormat: 'brackets' })
        }
    ]
})

AXIOS.interceptors.response.use(
    response => response.data,
    error => {
        const response = error.response
        // Sentry.withScope(scope => {
        //     scope.setTag('fetch', error.message)
        //     scope.setLevel('warning')
        //     Sentry.captureException(error)
        // })
        if (!response || !response.data || !response.data.message) {
            return Promise.reject({ message: '未知错误' })
        }
        return Promise.reject({ message: response.data.message })
    }
)

export default AXIOS

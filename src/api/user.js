import AXIOS from 'helpers/fetch'

const BASE_URL = '/auth'

export const fetchLogin = payload =>
    AXIOS({
        url: `${BASE_URL}/user`,
        method: 'post',
        data: payload
    })

/**
 * 获取用户信息，鉴权接口
 */
export const fetchAuth = () =>
    AXIOS({
        url: `${BASE_URL}/current`
    })

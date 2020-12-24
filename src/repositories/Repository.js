import axios from 'axios'
import throttle from 'lodash/throttle'

const baseUrl = process.env.VUE_APP_API_URL

const options = {
    baseURL: baseUrl,
    headers: {
        'content-type': 'application/json',
    },
}

const axiosInstance = axios.create(options)

const STATUS_UNAUTHORIZED = 401
// const STATUS_TOKEN_EXPIRED = 402;
// const STATUS_CODE_FORBIDDEN = 403;
const STATUS_SUCCESS = 200
const STATUS_INTERNAL_SERVER_ERROR = 500
import get from 'lodash/get'
import TokenService from '@/helpers/token'

const sendRefreshToken = async () => {
    const response = await axios.post(
        `${baseUrl}/auth/refresh-token`,
        {},
        {
            headers: {
                Authorization: `Bearer ${TokenService.getRefreshToken()}`,
            },
        },
    )
    if (response?.data?.code === STATUS_SUCCESS) {
        // update localStorage
        TokenService.setToken(response?.data?.data?.accessToken?.token)

        TokenService.setTokenExpiredAt(response?.data?.data?.accessToken?.expiredAt)
        TokenService.setRefreshToken(response?.data?.data?.refreshToken?.token)
        TokenService.setRefreshTokenExpiredAt(
            response?.data?.data?.refreshToken?.expiredAt,
        )
        // TokenService.setUser(response?.data?.data?.profile)
    } else {
        // await logout()
    }
}
const throttled = throttle(sendRefreshToken, 10000, { trailing: false })
axiosInstance.interceptors.request.use(async request => {
    const token = TokenService.getToken()
    const tokenExpiredAt = +TokenService.getTokenExpiredAt()
    if (token && tokenExpiredAt && tokenExpiredAt <= new Date().getTime()) {
        // Token expired, check refresh token
        const refreshToken = TokenService.getRefreshTokenExpiredAt()
        const refreshTokenExpiredAt = +TokenService.getRefreshTokenExpiredAt()
        if (
            !refreshToken ||
            !refreshTokenExpiredAt ||
            refreshTokenExpiredAt <= new Date().getTime()
        ) {
            // await logout()
        } else {
            // check refresh token ok, call refresh token api
            await throttled()
        }
    }
    // set authorization
    request.headers = {
        ...TokenService.getHeader(),
    }
    return request
})

axiosInstance.interceptors.response.use(
    async response => {
        if (response.data.code === STATUS_UNAUTHORIZED) {
            localStorage.clear()
        }
        if (response && response.data) {
            response.data.success = STATUS_SUCCESS === response.data.code
            return response.data
        }
        return {
            error: true,
            message: get(response, 'data.message', ''),
            status: get(response, 'data.code', STATUS_INTERNAL_SERVER_ERROR),
            errors: get(response, 'data.errors', []),
        }
    },
    async error => {
        if (error.response) {
            return {
                error: true,
                status: STATUS_INTERNAL_SERVER_ERROR,
                message: get(error, 'message', ''),
                errors: get(error, 'response.data', {}),
            }
        }
        if (error.request) {
            return {
                error: true,
                status: STATUS_INTERNAL_SERVER_ERROR,
                message: get(error, 'message', ''),
                errors: get(error, 'request', {}),
            }
        }
        return {
            error: true,
            status: STATUS_INTERNAL_SERVER_ERROR,
            message: get(error, 'message', ''),
        }
    },
)
export default axiosInstance

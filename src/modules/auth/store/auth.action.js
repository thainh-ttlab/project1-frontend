import AuthRepository from '../../../repositories/AuthRepository'
import TokenService from '@/helpers/token'

const authAction = {
    signIn: async context => {
        const response = await AuthRepository.signIn(context.state.loginParams)
        if (!response?.success) {
            // login error
            // context.commit('SET_LOGIN_PARAM', {
            //     loginSuccess: false,
            //     loginErrorMessage: response?.message,
            // })
            return response
        }
        const token = response?.data?.accessToken?.token || null
        const refreshToken = response?.data?.refreshToken?.token || null
        const tokenExpiredAt = response?.data?.accessToken?.expiredAt || null
        const refreshTokenExpiredAt = response?.data?.refreshToken?.expiredAt || null
        TokenService.setToken(token)
        TokenService.setTokenExpiredAt(tokenExpiredAt)
        TokenService.setRefreshToken(refreshToken)
        TokenService.setRefreshTokenExpiredAt(refreshTokenExpiredAt)
        delete response?.data?.accessToken
        delete response?.data?.refreshToken
        TokenService.setUser(response?.data)
        return response
    },
    setParamSignIn: async (context, params) => {
        context.commit('SET_LOGIN_PARAM', params)
    },
}

export default authAction

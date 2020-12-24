import Repository from './Repository'
import TokenService from '@/helpers/token'

const resource = `${Repository.defaults.baseURL}/auth`

export default {
    async list(params) {
        const response = await Repository.get(`${resource}`, {
            params,
            headers: TokenService.getHeader(),
        })
        return response
    },

    async signIn(params) {
        const response = await Repository.post(`${resource}/sign-in`, params, {
            headers: TokenService.getHeader(),
        })
        return response
    },
    async signUp(params) {
        const response = await Repository.post(`${resource}/sign-up`, params, {
            // headers: TokenService.getHeader(),
        })
        return response
    },
}

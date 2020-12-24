import state from './auth.state'
import mutations from './auth.mutation'
import actions from './auth.action'
import getters from './auth.getter'

export const auth = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}

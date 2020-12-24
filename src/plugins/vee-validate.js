import Vue from 'vue'
import {
    ValidationProvider,
    ValidationObserver,
    extend,
    setInteractionMode,
} from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'

Object.keys(rules).forEach(rule => {
    extend(rule, {
        ...rules[rule], // copies rule configuration
        message: messages[rule], // assign message
    })
})
setInteractionMode('lazy')
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

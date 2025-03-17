import {authService} from '@/services/auth.service'

export default {
    namespaced: true,
    state: {
        user: null,
        token: localStorage.getItem('token'),
        isLoggedIn: false,
        lastAuthError: null //
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_LOGGED_IN(state, value) {
            state.isLoggedIn = value
        },
        SET_ERROR(state, error) {
            state.lastAuthError = error
        }
    },
    actions: {
        async login({commit}, credentials) {
            try {
                const response = await authService.login(credentials)
                const {data} = response


                if (data.error) {
                    console.error('Login failed:', data.error)
                    commit('SET_ERROR', data.error)
                    throw new Error(data.error.message || 'Login failed')
                }

                if (!data.result && !data.token) {
                    console.error('Invalid API response format:', data)
                    throw new Error('Invalid response from server')
                }

                commit('SET_USER', data.result?.user || data.user)
                commit('SET_TOKEN', data.result?.apikey || data.apikey)
                commit('SET_LOGGED_IN', true)
                commit('SET_ERROR', null)

                localStorage.setItem('token', data.result?.apikey || data.apikey)
                localStorage.setItem('isLoggedIn', JSON.stringify(true))

                console.log('Login successful for user:', data.result?.user?.email || data.user?.email)
                return data
            } catch (error) {
                console.error('Login error:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                })

                const errorMessage = error.response?.data?.error?.message
                    || error.message
                    || 'Authentication failed'

                commit('SET_ERROR', {
                    message: errorMessage,
                    code: error.response?.data?.error?.code || 'UNKNOWN'
                })

                throw error
            }
        },

        async signup({commit}, userData) {
            try {
                console.log('Signup attempt for:', {
                    email: userData.email,
                    firstName: userData.first_name
                })

                const {data} = await authService.register(userData)

                console.log('Signup API response:', data)

                if (data.error) {
                    console.error('Signup failed:', data.error)
                    commit('SET_ERROR', data.error)
                    throw new Error(data.error.message || 'Signup failed')
                }


                console.log('Signup successful for user:', data.result?.user?.email || data.user?.email)
                return data
            } catch (error) {
                console.error('Signup error:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                    validationErrors: error.response?.data?.error?.details || []
                })

                const errorMessage = error.response?.data?.error?.message
                    || error.message
                    || 'Registration failed'

                commit('SET_ERROR', {
                    message: errorMessage,
                    code: error.response?.data?.error?.code || 'UNKNOWN',
                    details: error.response?.data?.error?.details || []
                })

                throw error
            }
        }
    },
    getters: {
        getLastAuthError: state => state.lastAuthError,
        isAuthenticated: state => state.isLoggedIn && !!state.token
    }
}
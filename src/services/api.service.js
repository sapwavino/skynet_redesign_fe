import api from '@/config/axios'

export default class ApiService {
    constructor(resource) {
        this.resource = resource
    }

    get(endpoint) {
        return api.get(`${this.resource}${endpoint}`)
    }

    post(endpoint, data) {
        return api.post(`${this.resource}${endpoint}`, data)
    }

    put(endpoint, data) {
        return api.put(`${this.resource}${endpoint}`, data)
    }

    delete(endpoint) {
        return api.delete(`${this.resource}${endpoint}`)
    }
}
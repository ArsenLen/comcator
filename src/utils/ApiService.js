import axios from 'axios'
import _ from 'lodash'
import serializeFormData from './serializeFormData'
import MyStorage from './Storage'

export default class ApiService {
  static apiBase = `${process.env.API_URL}/api`
  static APP_URL = process.env.APP_URL
  static uploadURL = 'http://localhost:8888/teztender/files?access_token=kH1Z3DmmfjOpFbQZkbpGnZkT'

  static instance () {
    return axios.create({
      baseURL: ApiService.apiBase
      // transformRequest:
    })
  }

  static async createToken () {
    const token = await axios.get(`${this.APP_URL}/api/create_token`)
      .then(res => res.data.token)
    MyStorage.setToken(token)
    return token
  }

  static async registration (data) {
    if (data instanceof FormData) {
      data = serializeFormData(data)
    }
    return axios.post(`${this.APP_URL}/api/registration`, data)
      .then(res => {
        if (_.get(res, 'data.data.token')) {
          const userData = res.data.data
          MyStorage.setToken(userData.token)
          MyStorage.setUser(userData)
          return userData
        }
        return res
      })
  }

  static async login (data) {
    if (data instanceof FormData) {
      data = serializeFormData(data)
    }
    return this.request('POST', '/auth/authenticate', { data })
      .then(res => res.data)
      .then(({ data }) => {
        MyStorage.setToken(data.token)
        MyStorage.setUser(data.user)
        return data
      })
  }

  static async deleteTender (id) {
    return ApiService.instance().delete(`/tenders/${id}`)
  }

  static async addRate (id, formData) {
    return ApiService.instance().post(`/tenders/${id}/bid`, formData)
  }

  static async getRate (id) {
    return ApiService.instance().get(`/tenders/${id}/bid`).then(res => res.data)
  }

  static async deleteRate (id) {
    return ApiService.instance().delete(`/tenders/${id}/bid`)
  }

  static async user (id) {
    return ApiService.instance().get(`/users/${id}`)
  }

  static async category (id) {
    const storage = MyStorage.getCategories()
    if (storage) {
      return _.find(storage, { id })
    }
    return ApiService.instance().get(`/categories/${id}`).then(res => res.data)
  }

  static async location (id) {
    const storage = MyStorage.getLocations()
    if (storage) {
      return _.find(storage, { id })
    }
    return ApiService.instance().get(`/locations/${id}`).then(res => res.data)
  }

  static async logout () {
    return ApiService.instance().get('/logout')
  }

  static baseURL = process.env.API_URL

  static async request (method = 'GET', url, extra) {
    const headers = {}

    const token = MyStorage.getToken()
    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    return axios({
      method,
      baseURL: this.baseURL,
      url,
      headers,
      ...extra
    })
  }

  static async tenders () {
    return this.request('GET', '/items/tenders?sort=-created_on')
      .then(res => res.data)
      .then(d => d.data)
      .catch(() => [])
  }

  static async tender (id) {
    return this.request('GET', `/items/tenders/${id}?fields=*.*`)
      .then(res => res.data)
      .then(d => d.data)
  }

  static async createTender (data) {
    delete data.filepond
    return this.request('POST', '/items/tenders', {
      data,
      params: {
        access_token: MyStorage.getToken()
      }
    })
  }

  static async categories () {
    const storage = MyStorage.getCategories()
    if (storage) {
      return storage
    }
    return this.request('GET', '/items/categories?filter[parent][null]&fields=*.*')
      .then(res => res.data)
      .then(data => {
        MyStorage.setCategories(data.data)
        return data.data
      })
  }

  static async locations () {
    const storage = MyStorage.getLocations()
    if (storage) {
      return storage
    }
    return this.request('GET', '/items/locations?filter[parent][null]&fields=*.*')
      .then(res => res.data)
      .then(data => {
        MyStorage.setLocations(data.data)
        return data.data
      })
  }

  static async me () {
    return this.request('GET', '/users/me?fields=id,first_name,last_name,email,role.name')
      .then(res => {
        if (_.get(res, 'data.data')) {
          MyStorage.setUser(res.data.data)
          return res.data.data
        }
        return res.data
      })
  }

  static async page (id) {
    return this.request('GET', `/items/pages/${id}?fields=id,title,content`)
      .then(res => res.data)
      .then(d => d.data)
  }
}

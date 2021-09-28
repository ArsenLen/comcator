import axios from 'axios'
import serializeFormData from '../utils/serializeFormData'
import normalizePhone from '../utils/normalizePhone'
import MyStorage from '../utils/Storage'
import uuid from '../utils/uuid'

export default class ServiceApi {
  static API_BASE = 'https://comcator.com/api/public/v1'
  static UPLOAD_URL = 'https://comcator.com/api/public/v1/files'

  static async login (data) {
    if (data instanceof window.FormData) {
      data = serializeFormData(data)
    }
    const phone = normalizePhone(data.phone)
    return this.request('POST', '/auth/authenticate', {
      data: {
        email: `${phone}@m.m`,
        password: data.password
      }
    })
      .then(res => {
        if (res.data?.token) {
          res.data.data.token = res.data.token
        }
        return res.data
      })
      .then(({ data }) => {
        MyStorage.setToken(data.token)
        MyStorage.setUser(data.user)
        return data
      })
  }

  static async logout () {
    this.request('POST', '/auth/logout', { data: {} })
  }

  static async registration (data) {
    if (data instanceof window.FormData) {
      data = serializeFormData(data)
    }
    const user = await this.createUser({
      phone: data.phone,
      name: data.name
    }, data.password)
    await this.addSubscriber({
      user_id: user.id,
      category: data.category,
      location: data.location,
      messenger: data.messenger,
      whatsapp_phone: data.whatsapp_phone
    })
    return user
  }

  static async createUser (data, password) {
    const token = uuid()
    const phone = normalizePhone(data.phone)
    const userData = {
      email: `${phone}@m.m`,
      email_notifications: false,
      status: 'active',
      role: 3,
      first_name: data.name,
      last_name: data.phone,
      token,
      password
    }

    return this.request('POST', '/users', { data: userData })
      .then(res => {
        MyStorage.setToken(userData.token)
        MyStorage.setUser(userData)
        return {
          ...res.data.data,
          token
        }
      })
  }

  static async me () {
    return this.request('GET', '/users/me?fields=id,first_name,last_name,email,role', {
      params: {
        access_token: MyStorage.getToken()
      }
    })
      .then(res => {
        if (res.data?.data) {
          MyStorage.setUser(res.data.data)
          return res.data.data
        }
        return res.data
      })
      .catch(() => {
        MyStorage.removeItems(['user', 'token'])
      })
  }

  static async getTenders (limit) {
    return this.request('GET', '/items/tenders?sort=-created_on&filter[status][eq]=published' + '&limit=' + limit)
      .then(r => r.data.data)
      // .catch(() => [])
  }

  static async getTender (id) {
    return this.request('GET', `/items/tenders/${id}?fields=*.*`)
      .then(r => r.data.data)
  }

  static async createTender (data) {
    return this.request('POST', '/items/tenders', {
      data
    })
      .then(r => r.data.data)
  }

  static async getCategories () {
    const storage = MyStorage.getCategories()

    if (Array.isArray(storage)) {
      return storage
    }

    return this.request('GET', '/items/categories?fields=*.*&filter[parent][null]=1')
      .then(r => {
        const items = r.data.data
        MyStorage.setCategories(items)
        return items
      })
  }

  static async getLocations () {
    const storage = MyStorage.getLocations()
    if (Array.isArray(storage)) {
      return storage
    }
    return this.request('GET', '/items/locations?fields=*.*&filter[parent][null]=1')
      .then(r => {
        const items = r.data.data
        MyStorage.setLocations(items)
        return items
      })
  }

  static async getSettings () {
    const storage = MyStorage.getSettings()

    if (storage) {
      return storage
    }

    return this.request('GET', '/items/settings', {
      params: {
        single: true
      }
    })
      .then(r => r.data.data)
      .then(data => {
        MyStorage.setSettings(data)
        return data
      })
  }

  static async getBanners () {
    const storage = MyStorage.getBanners()

    if (storage) {
      return storage
    }

    return this.request('GET', '/items/banners', {
      params: {
        fields: 'status,location,image.data,image_ky.data,image_kz.data'
      }
    })
      .then(r => r.data.data)
      .then(arr => {
        const modified = arr
          .filter(item => item.status === 'published')
          .map(({ status, image, image_ky, image_kz, location }) => ({
            url: image.data.full_url,
            url_ky: image_ky.data.full_url,
            url_kz: image_kz.data.full_url,
            status,
            location
          }))
        MyStorage.setBanners(modified)
        return modified
      })
  }

  static async getPage (id) {
    return this.request('GET', `/items/pages/${id}?fields=id,title,title_ky,title_kz,content,content_ky,content_kz`)
      .then(res => res.data)
      .then(d => d.data)
  }

  static async getRate (tenderId) {
    const user = MyStorage.getUser()
    return this.request('GET', '/items/rates', {
      params: {
        'filter[tender][eq]': tenderId,
        'filter[user_id][eq]': user.id,
        single: 1
      }
    })
      .then(res => res.data.data)
  }

  static async deleteRate (tenderId) {
    const bid = await this.getRate(tenderId)
    if (bid) {
      return this.request('DELETE', `/items/rates/${bid.id}`)
    }
    return Promise.reject(new Error('Not found bid'))
  }

  static async addRate (tenderId, data) {
    if (data instanceof window.FormData) {
      data = serializeFormData(data)
    }
    const user = MyStorage.getUser()

    return this.request('POST', '/items/rates', {
      data: {
        ...data,
        tender: tenderId,
        user_id: user.id
      }
    })
      .then(res => res.data.data)
  }

  static async getSubscriberByUserId (id) {
    return this.request('GET', '/items/subscribers', {
      params: {
        'filter[user_id][eq]': id,
        single: true
      }
    })
      .then(res => res.data.data)
  }

  static async addSubscriber (data) {
    if (data instanceof window.FormData) {
      data = serializeFormData(data)
    }

    return this.request('POST', '/items/subscribers', { data })
      .then(res => res.data.data)
  }

  static async updateSubscription (id, data) {
    if (data instanceof window.FormData) {
      data = serializeFormData(data)
    }

    return this.request('PATCH', `/items/subscribers/${id}`, { data })
      .then(res => res.data.data)
  }

  static async forgotPassword (data) {
    if (data instanceof window.FormData) {
      data = serializeFormData(data)
    }
    return this.request('POST', '/custom/messenger/forgot-password', {
      data
    })
  }

  static async updateUser (id, data) {
    if (data instanceof window.FormData) {
      data = serializeFormData(data)
    }
    return this.request('PATCH', `/users/${id}`, {
      data
    })
      .then(res => res.data.data)
  }

  static async updatePassword (id, password) {
    return this.request('PATCH', `/users/${id}`, { data: { password } })
      .then(res => res.data.data)
  }

  static async request (method, url, extra) {
    const headers = {}

    // const token = MyStorage.getToken()
    // if (token) {
    //   headers.authorization = `Bearer ${token}`
    // }

    return axios({
      method,
      baseURL: this.API_BASE,
      url,
      headers,
      ...extra
    })
  }
}

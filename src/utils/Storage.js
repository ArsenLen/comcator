/**
 * Оптимизация запросов
 */
export default class MyStorage {
  static getItem (key, extra = { isJson: false, isSession: false }) {
    const { isJson, isSession } = extra
    try {
      const storage = isSession ? window.sessionStorage : window.localStorage
      const value = storage.getItem(key)
      if (value && isJson) {
        return JSON.parse(value)
      } else if (value) {
        return value
      }
      return null
    } catch {
      return null
    }
  }

  static setItem (key, value, extra = { isJson: false, isSession: false }) {
    const { isJson, isSession } = extra
    try {
      const storage = isSession ? window.sessionStorage : window.localStorage
      if (value && isJson) {
        storage.setItem(key, JSON.stringify(value))
      } else if (value) {
        storage.setItem(key, value)
      }
      return value
    } catch {
      return null
    }
  }

  static removeItems (items, extra = { isSession: false }) {
    const { isSession } = extra
    const storage = isSession ? window.sessionStorage : window.localStorage
    if (Array.isArray(items)) {
      items.forEach(item => storage.removeItem(item))
    } else {
      storage.removeItem(items)
    }
  }

  static getCategories () {
    const arr = MyStorage.getItem('categories', { isJson: true, isSession: true })
    if (Array.isArray(arr)) {
      return arr
    }
    return null
  }

  static setCategories (arr) {
    if (Array.isArray(arr)) {
      return MyStorage.setItem('categories', arr, { isJson: true, isSession: true })
    }
    return null
  }

  static getLocations () {
    const arr = MyStorage.getItem('locations', { isJson: true, isSession: true })
    if (Array.isArray(arr)) {
      return arr
    }
    return null
  }

  static setLocations (arr) {
    if (Array.isArray(arr)) {
      return MyStorage.setItem('locations', arr, { isJson: true, isSession: true })
    }
    return null
  }

  static getBanners () {
    const arr = MyStorage.getItem('banners', { isJson: true, isSession: true })
    if (Array.isArray(arr)) {
      return arr
    }
    return null
  }

  static setBanners (arr) {
    if (Array.isArray(arr)) {
      return MyStorage.setItem('banners', arr, { isJson: true, isSession: true })
    }
    return null
  }

  static getSettings () {
    const data = MyStorage.getItem('settings', { isJson: true, isSession: true })

    if (data) {
      return data
    }
    return null
  }

  static setSettings (data) {
    if (data) {
      return MyStorage.setItem('settings', data, { isJson: true, isSession: true })
    }
    return null
  }

  static getToken () {
    return MyStorage.getItem('token')
  }

  static setToken (token) {
    return MyStorage.setItem('token', token)
  }

  static getUser () {
    return MyStorage.getItem('user', { isJson: true })
  }

  static setUser (data) {
    return MyStorage.setItem('user', data, { isJson: true })
  }
}

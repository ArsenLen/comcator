const { get } = require('lodash')

export default function getErrorMessage (err) {
  if (get(err, 'response.data.message')) {
    return err.response.data.message
  }
  return err.message
}

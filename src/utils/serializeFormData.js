const serializeFormData = (formData) => {
  const jsonObject = {}

  for (const [key, value] of formData.entries()) {
    jsonObject[key] = value
  }
  return jsonObject
}

export default serializeFormData

export default function normalizeForm (form) {
  const formData = new FormData(form)
  const skipKeys = []
  const data = {}

  for (const [key, val] of formData.entries()) {
    if (key.includes('[]')) {
      if (skipKeys.includes(key)) continue

      data[key.replace('[]', '')] = formData.getAll(key)
      skipKeys.push(key)
    } else {
      data[key] = val
    }
  }
  return data
}

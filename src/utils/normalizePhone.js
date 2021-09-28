export default function normalizePhone (str) {
  return str.replace(/[^0-9]/g, '')
}

/**
 * Для информирования
 */
export default function errorHandler (err) {
  if (process.env.NODE_ENV === 'development') {
    console.dir(err)
  }
}

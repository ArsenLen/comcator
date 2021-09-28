import React from 'react'
import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import ServiceApi from '../services/ServiceApi'

const FilePondComponent = React.forwardRef((props, ref) => (
  <FilePond
    labelIdle="Перенести файл или <span class='filepond--label-action'>Выбрать</span>"
    {...props}
    ref={ref}
    server={{
      process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
        const formData = new window.FormData()
        formData.append(fieldName, file, file.name)

        const request = new window.XMLHttpRequest()
        request.open('POST', ServiceApi.UPLOAD_URL)

        request.upload.onprogress = (e) => {
          progress(e.lengthComputable, e.loaded, e.total)
        }

        request.onload = function () {
          if (request.status >= 200 && request.status < 300) {
            const json = JSON.parse(request.responseText)
            load(json.data.data.full_url)
          } else {
            error('oh no')
          }
        }
        request.send(formData)

        return {
          abort: () => {
            request.abort()
            abort()
          }
        }
      }
    }}
  />
))

export default FilePondComponent

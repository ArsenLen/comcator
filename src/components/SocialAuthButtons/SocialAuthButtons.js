import React from 'react'
import { faGoogle, faFacebook, faVk, faYandex } from '@fortawesome/free-brands-svg-icons'
import Icon from '../Icon'
import './SocialAuthButtons.css'

const SocialAuthButtons = () => {
  return (
    <div className="buttons SocialAuthButtons">
      <button className="button is-info fb">
        <Icon icon={faFacebook} />
        <span>Facebook</span>
      </button>
      <button className="button is-danger gl">
        <Icon icon={faGoogle} />
        <span>Google</span>
      </button>
      <button className="button is-info vk">
        <Icon icon={faVk} />
        <span>Vkontakte</span>
      </button>
      <button className="button is-warning ya">
        <Icon icon={faYandex} />
        <span>Yandex</span>
      </button>
    </div>
  )
}

export default SocialAuthButtons

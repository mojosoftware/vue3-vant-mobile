import { appName } from '@/constants'

export default function setPageTitle(name) {
  window.document.title = name ? `${appName()}` : appName()
}
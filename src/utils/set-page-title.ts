import { appName } from '@/constants'

export default function setPageTitle(name?: string): void {
  window.document.title = name ? `${i18n.global.t(`navbar.${name}`)} - ${appName()}` : appName()
}

import { appName } from '@/constants'

export default function setPageTitle(name?: string): void {
  window.document.title = name ? `${appName()}` : appName()
}

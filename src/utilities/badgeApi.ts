declare const navigator: any
declare const window: any

// See https://web.dev/badging-api/ for details.

export function getSupportVersion(): string {
  if ("setAppBadge" in navigator) return "v3"
  if ("setExperimentalAppBadge" in navigator) return "v2"
  if ("ExperimentalBadge" in window) return "v1"
  return ""
}

export function getIsSupported(): boolean {
  return Boolean(getSupportVersion())
}

export function setBadge(count: number) {
  if (navigator.setAppBadge) {
    navigator.setAppBadge(count)
  } else if (navigator.setExperimentalAppBadge) {
    navigator.setExperimentalAppBadge(count)
  } else if (window.ExperimentalBadge) {
    window.ExperimentalBadge.set(count)
  }
}

export function clearBadge() {
  if (navigator.clearAppBadge) {
    navigator.clearAppBadge()
  } else if (navigator.clearExperimentalAppBadge) {
    navigator.clearExperimentalAppBadge()
  } else if (window.ExperimentalBadge) {
    window.ExperimentalBadge.clear()
  }
}

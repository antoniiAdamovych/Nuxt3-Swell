import { ref } from 'vue'

export const sharedString = ref(0)

export function updateSharedString(newValue) {
  sharedString.value += newValue
}

export function setSharedString(newValue) {
  sharedString.value = newValue
}
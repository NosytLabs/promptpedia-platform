/**
 * Toast Notification System
 * Centralized toast utilities for consistent notifications
 */

export type ToastType = "success" | "error" | "info" | "warning"

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

// Simple in-memory toast queue
let toastQueue: Toast[] = []
let listeners: ((toasts: Toast[]) => void)[] = []
let toastId = 0

export function subscribe(listener: (toasts: Toast[]) => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function notifyListeners() {
  listeners.forEach((listener) => listener(toastQueue))
}

export function addToast(toast: Omit<Toast, "id">) {
  const id = String(toastId++)
  const newToast = { ...toast, id }
  toastQueue = [...toastQueue, newToast]
  notifyListeners()

  // Auto-remove after duration
  if (toast.duration !== 0) {
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 5000)
  }

  return id
}

export function removeToast(id: string) {
  toastQueue = toastQueue.filter((t) => t.id !== id)
  notifyListeners()
}

export function clearToasts() {
  toastQueue = []
  notifyListeners()
}

// Convenience functions
export function success(message: string, title = "Success") {
  return addToast({ type: "success", title, message })
}

export function error(message: string, title = "Error") {
  return addToast({ type: "error", title, message, duration: 7000 })
}

export function info(message: string, title = "Info") {
  return addToast({ type: "info", title, message })
}

export function warning(message: string, title = "Warning") {
  return addToast({ type: "warning", title, message, duration: 6000 })
}

export function loading(message: string, title = "Loading") {
  return addToast({ type: "info", title, message, duration: 0 })
}

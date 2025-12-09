let triggerToast = null;

export function registerToast(fn) {
  triggerToast = fn;
}

export function toast(message, type = "info") {
  if (triggerToast) {
    triggerToast(message, type);
  } else {
    console.warn("ToastProvider not mounted yet");
  }
}

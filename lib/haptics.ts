export function haptic(pattern: number | number[] = 20) {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(pattern);
  } catch {
    // Haptics are optional and unsupported on some iPhone/Safari versions.
  }
}

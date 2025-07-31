import { useCallback } from 'react';

export function useFeedback() {
  const triggerFeedback = useCallback(() => {
    if (import.meta.env.VITE_FEEDBACK_AB === 'true') {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(200);
      }
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          osc.frequency.value = 440;
          osc.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.5);
        } catch {
          // ignore
        }
      }
    }
  }, []);

  return { triggerFeedback };
}

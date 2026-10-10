// Looping clips play only while on screen, and never on their own for people
// who asked for reduced motion — they get the native controls instead.
const videos = document.querySelectorAll<HTMLVideoElement>('video[data-motion-video]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  videos.forEach((video) => {
    video.controls = true;
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const video = target as HTMLVideoElement;
        if (isIntersecting) {
          // Autoplay can still be refused (e.g. low-power mode); the poster stays up.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );
  videos.forEach((video) => observer.observe(video));
}

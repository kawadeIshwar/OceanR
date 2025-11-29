import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Wrapper component for scroll animations
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {string} props.animation - Animation type (fade-in, fade-in-up, zoom-in, etc.)
 * @param {string} props.delay - Optional delay class (delay-100, delay-200, etc.)
 * @param {string} props.duration - Optional duration class (duration-fast, duration-normal, duration-slow)
 * @param {number} props.threshold - Intersection observer threshold (0-1)
 * @param {boolean} props.triggerOnce - Whether to trigger animation only once
 * @param {string} props.className - Additional CSS classes
 */
const ScrollAnimation = ({
  children,
  animation = 'fade-in-up',
  delay = '',
  duration = '',
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}) => {
  const [ref, isVisible] = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  const animationClasses = [
    animation,
    delay,
    duration,
    isVisible ? 'visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={animationClasses}>
      {children}
    </div>
  );
};

export default ScrollAnimation;

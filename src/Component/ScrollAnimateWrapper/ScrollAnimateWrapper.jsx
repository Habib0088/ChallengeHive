import { cloneElement } from 'react';
import useScrollAnimation from '../../hook/useScrollAnimation';

const ScrollAnimateWrapper = ({ 
  children, 
  animation = 'fade-in-up', 
  delay = 0, 
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  className = '',
  ...props 
}) => {
  const [elementRef, isVisible] = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
    delay
  });

  const animationClass = `${animation} ${isVisible ? 'animate' : ''} ${className}`;

  // If children is a single element, clone it with the ref and animation class
  if (children && typeof children === 'object' && children.type) {
    return cloneElement(children, {
      ref: elementRef,
      className: `${children.props.className || ''} ${animationClass}`.trim(),
      ...props
    });
  }

  // Otherwise, wrap in a div
  return (
    <div ref={elementRef} className={animationClass} {...props}>
      {children}
    </div>
  );
};

export default ScrollAnimateWrapper;
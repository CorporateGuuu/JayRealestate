import { Variants } from 'framer-motion';

// Animation configuration respecting user preferences
export const getAnimationConfig = () => {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return {
      enabled: !prefersReducedMotion,
      duration: prefersReducedMotion ? 0 : undefined,
      transition: prefersReducedMotion ? { duration: 0 } : undefined
    };
  }
  return { enabled: true };
};

// Enhanced easing curves for 60fps premium feel - JAY Real Estate
export const easings = {
  // Natural easing curves for premium UX
  smooth: [0.25, 0.1, 0.25, 1],
  natural: [0.4, 0.0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],

  // Spring animations optimized for 60fps
  spring: { type: 'spring', stiffness: 120, damping: 18, mass: 0.8 },
  springBounce: { type: 'spring', stiffness: 200, damping: 22, mass: 0.6 },
  springGentle: { type: 'spring', stiffness: 80, damping: 20, mass: 1 },

  // Premium springs for luxury feel
  premium: { type: 'spring', stiffness: 300, damping: 30, mass: 0.5 },
  premiumSoft: { type: 'spring', stiffness: 150, damping: 25, mass: 0.8 },

  // JAY Real Estate signature easing
  jaySignature: [0.25, 0.46, 0.45, 0.94]
} as const;

// Enhanced page transition animations - 60fps optimized
export const pageTransitions: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.96
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easings.natural,
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.96,
    transition: {
      duration: 0.5,
      ease: easings.easeInOut
    }
  }
};

// Scroll-triggered animations
export const scrollAnimations: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.easeOut,
      staggerChildren: 0.15
    }
  }
};

// Enhanced stagger container for sequential animations - JAY Real Estate
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slightly slower for premium feel
      delayChildren: 0.2,
      duration: 0.8,
      ease: easings.natural
    }
  }
};

// Enhanced individual stagger items with 60fps optimization
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.94
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easings.natural
    }
  }
};

// Fast stagger for property cards
export const staggerItemFast: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.easeOut
    }
  }
};

// Enhanced property card hover animations - 60fps optimized
export const propertyCardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      duration: 0.3,
      ease: easings.natural
    }
  },
  hover: {
    scale: 1.03,
    y: -12,
    rotateX: 1,
    rotateY: 1,
    boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.15), 0 25px 25px -12px rgba(37, 99, 235, 0.08)',
    transition: {
      duration: 0.4,
      ease: easings.spring
    }
  }
};

// Image zoom effect for property cards
export const imageZoom: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.easeOut
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.6,
      ease: easings.easeOut
    }
  }
};

// Enhanced button animations with JAY branding - 60fps optimized
export const buttonAnimations: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)',
    transition: {
      duration: 0.25,
      ease: easings.natural
    }
  },
  hover: {
    scale: 1.05,
    y: -2,
    boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.15), 0 10px 10px -5px rgba(37, 99, 235, 0.08)',
    transition: {
      duration: 0.25,
      ease: easings.spring
    }
  },
  tap: {
    scale: 0.97,
    y: 0,
    transition: {
      duration: 0.15,
      ease: easings.easeOut
    }
  },
  success: {
    scale: [1, 1.1, 1],
    backgroundColor: '#10b981',
    transition: {
      duration: 0.6,
      ease: easings.spring
    }
  },
  error: {
    x: [-5, 5, -5, 5, 0],
    backgroundColor: '#ef4444',
    transition: {
      duration: 0.5,
      ease: easings.easeOut
    }
  }
};

// Loading animations
export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

export const loadingDots: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: easings.easeInOut
    }
  }
};

// Form field animations
export const formFieldFocus: Variants = {
  rest: {
    scale: 1,
    borderColor: '#d1d5db',
    boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)',
    transition: {
      duration: 0.2,
      ease: easings.easeOut
    }
  },
  focus: {
    scale: 1.02,
    borderColor: '#2563eb',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
    transition: {
      duration: 0.2,
      ease: easings.easeOut
    }
  }
};

// Navigation animations
export const navItemHover: Variants = {
  rest: {
    scale: 1,
    color: '#6b7280',
    transition: {
      duration: 0.2,
      ease: easings.easeOut
    }
  },
  hover: {
    scale: 1.05,
    color: '#2563eb',
    transition: {
      duration: 0.2,
      ease: easings.easeOut
    }
  }
};

// Mobile menu animations
export const mobileMenuSlide: Variants = {
  closed: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easings.easeInOut
    }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Enhanced widget animations for JAY Real Estate
export const widgetBounce: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
    y: 30,
    rotate: -10
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 1.2 // Delayed entrance for better UX
    }
  }
};

export const widgetPulse: Variants = {
  animate: {
    scale: [1, 1.08, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: easings.easeInOut,
      repeatDelay: 1
    }
  }
};

// WhatsApp widget specific animation (bottom-right, z-9999)
export const whatsappWidgetAnimation: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
    x: 20,
    y: 20
  },
  animate: {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      delay: 1.5
    }
  }
};

// Chatbot widget specific animation (bottom-left, z-9998)
export const chatbotWidgetAnimation: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
    x: -20,
    y: 20
  },
  animate: {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 22,
      delay: 1.8
    }
  }
};

// Counter animation for numbers
export const counterAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easings.easeOut }
};

// Parallax scroll effect
export const parallaxScroll = (offset: number = 0.5) => ({
  y: offset,
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 30
  }
});

// Gallery transition animations
export const galleryTransitions: Variants = {
  enter: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: easings.easeOut
    }
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easings.easeOut
    }
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: easings.easeOut
    }
  }
};

// Search results animation
export const searchResultsAnimation: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: easings.easeInOut
    }
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
      staggerChildren: 0.05
    }
  }
};

// Success/Error state animations
export const statusAnimations: Variants = {
  success: {
    scale: [1, 1.2, 1],
    backgroundColor: ['#10b981', '#059669', '#10b981'],
    transition: {
      duration: 0.6,
      ease: easings.easeOut
    }
  },
  error: {
    x: [-10, 10, -10, 10, 0],
    backgroundColor: ['#ef4444', '#dc2626', '#ef4444'],
    transition: {
      duration: 0.6,
      ease: easings.easeOut
    }
  }
};

// Ripple effect for buttons
export const rippleEffect = {
  initial: {
    scale: 0,
    opacity: 0.5
  },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut
    }
  }
};

// Hero text reveal animations
export const heroTextReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    skewY: 7
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOut,
      staggerChildren: 0.2
    }
  }
};

// Floating elements animation
export const floatingAnimation: Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easings.easeInOut
    }
  }
};

// Progress bar animation
export const progressBarFill: Variants = {
  initial: {
    width: '0%'
  },
  animate: {
    width: '100%',
    transition: {
      duration: 1.5,
      ease: easings.easeOut
    }
  }
};

// Dropdown reveal animation
export const dropdownReveal: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: easings.easeInOut
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    scale: 1,
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
      staggerChildren: 0.05
    }
  }
};

// Filter tag animations
export const filterTagAnimation: Variants = {
  initial: {
    scale: 0,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.easeInOut
    }
  }
};

const animations = {
  pageTransitions,
  scrollAnimations,
  staggerContainer,
  staggerItem,
  propertyCardHover,
  imageZoom,
  buttonAnimations,
  loadingSpinner,
  loadingDots,
  formFieldFocus,
  navItemHover,
  mobileMenuSlide,
  widgetBounce,
  widgetPulse,
  counterAnimation,
  parallaxScroll,
  galleryTransitions,
  searchResultsAnimation,
  statusAnimations,
  rippleEffect,
  heroTextReveal,
  floatingAnimation,
  progressBarFill,
  dropdownReveal,
  filterTagAnimation,
  easings,
  getAnimationConfig
};

export default animations;

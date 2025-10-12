import { useEffect, RefObject } from 'react';

declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

interface OwlCarouselConfig {
  animateOut?: string;
  animateIn?: string;
  loop?: boolean;
  margin?: number;
  nav?: boolean;
  autoHeight?: boolean;
  autoplayHoverPause?: boolean;
  smartSpeed?: number;
  autoplay?: number | boolean;
  navText?: string[];
  responsive?: Record<number, { items: number }>;
}

export const useOwlCarousel = (
  ref: RefObject<HTMLElement>,
  config?: OwlCarouselConfig
) => {
  useEffect(() => {
    const initCarousel = () => {
      const $ = window.jQuery || window.$;
      
      if (!$ || !ref.current) return;

      const $element = $(ref.current);
      
      // Destroy existing instance if any
      if ($element.data('owl.carousel')) {
        $element.trigger('destroy.owl.carousel');
        $element.removeClass('owl-loaded owl-drag');
      }

      // Default configuration for main slider
      const defaultConfig: OwlCarouselConfig = {
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        loop: true,
        margin: 0,
        nav: true,
        autoHeight: true,
        autoplayHoverPause: true,
        smartSpeed: 500,
        autoplay: 6000,
        navText: [
          '<span class="fa fa-angle-left"></span>',
          '<span class="fa fa-angle-right"></span>',
        ],
        responsive: {
          0: { items: 1 },
          600: { items: 1 },
          800: { items: 1 },
          1024: { items: 1 },
          1200: { items: 1 },
        },
      };

      const finalConfig = { ...defaultConfig, ...config };

      // Initialize carousel
      try {
        $element.owlCarousel(finalConfig);
      } catch (error) {
        console.error('Error initializing Owl Carousel:', error);
      }
    };

    // Check if jQuery and Owl Carousel are loaded
    const checkAndInit = () => {
      if (window.jQuery && window.jQuery.fn.owlCarousel) {
        initCarousel();
      } else {
        // Retry after a short delay
        const timeout = setTimeout(checkAndInit, 100);
        return () => clearTimeout(timeout);
      }
    };

    const cleanup = checkAndInit();

    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup();
      
      const $ = window.jQuery || window.$;
      if ($ && ref.current) {
        const $element = $(ref.current);
        if ($element.data('owl.carousel')) {
          $element.trigger('destroy.owl.carousel');
          $element.removeClass('owl-loaded owl-drag');
        }
      }
    };
  }, [ref, config]);
};

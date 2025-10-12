declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

/**
 * Reinitialize all Owl Carousel instances on the page
 * Useful for dynamically loaded content or modal previews
 */
export const reinitializeCarousels = () => {
  const $ = window.jQuery || window.$;
  
  if (!$ || !$.fn.owlCarousel) {
    console.warn('jQuery or Owl Carousel not loaded');
    return;
  }

  // Main slider carousel
  $('.main-slider-carousel').each(function() {
    const $carousel = $(this);
    
    // Destroy existing instance
    if ($carousel.data('owl.carousel')) {
      $carousel.trigger('destroy.owl.carousel');
      $carousel.removeClass('owl-loaded owl-drag');
    }

    // Reinitialize
    $carousel.owlCarousel({
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
    });
  });

  // Testimonial carousel
  $('.testimonial-carousel').each(function() {
    const $carousel = $(this);
    
    if ($carousel.data('owl.carousel')) {
      $carousel.trigger('destroy.owl.carousel');
      $carousel.removeClass('owl-loaded owl-drag');
    }

    $carousel.owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 500,
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1024: { items: 2 },
        1200: { items: 3 },
      },
    });
  });
};

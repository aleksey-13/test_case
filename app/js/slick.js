(function () {
  const sliderContainer = $('#slider');

  const sliderImages = [
    'slider_img_1.png',
    'slider_img_2.jpg',
    'slider_img_3.jpg'
  ];

  const slides = [];

  // Create slides
  sliderImages.forEach((img) => {
    const slide = $('<div/>')
      .addClass('header__slider-slide')
      .css({
        'background-image': `url('../images/${img}')`
      });

    slides.push(slide);
  });

  sliderContainer.append(slides);

  sliderContainer.slick({
    arrows: false,
    autoplay: true,
    fade: true,
    infinite: true,
    autoplaySpeed: 5000,
    speed: 1000
  });
})();

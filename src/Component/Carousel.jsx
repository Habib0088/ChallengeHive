import React, { useState, useEffect } from 'react';
import ScrollAnimateWrapper from './ScrollAnimateWrapper/ScrollAnimateWrapper';
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/src/assets/contest announcement.jpg',
      heading: 'Join Epic Coding Challenges',
      paragraph: 'Compete with developers worldwide and showcase your programming skills in exciting contests that push your limits.',
      buttonText: 'Start Competing'
    },
    {
      id: 2,
      image: '/src/assets/ChallengeHive.png',
      heading: 'Build Your Developer Portfolio',
      paragraph: 'Create impressive projects, solve complex problems, and build a portfolio that stands out to potential employers.',
      buttonText: 'View Contests'
    },
    {
      id: 3,
      image: '/src/assets/contest announcement.jpg',
      heading: 'Learn & Grow Together',
      paragraph: 'Connect with a community of passionate developers, learn new technologies, and grow your skills through collaboration.',
      buttonText: 'Join Community'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${
              index === currentSlide ? 'active' : ''
            } ${
              index === (currentSlide - 1 + slides.length) % slides.length ? 'prev' : ''
            } ${
              index === (currentSlide + 1) % slides.length ? 'next' : ''
            }`}
          >
            <div className="slide-background">
              <img src={slide.image} alt={slide.heading} />
              <div className="slide-overlay"></div>
            </div>
            
            <div className="slide-content">
              <div className="content-wrapper">
                <ScrollAnimateWrapper animation="fade-in-down" delay={300}>
                  <h1 className="slide-heading">{slide.heading}</h1>
                </ScrollAnimateWrapper>
                <ScrollAnimateWrapper animation="fade-in-up" delay={500}>
                  <p className="slide-paragraph">{slide.paragraph}</p>
                </ScrollAnimateWrapper>
                <ScrollAnimateWrapper animation="scale-in" delay={700}>
                  <button className="slide-button">
                    {slide.buttonText}
                    <span className="button-arrow">→</span>
                  </button>
                </ScrollAnimateWrapper>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <ScrollAnimateWrapper animation="fade-in-left" delay={800}>
        <button className="carousel-nav prev-btn" onClick={prevSlide}>
          <span>‹</span>
        </button>
      </ScrollAnimateWrapper>
      <ScrollAnimateWrapper animation="fade-in-right" delay={800}>
        <button className="carousel-nav next-btn" onClick={nextSlide}>
          <span>›</span>
        </button>
      </ScrollAnimateWrapper>

      {/* Dots Indicator */}
      <ScrollAnimateWrapper animation="fade-in-up" delay={900}>
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </ScrollAnimateWrapper>
    </div>
  );
};

export default Carousel;
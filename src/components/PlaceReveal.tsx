import { useState } from "react";
import type { Place } from "../data/places";

interface PlaceRevealProps {
  place: Place;
  isLast: boolean;
  onNext: () => void;
}

export default function PlaceReveal({
  place,
  isLast,
  onNext
}: PlaceRevealProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const totalImages = place.images.length;

  const nextImage = () => {
    setCurrentImage((current) =>
      current === totalImages - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((current) =>
      current === 0
        ? totalImages - 1
        : current - 1
    );
  };

  /*
   * Find where each photo sits relative
   * to the currently selected photo.
   */
  const getPosition = (index: number) => {
    let difference =
      index - currentImage;

    // Make the carousel wrap around
    if (difference > totalImages / 2) {
      difference -= totalImages;
    }

    if (difference < -totalImages / 2) {
      difference += totalImages;
    }

    return difference;
  };

  return (
    <section className="screen">

      <div className="card reveal-card">

        <p className="eyebrow">
          ไขปริศนาสำเร็จ ♡
        </p>

        <h2>
          {place.title}
        </h2>

        <p className="place-description">
          {place.description}
        </p>

        {/* =================================
            FAN PHOTO CAROUSEL
        ================================= */}

        {totalImages > 0 && (
          <div className="fan-carousel">

            <div className="fan-stage">

              {place.images.map((image, index) => {

                const position =
                  getPosition(index);

                /*
                 * Only show the center photo
                 * and a few photos around it.
                 */
                const visible =
                  Math.abs(position) <= 3;

                if (!visible) {
                  return null;
                }

                return (
                  <button
                    key={image}
                    className={
                      `fan-photo fan-position-${position}`
                    }
                    onClick={() => {
                      if (position < 0) {
                        previousImage();
                      }

                      if (position > 0) {
                        nextImage();
                      }
                    }}
                    aria-label={`ดูรูปที่ ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${place.title} รูปที่ ${index + 1}`}
                    />
                  </button>
                );
              })}

              {/* Left arrow */}
              {totalImages > 1 && (
                <button
                  className="fan-arrow fan-arrow-left"
                  onClick={previousImage}
                  aria-label="รูปก่อนหน้า"
                >
                  ‹
                </button>
              )}

              {/* Right arrow */}
              {totalImages > 1 && (
                <button
                  className="fan-arrow fan-arrow-right"
                  onClick={nextImage}
                  aria-label="รูปถัดไป"
                >
                  ›
                </button>
              )}

            </div>

            {/* Counter */}

            <div className="fan-counter">
              {currentImage + 1} / {totalImages}
            </div>

            {/* Dots */}

            {totalImages > 1 && (
              <div className="carousel-dots">

                {place.images.map((_, index) => (
                  <button
                    key={index}
                    className={
                      `carousel-dot ${
                        index === currentImage
                          ? "active"
                          : ""
                      }`
                    }
                    onClick={() =>
                      setCurrentImage(index)
                    }
                    aria-label={`ไปที่รูปที่ ${index + 1}`}
                  />
                ))}

              </div>
            )}

          </div>
        )}

        <button
          className="primary-button"
          onClick={onNext}
        >
          {isLast
            ? "ไปยังหน้าสุดท้าย ♡"
            : "ไปดูความทรงจำต่อ →"}
        </button>

      </div>

    </section>
  );
}
import { useEffect, useRef, useState } from "react";
import { finalImages } from "../data/places";

interface FinalProps {
  message: string;
  name: string;
  onRestart: () => void;
}

const SLOT_COUNT = 29;

export default function Final({
  message,
  name,
  onRestart
}: FinalProps) {

  const [showMessage, setShowMessage] =
    useState(false);

  const [photoSlots, setPhotoSlots] =
    useState<string[]>(() => {

      if (finalImages.length === 0) {
        return [];
      }

      return Array.from(
        { length: SLOT_COUNT },
        (_, index) =>
          finalImages[
            index % finalImages.length
          ]
      );
    });

  const nextImageIndex = useRef(
    SLOT_COUNT
  );

  const currentSlot = useRef(0);


  /* =========================================
     SHOW MESSAGE
  ========================================= */

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

  }, []);


  /* =========================================
     CHANGE BACKGROUND PHOTOS
     
     Every 5 seconds:
     - fade one photo out
     - change its image
     - fade it back in
  ========================================= */

  useEffect(() => {

    if (finalImages.length === 0) {
      return;
    }

    const interval = setInterval(() => {

      const slot =
        currentSlot.current;

      const imageIndex =
        nextImageIndex.current %
        finalImages.length;


      /* Fade this particular photo out */

      const photoElement =
        document.querySelector(
          `.final-photo-${slot}`
        );

      if (photoElement) {
        photoElement.classList.add(
          "photo-hidden"
        );
      }


      /* Wait for fade-out */

      setTimeout(() => {

        setPhotoSlots((current) => {

          const updated = [...current];

          updated[slot] =
            finalImages[imageIndex];

          return updated;

        });


        nextImageIndex.current++;


        /*
         * Give React a moment to update
         * the image before fading it in.
         */

        requestAnimationFrame(() => {

          requestAnimationFrame(() => {

            const element =
              document.querySelector(
                `.final-photo-${slot}`
              );

            if (element) {
              element.classList.remove(
                "photo-hidden"
              );
            }

          });

        });

      }, 750);


      /* Move to next slot */

      currentSlot.current =
        (slot + 1) %
        SLOT_COUNT;

    }, 5000);


    return () => {
      clearInterval(interval);
    };

  }, []);


  return (

    <section className="final-screen">


      {/* =====================================
          BACKGROUND PHOTOS
      ===================================== */}

      <div className="final-photo-wall">

        {photoSlots.map(
          (image, index) => (

            <div
              key={index}
              className={`final-photo final-photo-${index}`}
            >

              <img
                src={image}
                alt="ความทรงจำของเรา"
              />

            </div>

          )
        )}

      </div>


      {/* =====================================
          DARK OVERLAY
      ===================================== */}

      <div className="final-photo-shade" />


      {/* =====================================
          LITTLE STARS
      ===================================== */}

      <div className="final-stars">

        {Array.from({
          length: 35
        }).map((_, index) => (

          <span
            key={index}
            style={{
              left:
                `${(index * 37) % 100}%`,

              top:
                `${(index * 61) % 100}%`,

              animationDelay:
                `${(index % 8) * 0.7}s`,

              animationDuration:
                `${4 + (index % 5)}s`
            }}
          >
            {index % 4 === 0
              ? "✦"
              : "·"}
          </span>

        ))}

      </div>


      {/* =====================================
          MESSAGE
      ===================================== */}

      <div
        className={`final-message-wrapper ${
          showMessage
            ? "final-message-visible"
            : ""
        }`}
      >

        <div className="final-message-card">

          <div className="final-small-heart">
            ♡
          </div>


          <p className="final-kicker">
            ความทรงจำทั้งหมดของเรา
          </p>


          <h1>
            สุขสันต์วันครบรอบ
            <br />
            1 ปีนะคะเบบี๋
          </h1>


          <div className="final-line" />


          <div className="final-message-text">
            {message}
          </div>


          <p className="final-love">
            รักนะ
            <br />
            {name}
          </p>


          <button
            className="final-replay"
            onClick={onRestart}
          >
            เล่นอีกม้ายยยยย
          </button>

        </div>

      </div>

    </section>

  );
}

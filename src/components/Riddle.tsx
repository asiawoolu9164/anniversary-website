import { useState, type FormEvent } from "react";
import type { Place } from "../data/places";

interface RiddleProps {
  place: Place;
  placeNumber: number;
  totalPlaces: number;
  onSolved: () => void;
}

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ");
}

export default function Riddle({
  place,
  placeNumber,
  totalPlaces,
  onSolved
}: RiddleProps) {

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const percentage = Math.round(
    (placeNumber / totalPlaces) * 100
  );

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userAnswer = normalize(answer);

    const correct = place.answers.some(
      (possibleAnswer) =>
        normalize(possibleAnswer) === userAnswer
    );

    if (correct) {

      setFeedback(
        "ถูกต้องแล้ว ♡ จำได้ด้วย เก่งมากเบบี๋"
      );

      setTimeout(() => {
        onSolved();
      }, 600);

    } else {

      setFeedback(
        "ยังไม่ใช่น้า... ลองนึกดูอีกครั้งเส้"
      );

    }
  };

  return (
    <section className="screen">

      <div className="card riddle-card">

        <div className="progress-row">

          <span>
            สถานที่ {placeNumber} จาก {totalPlaces}
          </span>

          <span>
            {percentage}%
          </span>

        </div>

        <div className="progress-track">

          <div
            className="progress-bar"
            style={{
              width: `${percentage}%`
            }}
          />

        </div>

        <p className="eyebrow">
          ความทรงจำกำลังรออยู่...
        </p>

        <h2>
          สถานที่นี้คือที่ไหนนะ?
        </h2>

        <div className="riddle-text">
          {place.riddle}
        </div>

        <form onSubmit={submit}>

          <label htmlFor="answer">
            คำตอบของเธอ
          </label>

          <div className="answer-row">

            <input
              id="answer"
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
              placeholder="พิมพ์คำตอบที่นี่..."
              autoComplete="off"
              required
            />

            <button
              className="primary-button"
              type="submit"
            >
              ตรวจคำตอบ ♡
            </button>

          </div>

        </form>

        <p
          className={
            `feedback ${
              feedback.includes("ยังไม่")
                ? "error"
                : "success"
            }`
          }
        >
          {feedback}
        </p>

      </div>

    </section>
  );
}
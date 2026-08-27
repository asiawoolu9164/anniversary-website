interface IntroProps {
  onStart: () => void;
}

export default function Intro({
  onStart
}: IntroProps) {
  return (
    <section className="screen">

      <div className="card intro-card">

        <div className="heart-icon">
          ♡
        </div>

        <p className="eyebrow">
          ของขวัญเล็ก ๆ สำหรับเธอ
        </p>

        <h1>
          Ayla + AmeAme
        </h1>

        <p className="intro-text">
          เค้ามีอะไรเล็ก ๆ น้อย ๆ
          อยากให้เธอลองทำดู
          <br />
          มีสถานที่สำคัญของเราซ่อนอยู่
          ในปริศนาเหล่านี้...
        </p>

        <p className="intro-hint">
          ลองนึกถึงเรื่องราวของเรา
          แล้วค่อย ๆ ไขปริศนาไปทีละข้อ
          <br />
          จนกว่าจะไปถึงจุดสุดท้ายของเรื่องราวนี้ 💗
        </p>

        <button
          className="primary-button"
          onClick={onStart}
        >
          เริ่มเรื่องราวของเรา ♡
        </button>

        <p className="music-note">
          ♫ เปิดเสียงเพื่อบรรยากาศที่ดีขึ้นนะ
        </p>

      </div>

    </section>
  );
}
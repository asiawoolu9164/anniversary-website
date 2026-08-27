interface MusicButtonProps {
  playing: boolean;
  onClick: () => void;
}

export default function MusicButton({
  playing,
  onClick
}: MusicButtonProps) {
  return (
    <button
      className={`music-toggle ${
        playing ? "playing" : ""
      }`}
      onClick={onClick}
      aria-label={
        playing
          ? "ปิดเพลง"
          : "เปิดเพลง"
      }
    >
      ♫
      <span>
        {playing
          ? " เพลงกำลังเล่น"
          : " เปิดเพลง"}
      </span>
    </button>
  );
}
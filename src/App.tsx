import { useEffect, useRef, useState } from "react";
import {
  places,
  anniversaryMessage,
  yourName
} from "./data/places";

import Intro from "./components/Intro";
import Riddle from "./components/Riddle";
import PlaceReveal from "./components/PlaceReveal";
import Final from "./components/Final";
import MusicButton from "./components/MusicButton";

import "./App.css";

type Screen =
  | "intro"
  | "riddle"
  | "reveal"
  | "final";

const playlist = [
  "/music/song_1.mp3",
  "/music/song_2.mp3",
  "/music/song_3.mp3"
];

function App() {
  const [screen, setScreen] =
    useState<Screen>("intro");

  const [currentPlace, setCurrentPlace] =
    useState<number>(() => {
      const saved = Number(
        localStorage.getItem(
          "anniversary-progress"
        )
      );

      return Number.isInteger(saved) &&
        saved >= 0 &&
        saved < places.length
        ? saved
        : 0;
    });

  const [musicPlaying, setMusicPlaying] =
    useState<boolean>(false);

  const [currentTrack, setCurrentTrack] =
    useState<number>(0);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const place = places[currentPlace];

  const startMusic = async (): Promise<void> => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setMusicPlaying(true);
    } catch {
      console.log(
        "Music could not start."
      );
    }
  };

  const playNextTrack = (): void => {
    setCurrentTrack((track) =>
      (track + 1) % playlist.length
    );
  };

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.7;

    if (!musicPlaying) return;

    audioRef.current.play().catch(() => {
      setMusicPlaying(false);
    });
  }, [currentTrack, musicPlaying]);

  const toggleMusic = async (): Promise<void> => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setMusicPlaying(true);
      } catch {
        console.log(
          "Music could not start."
        );
      }
    } else {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  };

  const startJourney = (): void => {
    startMusic();
    setScreen("riddle");
  };

  const solveRiddle = (): void => {
    setScreen("reveal");
  };

  const nextPlace = (): void => {
    const next =
      currentPlace + 1;

    localStorage.setItem(
      "anniversary-progress",
      String(next)
    );

    setCurrentPlace(next);

    if (next >= places.length) {
      setScreen("final");
    } else {
      setScreen("riddle");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const restart = (): void => {
    localStorage.setItem(
      "anniversary-progress",
      "0"
    );

    setCurrentPlace(0);
    setScreen("riddle");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="floating-hearts">
        {Array.from({ length: 12 }).map(
          (_, i) => (
            <span key={i}>
              {i % 2 === 0
                ? "♡"
                : "♥"}
            </span>
          )
        )}
      </div>

      <MusicButton
        playing={musicPlaying}
        onClick={toggleMusic}
      />

      <audio
        ref={audioRef}
        src={playlist[currentTrack]}
        preload="auto"
        onEnded={playNextTrack}
      />

      <main
        className={`app ${
          screen === "final" ? "app-final" : ""
        }`}
      >

        {screen === "intro" && (
          <Intro
            onStart={startJourney}
          />
        )}

        {screen === "riddle" &&
          place && (
            <Riddle
              place={place}
              placeNumber={
                currentPlace + 1
              }
              totalPlaces={
                places.length
              }
              onSolved={
                solveRiddle
              }
            />
          )}

        {screen === "reveal" &&
          place && (
            <PlaceReveal
              place={place}
              isLast={
                currentPlace ===
                places.length - 1
              }
              onNext={nextPlace}
            />
          )}

        {screen === "final" && (
  <Final
    message={anniversaryMessage}
    name={yourName}
    onRestart={restart}
  />
)}

      </main>
    </>
  );
}

export default App;

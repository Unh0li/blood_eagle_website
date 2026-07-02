"use client";

import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";

const AudioCtx = createContext(null);

const TRACKS = [
  {
    title: "Acid Rain Baptism",
    artist: "Lindex",
    url: "https://soundcloud.com/blood-eagle24/lindex-acid-rain-baptism",
  },
  {
    title: "Deathrow",
    artist: "Terror Rhythm",
    url: "https://soundcloud.com/terror-rhythm/deathrow",
  },
  {
    title: "Black Sun Ritual",
    artist: "Terror Rhythm",
    url: "https://soundcloud.com/terror-rhythm/black-sun-ritual",
  },
  {
    title: "Against All The Evil",
    artist: "R N T 13",
    url: "https://soundcloud.com/rnt13/r-n-t-13-against-all-the-evil",
  },
];

export function AudioProvider({ children }) {
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const isFirstTrack = useRef(true);
  const loadTokenRef = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [ready, setReady] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pending, setPending] = useState(false);

  // Widget se ustvari SAMO ENKRAT ob mountu. Nikoli več po tem.
  useEffect(() => {
    if (!iframeRef.current) return;
    let cancelled = false;

    const bindEvents = (widget) => {
      widget.bind(window.SC.Widget.Events.READY, () => {
        if (cancelled) return;
        widget.setVolume(volume * 100);
        widget.getDuration((ms) => {
          if (!cancelled) setDuration(ms);
        });
        setReady(true);
        setPending(false);
      });

      widget.bind(window.SC.Widget.Events.PLAY, () => {
        if (cancelled) return;
        setPlaying(true);
        setPending(false);
      });

      widget.bind(window.SC.Widget.Events.PAUSE, () => {
        if (cancelled) return;
        setPlaying(false);
        setPending(false);
      });

      widget.bind(window.SC.Widget.Events.FINISH, () => {
        if (cancelled) return;
        setTrackIndex((i) => (i + 1) % TRACKS.length);
      });

      widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data) => {
        if (!cancelled) setProgress(data.currentPosition);
      });
    };

    const init = () => {
      if (cancelled || !window.SC || !iframeRef.current) return;
      const widget = window.SC.Widget(iframeRef.current);
      widgetRef.current = widget;
      bindEvents(widget);
    };

    if (window.SC) {
      init();
    } else {
      const interval = setInterval(() => {
        if (window.SC) {
          clearInterval(interval);
          init();
        }
      }, 100);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // Menjava sledi: uporabi widget.load(), NE spreminjaj iframe src
  useEffect(() => {
    if (isFirstTrack.current) {
      isFirstTrack.current = false;
      return;
    }
    if (!widgetRef.current) return;

    const token = ++loadTokenRef.current;

    setReady(false);
    setPlaying(false);
    setPending(false);
    setProgress(0);
    setDuration(0);

    widgetRef.current.load(TRACKS[trackIndex].url, {
      auto_play: true,
      callback: () => {
        if (loadTokenRef.current !== token) return;
        setReady(true);
        widgetRef.current.getDuration((ms) => {
          if (loadTokenRef.current === token) setDuration(ms);
        });
      },
    });
  }, [trackIndex]);

  const toggle = useCallback(() => {
    if (!widgetRef.current || !ready || pending) return;
    setPending(true);
    if (playing) {
      widgetRef.current.pause();
    } else {
      widgetRef.current.play();
    }
  }, [playing, ready, pending]);

  const changeVolume = useCallback((v) => {
    setVolume(v);
    if (widgetRef.current && ready) widgetRef.current.setVolume(v * 100);
  }, [ready]);

  const seekTo = useCallback((ms) => {
    if (widgetRef.current && ready) widgetRef.current.seekTo(ms);
  }, [ready]);

  const selectTrack = useCallback((index) => {
    setTrackIndex(index);
  }, []);

  const nextTrack = useCallback(() => {
    selectTrack((trackIndex + 1) % TRACKS.length);
  }, [trackIndex, selectTrack]);

  const prevTrack = useCallback(() => {
    selectTrack((trackIndex - 1 + TRACKS.length) % TRACKS.length);
  }, [trackIndex, selectTrack]);

  const currentTrack = TRACKS[trackIndex];

  // Fiksen src, uporabljen SAMO za začetni mount. Kasneje se nikoli več ne spremeni.
  const initialSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    TRACKS[0].url
  )}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`;

  return (
    <AudioCtx.Provider
      value={{
        playing,
        toggle,
        pending,
        volume,
        changeVolume,
        seekTo,
        progress,
        duration,
        tracks: TRACKS,
        trackIndex,
        currentTrack,
        selectTrack,
        nextTrack,
        prevTrack,
        ready,
      }}
    >
      <iframe
        ref={iframeRef}
        src={initialSrc}
        allow="autoplay"
        style={{ display: "none" }}
        title="Blood Eagle audio player"
      />
      {children}
    </AudioCtx.Provider>
  );
}

export const useAudio = () => useContext(AudioCtx);
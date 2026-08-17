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
    artist: "Terror",
    url: "https://soundcloud.com/terror-rhythm/deathrow",
  },
  {
    title: "Black Sun Ritual",
    artist: "Terror",
    url: "https://soundcloud.com/terror-rhythm/black-sun-ritual",
  },
  {
    title: "Against All The Evil",
    artist: "R|N|T 13",
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
  /* widget se veze samo ob mountu, zato bi READY videl staro glasnost */
  const volumeRef = useRef(0.25);
  const [ready, setReady] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  /* widget samo enkrat */
  useEffect(() => {
    if (!iframeRef.current) return;
    let cancelled = false;

    const bindEvents = (widget) => {
      widget.bind(window.SC.Widget.Events.READY, () => {
        if (cancelled) return;
        widget.setVolume(volumeRef.current * 100);
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

      /* brez tega bi ob neuspesnem nalaganju obticali v pending za vedno
         in gumb bi ostal onemogocen brez pojasnila */
      widget.bind(window.SC.Widget.Events.ERROR, () => {
        if (cancelled) return;
        setPending(false);
        setPlaying(false);
        setFailed(true);
      });

      /* prozi veckrat na sekundo, UI kaze cele sekunde, zato dusimo */
      widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data) => {
        if (cancelled) return;
        setProgress((prev) =>
          Math.floor(data.currentPosition / 1000) === Math.floor(prev / 1000)
            ? prev
            : data.currentPosition
        );
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

  /* menjava skladbe */
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
    setFailed(false);

    widgetRef.current.load(TRACKS[trackIndex].url, {
      auto_play: true,
      callback: () => {
        if (loadTokenRef.current !== token) return;
        /* load() ponastavi glasnost widgeta, React pa drzi uporabnikovo, zato jo vrnemo */
        widgetRef.current.setVolume(volumeRef.current * 100);
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
    volumeRef.current = v;
    setVolume(v);
    if (widgetRef.current && ready) widgetRef.current.setVolume(v * 100);
  }, [ready]);

  const seekTo = useCallback((ms) => {
    if (widgetRef.current && ready) widgetRef.current.seekTo(ms);
  }, [ready]);

  const selectTrack = useCallback((index) => {
    setTrackIndex(index);
  }, []);

  const currentTrack = TRACKS[trackIndex];

  /* fiksen src, samo za prvi mount */
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
        ready,
        failed,
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
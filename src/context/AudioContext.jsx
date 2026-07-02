"use client"

import { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioCtx = createContext(null);

export function AudioProvider({ children }){
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.25);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const tryPlay = () => {
            if(!started && audioRef.current){
                audioRef.current.volume  = volume;
                audioRef.current.play().then(() => {
                    setPlaying(true);
                    setStarted(true);
                }).catch(() => {});
            }
            window.removeEventListener("click", tryPlay);
            window.removeEventListener("keydown", tryPlay);
        };
        window.addEventListener("click",tryPlay );
        window.addEventListener("keydown", tryPlay);
        return () => {
            window.removeEventListener("click", tryPlay);
            window.removeEventListener("keydown", tryPlay);
        };
    } , [started]);

    const toggle = () => {
        if(!audioRef.current) return;
        if(playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else{
            audioRef.current.play();
            setPlaying(true);
        }
    };

    const changeVolume = (v) => {
        setVolume(v);
        if (audioRef.current) audioRef.current.volume = v;
    };

    return (
        <AudioCtx.Provider value={{ playing, toggle, volume, changeVolume}}>
            <audio ref={audioRef} src="/audio/ambience.mp3" loop preload="auto" />
            {children}
        </AudioCtx.Provider>
    );
}

export const useAudio = () => useContext(AudioCtx);
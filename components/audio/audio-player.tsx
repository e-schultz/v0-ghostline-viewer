"use client"

import type React from "react"

import { useState, useEffect, useRef, memo } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { useAudio } from "@/context/audio-context"
import type { AudioPlayerProps } from "@/types/ghost"

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

function AudioPlayerComponent({ src, id, compact = false, duration = 0, onPlay }: AudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(duration)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { play, pause, isPlaying, registerAudio, unregisterAudio } = useAudio()

  // Register audio element with context
  useEffect(() => {
    if (audioRef.current) {
      console.log(`Registering audio element with ID: ${id}`)
      registerAudio(id, audioRef.current)
    }
    return () => {
      console.log(`Unregistering audio element with ID: ${id}`)
      unregisterAudio(id)
    }
  }, [id, registerAudio, unregisterAudio])

  // Update time as audio plays
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      console.log(`Audio loaded: ${id}, duration: ${audio.duration}`)
      setAudioDuration(audio.duration)
    }

    const handleError = (e: ErrorEvent) => {
      console.error(`Audio error for ${id}:`, e)
      setError(`Error loading audio: ${e.message}`)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("error", handleError as EventListener)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("error", handleError as EventListener)
    }
  }, [id])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const handlePlayPause = () => {
    if (isPlaying(id)) {
      pause()
    } else {
      console.log(`Attempting to play audio with ID: ${id}`)
      play(id)
      if (onPlay) onPlay()
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (compact) {
    return (
      <div className="flex items-center">
        <audio ref={audioRef} src={src} preload="metadata" />
        <button
          onClick={handlePlayPause}
          className="text-pink-500 hover:text-pink-300 p-1 rounded-full bg-pink-500/10 flex-shrink-0"
          aria-label={isPlaying(id) ? "Pause" : "Play"}
        >
          {isPlaying(id) ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <div className="ml-2 text-xs opacity-70">
          {formatTime(currentTime)} / {formatTime(audioDuration)}
        </div>
        {error && <div className="ml-2 text-xs text-red-500">{error}</div>}
      </div>
    )
  }

  return (
    <div className="w-full space-y-2">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-2">
        <button
          onClick={handlePlayPause}
          className="text-pink-500 hover:text-pink-300 p-1 rounded-full bg-pink-500/10 flex-shrink-0"
          aria-label={isPlaying(id) ? "Pause" : "Play"}
        >
          {isPlaying(id) ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs opacity-70 w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={audioDuration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-pink-500/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
            aria-label="Seek audio position"
          />
          <span className="text-xs opacity-70 w-10">{formatTime(audioDuration)}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleMute}
            className="text-pink-500 hover:text-pink-300 p-1 rounded-full bg-pink-500/10 flex-shrink-0"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-pink-500/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
            aria-label="Volume control"
          />
        </div>
      </div>
      {error && <div className="text-xs text-red-500">{error}</div>}
    </div>
  )
}

export const AudioPlayer = memo(AudioPlayerComponent)

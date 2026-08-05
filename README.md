# 📻 RADIONEST — Internet Radio Broadcast Studio & Console

**RADIONEST** is a full-featured Internet Radio Broadcast Station and Live Mixing Console built on **Bun** with **ZERO external npm dependencies**.

It transforms your browser into a professional radio studio with DJ Announcer Processing, Dual DJ Music Decks, Crossfader, Soundboard Cart Wall, Auto Talkover Ducking, Sound Isolation, and Live WebSocket ON-AIR broadcasting.

---

## 🚀 Quick Start

### 1. Start the Radio Station Server
```bash
bun --hot index.ts
# or
bun run index.ts
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run Test Suite
```bash
bun test
```

---

## 🌟 Station Console Features

- **🔴 ON-AIR Live WebSocket Broadcaster**:
  - Live broadcast room streams the entire radio station mix (DJ Mic + Deck A/B + Soundboard FX) to connected listeners in real time.
  - Listener count display.
- **🎙️ DJ Announcer Channel**:
  - **FM Bass Proximity Boost** (+0 to +15 dB @ 140Hz) for deep radio voice warmth.
  - **Voice Presence Peak** (+0 to +12 dB @ 3kHz) for vocal clarity.
  - **Broadcast Limiting Compressor** (1:1 to 20:1 ratio) for level-matched radio sound.
  - **Analog Tube Warmth** soft clipping saturation.
- **🛡️ Real-Time Background Sound Isolation & VAD**:
  - Eliminates room rumble (<85Hz), fan hiss (>7.5kHz), and ambient noise when DJ is idle.
- **🎧 Dual DJ Music Decks (Deck A & Deck B)**:
  - Load MP3, WAV, FLAC, OGG tracks on Deck A and Deck B.
  - Play, Pause, Time Seek bar, and Volume faders.
- **🎚️ Smooth Equal-Power Crossfader**:
  - Smooth crossfading between Deck A and Deck B.
- **🗣️ Auto Talkover Ducking Engine**:
  - Automatically ducks (lowers) Deck A/B music by `-14 dB` when DJ speaks into the mic. Fades smoothly back up when DJ finishes speaking.
- **💥 Soundboard Jingle Cart Wall (Zero Audio File Dependencies)**:
  - Programmatic Web Audio SFX pads:
    - 📣 **AIRHORN**
    - ⚡ **NEWS STINGER**
    - 🚨 **SIREN**
    - 💥 **IMPACT DROP**
    - 📻 **STATION ID CHIME**
    - 🥁 **SNARE / LAUGH**
- **📻 Radio Station Format Presets**:
  - Commercial FM Radio, Newsroom Desk, Late Night FM, 1940s Vintage AM, Sports Arena PA, Sci-Fi Space FM.

---

## 📁 Project Architecture

```
voice_changer/
├── index.ts          # Bun server (HTTP, WebSockets & Presets API)
├── index.html        # Radio Station Studio Console UI
├── styles.css        # Broadcast Studio CSS design system
├── processor.js      # AudioWorklet processors (Pitch Shifter & Bitcrusher)
├── app.js            # Radio Studio Engine (Mixer, Decks, Ducking, Soundboard)
├── index.test.ts     # Bun test suite
└── README.md         # Documentation
```

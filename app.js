/**
 * RADIONEST // Internet Radio Broadcast Studio & Console
 * Powered by Bun & Web Audio API (Zero External Dependencies)
 */

// Radio Station Format Presets
const STATION_PRESETS = [
  {
    id: 'fm_dj',
    name: 'FM Radio DJ',
    icon: '🎙️',
    settings: {
      pitchShift: 0, formantShift: 0, robotMix: 0, robotFreq: 60,
      bitDepth: 16, overdrive: 0, vibRate: 5, vibDepth: 0,
      hpf: 60, lpf: 16000, delayTime: 0, delayFeedback: 0,
      reverbMix: 8, noiseGate: -60, masterGain: 100,
      radioBass: 12, radioPresence: 8, radioCompressor: 80, radioWarmth: 35, radioNoise: 0
    }
  },
  {
    id: 'news_desk',
    name: 'News Desk',
    icon: '📰',
    settings: {
      pitchShift: 0, formantShift: 0, robotMix: 0, robotFreq: 60,
      bitDepth: 16, overdrive: 5, vibRate: 5, vibDepth: 0,
      hpf: 80, lpf: 15000, delayTime: 0, delayFeedback: 0,
      reverbMix: 5, noiseGate: -55, masterGain: 105,
      radioBass: 6, radioPresence: 10, radioCompressor: 85, radioWarmth: 20, radioNoise: 0
    }
  },
  {
    id: 'late_night_fm',
    name: 'Late Night FM',
    icon: '🎧',
    settings: {
      pitchShift: -1.5, formantShift: -2, robotMix: 0, robotFreq: 60,
      bitDepth: 16, overdrive: 0, vibRate: 5, vibDepth: 0,
      hpf: 40, lpf: 17000, delayTime: 0, delayFeedback: 0,
      reverbMix: 18, noiseGate: -60, masterGain: 100,
      radioBass: 15, radioPresence: 5, radioCompressor: 65, radioWarmth: 45, radioNoise: 0
    }
  },
  {
    id: 'vintage_am',
    name: '1940s Vintage AM',
    icon: '📻',
    settings: {
      pitchShift: 0, formantShift: 0, robotMix: 0, robotFreq: 60,
      bitDepth: 9, overdrive: 35, vibRate: 5, vibDepth: 0,
      hpf: 350, lpf: 3800, delayTime: 0, delayFeedback: 0,
      reverbMix: 0, noiseGate: -40, masterGain: 100,
      radioBass: 4, radioPresence: 6, radioCompressor: 90, radioWarmth: 60, radioNoise: 25
    }
  },
  {
    id: 'stadium_pa',
    name: 'Sports Arena PA',
    icon: '🏟️',
    settings: {
      pitchShift: -1, formantShift: 0, robotMix: 0, robotFreq: 60,
      bitDepth: 16, overdrive: 15, vibRate: 5, vibDepth: 0,
      hpf: 100, lpf: 12000, delayTime: 130, delayFeedback: 35,
      reverbMix: 40, noiseGate: -50, masterGain: 110,
      radioBass: 6, radioPresence: 10, radioCompressor: 75, radioWarmth: 20, radioNoise: 5
    }
  },
  {
    id: 'space_radio',
    name: 'Sci-Fi Space FM',
    icon: '🚀',
    settings: {
      pitchShift: -2, formantShift: 0, robotMix: 30, robotFreq: 120,
      bitDepth: 12, overdrive: 20, vibRate: 5, vibDepth: 0,
      hpf: 80, lpf: 14000, delayTime: 120, delayFeedback: 30,
      reverbMix: 35, noiseGate: -55, masterGain: 100,
      radioBass: 5, radioPresence: 5, radioCompressor: 70, radioWarmth: 25, radioNoise: 0
    }
  },
  {
    id: 'rock_fm',
    name: 'Classic Rock 101.5',
    icon: '🎸',
    settings: {
      pitchShift: 0, formantShift: 0, robotMix: 0, robotFreq: 60,
      bitDepth: 16, overdrive: 15, vibRate: 5, vibDepth: 0,
      hpf: 50, lpf: 16000, delayTime: 0, delayFeedback: 0,
      reverbMix: 10, noiseGate: -60, masterGain: 105,
      radioBass: 10, radioPresence: 9, radioCompressor: 85, radioWarmth: 40, radioNoise: 0
    }
  },
  {
    id: 'synth80s',
    name: '80s Retro Synth FM',
    icon: '🕺',
    settings: {
      pitchShift: 1, formantShift: 0, robotMix: 0, robotFreq: 60,
      bitDepth: 16, overdrive: 5, vibRate: 4, vibDepth: 15,
      hpf: 60, lpf: 16000, delayTime: 0, delayFeedback: 0,
      reverbMix: 25, noiseGate: -60, masterGain: 100,
      radioBass: 8, radioPresence: 7, radioCompressor: 75, radioWarmth: 20, radioNoise: 0
    }
  },
  {
    id: 'podcast_pro',
    name: 'Podcast Studio Pro',
    icon: '🎙️',
    settings: {
      pitchShift: 0, formantShift: 0, robotMix: 0, robotFreq: 60,
      bitDepth: 16, overdrive: 0, vibRate: 5, vibDepth: 0,
      hpf: 75, lpf: 15000, delayTime: 0, delayFeedback: 0,
      reverbMix: 6, noiseGate: -60, masterGain: 100,
      radioBass: 7, radioPresence: 8, radioCompressor: 70, radioWarmth: 15, radioNoise: 0
    }
  },
  {
    id: 'pirate_radio',
    name: 'Pirate Shortwave',
    icon: '🏴‍☠️',
    settings: {
      pitchShift: 0, formantShift: 0, robotMix: 0, robotFreq: 60,
      bitDepth: 8, overdrive: 40, vibRate: 5, vibDepth: 0,
      hpf: 450, lpf: 3200, delayTime: 0, delayFeedback: 0,
      reverbMix: 0, noiseGate: -40, masterGain: 110,
      radioBass: 2, radioPresence: 8, radioCompressor: 95, radioWarmth: 50, radioNoise: 35
    }
  },
  {
    id: 'ambient_lounge',
    name: 'Ambient Chill Lounge',
    icon: '🧘',
    settings: {
      pitchShift: -1, formantShift: 0, robotMix: 0, robotFreq: 60,
      bitDepth: 16, overdrive: 0, vibRate: 2, vibDepth: 10,
      hpf: 40, lpf: 14000, delayTime: 150, delayFeedback: 30,
      reverbMix: 55, noiseGate: -60, masterGain: 95,
      radioBass: 10, radioPresence: 4, radioCompressor: 60, radioWarmth: 30, radioNoise: 0
    }
  },
  {
    id: 'satellite_relay',
    name: 'Satellite Relay',
    icon: '🛰️',
    settings: {
      pitchShift: 0, formantShift: 0, robotMix: 0, robotFreq: 60,
      bitDepth: 10, overdrive: 15, vibRate: 5, vibDepth: 0,
      hpf: 400, lpf: 6000, delayTime: 200, delayFeedback: 40,
      reverbMix: 15, noiseGate: -50, masterGain: 100,
      radioBass: 0, radioPresence: 9, radioCompressor: 85, radioWarmth: 25, radioNoise: 15
    }
  }
];

class RadioStudioEngine {
  constructor() {
    this.ctx = null;
    this.inputStream = null;
    this.mediaStreamSource = null;

    // Background Sound Isolation & VAD State
    this.noiseSuppressionEnabled = true;
    this.voiceIsolationEnabled = true;
    this.isolationDepth = 80;
    this.isolationSens = -45;
    this.currentIsoGain = 1.0;

    // Isolation Nodes
    this.isoHpfNode = null;
    this.isoLpfNode = null;
    this.isoGainNode = null;
    this.isoVadAnalyser = null;

    // DJ Mic Processing Nodes
    this.inputGainNode = null;
    this.gateNode = null;
    this.hpfNode = null;
    this.lpfNode = null;
    this.radioBassFilter = null;
    this.radioPresenceFilter = null;
    this.broadcastCompressorNode = null;
    this.radioWarmthNode = null;
    this.radioNoiseBufferNode = null;
    this.radioNoiseFilter = null;
    this.radioNoiseGainNode = null;
    this.pitchWorkletNode = null;
    this.bitcrushWorkletNode = null;

    // DJ Decks & Crossfader Nodes
    this.deckAAudio = null;
    this.deckBAudio = null;
    this.deckASource = null;
    this.deckBSource = null;
    this.deckAGainNode = null;
    this.deckBGainNode = null;
    this.xfaderGainA = null;
    this.xfaderGainB = null;
    this.duckingGainNode = null;

    // Soundboard Master Gain
    this.soundboardBusGain = null;

    // Station Master Output Nodes
    this.masterBusGain = null;
    this.masterLimiterNode = null;
    this.inputAnalyser = null;
    this.outputAnalyser = null;
    this.destinationNode = null;

    // Recording
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.recordStartTime = 0;

    // State
    this.isInitialized = false;
    this.isBypassed = false;
    this.isMonitoring = true;
    this.isDuckingEnabled = true;
    this.duckAmountDb = 14;
    this.currentDuckingGain = 1.0;
    this.currentPresetId = 'fm_dj';
    this.activeSettings = { ...STATION_PRESETS[0].settings };
    this.isOnAir = false;

    // Canvas
    this.waveCanvas = document.getElementById('waveCanvas');
    this.fftCanvas = document.getElementById('fftCanvas');
    this.waveCtx = this.waveCanvas?.getContext('2d');
    this.fftCtx = this.fftCanvas?.getContext('2d');

    // WebSocket
    this.ws = null;
  }

  async init() {
    if (this.isInitialized) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass({ latencyHint: 'interactive' });

    try {
      await this.ctx.audioWorklet.addModule('/processor.js');
    } catch (err) {
      await this.loadInlineWorkletFallback();
    }

    this.buildGraph();
    this.isInitialized = true;
    this.startVisualizer();
  }

  async loadInlineWorkletFallback() {
    const code = `
      class PitchShifterProcessor extends AudioWorkletProcessor {
        constructor() {
          super();
          this.bufferSize = 8192;
          this.buffer = new Float32Array(this.bufferSize);
          this.writePos = 0;
          this.grain1 = 0;
          this.grainSize = 2048;
          this.grain2 = this.grainSize / 2;
          this.pitchRatio = 1.0;
          this.port.onmessage = (e) => {
            if (e.data.pitchRatio !== undefined) this.pitchRatio = Math.max(0.25, Math.min(4.0, e.data.pitchRatio));
          };
        }
        process(inputs, outputs) {
          const input = inputs[0]; const output = outputs[0];
          if (!input || !input[0] || !output || !output[0]) return true;
          const inCh = input[0]; const outCh = output[0]; const len = inCh.length;
          if (Math.abs(this.pitchRatio - 1.0) < 0.001) {
            outCh.set(inCh);
            if (output[1]) output[1].set(inCh);
            for (let i = 0; i < len; i++) {
              this.buffer[this.writePos] = inCh[i];
              this.writePos = (this.writePos + 1) % this.bufferSize;
            }
            return true;
          }
          for (let i = 0; i < len; i++) {
            this.buffer[this.writePos] = inCh[i];
            const p1 = (this.grain1 % this.grainSize) / this.grainSize;
            const p2 = (this.grain2 % this.grainSize) / this.grainSize;
            const w1 = 0.5 * (1 - Math.cos(2 * Math.PI * p1));
            const w2 = 0.5 * (1 - Math.cos(2 * Math.PI * p2));
            const offset1 = this.grainSize - (this.grain1 % this.grainSize);
            const offset2 = this.grainSize - (this.grain2 % this.grainSize);
            const idx1 = (Math.floor(this.writePos - offset1) % this.bufferSize + this.bufferSize) % this.bufferSize;
            const idx2 = (Math.floor(this.writePos - offset2) % this.bufferSize + this.bufferSize) % this.bufferSize;
            outCh[i] = this.buffer[idx1] * w1 + this.buffer[idx2] * w2;
            const delta = this.pitchRatio - 1;
            this.grain1 += delta;
            this.grain2 += delta;
            this.writePos = (this.writePos + 1) % this.bufferSize;
          }
          if (output[1]) output[1].set(outCh);
          return true;
        }
      }
      class BitcrusherProcessor extends AudioWorkletProcessor {
        constructor() {
          super();
          this.bits = 16;
          this.port.onmessage = (e) => { if (e.data.bits !== undefined) this.bits = e.data.bits; };
        }
        process(inputs, outputs) {
          const input = inputs[0]; const output = outputs[0];
          if (!input || !input[0] || !output || !output[0]) return true;
          const inCh = input[0]; const outCh = output[0];
          if (this.bits === 16) {
            outCh.set(inCh);
            if (output[1]) output[1].set(inCh);
            return true;
          }
          const step = Math.pow(0.5, this.bits);
          for (let i = 0; i < inCh.length; i++) {
            outCh[i] = step * Math.floor(inCh[i] / step + 0.5);
          }
          if (output[1]) output[1].set(outCh);
          return true;
        }
      }
      registerProcessor('pitch-shifter-processor', PitchShifterProcessor);
      registerProcessor('bitcrusher-processor', BitcrusherProcessor);
    `;
    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    await this.ctx.audioWorklet.addModule(url);
  }

  buildGraph() {
    const ctx = this.ctx;

    // Analysers
    this.inputAnalyser = ctx.createAnalyser();
    this.inputAnalyser.fftSize = 1024;
    this.outputAnalyser = ctx.createAnalyser();
    this.outputAnalyser.fftSize = 1024;

    // Sound Isolation & VAD Nodes
    this.isoHpfNode = ctx.createBiquadFilter();
    this.isoHpfNode.type = 'highpass';
    this.isoHpfNode.frequency.value = 85;

    this.isoLpfNode = ctx.createBiquadFilter();
    this.isoLpfNode.type = 'lowpass';
    this.isoLpfNode.frequency.value = 7500;

    this.isoGainNode = ctx.createGain();
    this.isoGainNode.gain.value = 1.0;

    this.isoVadAnalyser = ctx.createAnalyser();
    this.isoVadAnalyser.fftSize = 512;

    // DJ Mic Input Nodes
    this.inputGainNode = ctx.createGain();
    this.gateNode = ctx.createGain();

    this.hpfNode = ctx.createBiquadFilter();
    this.hpfNode.type = 'highpass';
    this.hpfNode.frequency.value = 60;

    this.lpfNode = ctx.createBiquadFilter();
    this.lpfNode.type = 'lowpass';
    this.lpfNode.frequency.value = 16000;

    // FM Radio Announcer Processing Nodes
    this.radioBassFilter = ctx.createBiquadFilter();
    this.radioBassFilter.type = 'lowshelf';
    this.radioBassFilter.frequency.value = 140;
    this.radioBassFilter.gain.value = 12;

    this.radioPresenceFilter = ctx.createBiquadFilter();
    this.radioPresenceFilter.type = 'peaking';
    this.radioPresenceFilter.frequency.value = 3000;
    this.radioPresenceFilter.Q.value = 1.2;
    this.radioPresenceFilter.gain.value = 8;

    this.broadcastCompressorNode = ctx.createDynamicsCompressor();
    this.broadcastCompressorNode.threshold.value = -28;
    this.broadcastCompressorNode.knee.value = 12;
    this.broadcastCompressorNode.ratio.value = 14;
    this.broadcastCompressorNode.attack.value = 0.003;
    this.broadcastCompressorNode.release.value = 0.1;

    this.radioWarmthNode = ctx.createWaveShaper();
    this.radioWarmthNode.curve = this.makeWarmthCurve(35);

    // Static Noise Generator
    this.radioNoiseBufferNode = ctx.createBufferSource();
    this.radioNoiseBufferNode.buffer = this.createWhiteNoiseBuffer();
    this.radioNoiseBufferNode.loop = true;

    this.radioNoiseFilter = ctx.createBiquadFilter();
    this.radioNoiseFilter.type = 'bandpass';
    this.radioNoiseFilter.frequency.value = 1500;
    this.radioNoiseFilter.Q.value = 0.8;

    this.radioNoiseGainNode = ctx.createGain();
    this.radioNoiseGainNode.gain.value = 0;

    this.radioNoiseBufferNode.connect(this.radioNoiseFilter);
    this.radioNoiseFilter.connect(this.radioNoiseGainNode);

    try { this.radioNoiseBufferNode.start(); } catch (e) {}

    // Worklets
    try {
      this.pitchWorkletNode = new AudioWorkletNode(ctx, 'pitch-shifter-processor');
      this.bitcrushWorkletNode = new AudioWorkletNode(ctx, 'bitcrusher-processor');
    } catch (e) {
      console.error('Worklet error', e);
    }

    // Music Decks & Crossfader Nodes
    this.deckAGainNode = ctx.createGain();
    this.deckBGainNode = ctx.createGain();
    this.xfaderGainA = ctx.createGain();
    this.xfaderGainB = ctx.createGain();
    this.duckingGainNode = ctx.createGain();

    this.deckAGainNode.connect(this.xfaderGainA);
    this.deckBGainNode.connect(this.xfaderGainB);

    this.xfaderGainA.connect(this.duckingGainNode);
    this.xfaderGainB.connect(this.duckingGainNode);

    // Default Crossfader set to 50/50 equal power
    this.xfaderGainA.gain.value = Math.SQRT1_2;
    this.xfaderGainB.gain.value = Math.SQRT1_2;

    // Soundboard Bus Node
    this.soundboardBusGain = ctx.createGain();
    this.soundboardBusGain.gain.value = 1.0;

    // Station Master Bus & Limiter
    this.masterBusGain = ctx.createGain();
    this.masterBusGain.gain.value = 1.0;

    this.masterLimiterNode = ctx.createDynamicsCompressor();
    this.masterLimiterNode.threshold.value = -2.0;
    this.masterLimiterNode.ratio.value = 20.0;
    this.masterLimiterNode.attack.value = 0.001;

    // MediaStreamDestination for Recording & WebSocket Stream
    this.destinationNode = ctx.createMediaStreamDestination();

    // Wiring DJ Mic Pipeline
    this.inputGainNode.connect(this.inputAnalyser);
    this.inputGainNode.connect(this.isoHpfNode);

    this.isoHpfNode.connect(this.isoLpfNode);
    this.isoLpfNode.connect(this.isoGainNode);
    this.isoGainNode.connect(this.gateNode);
    this.isoHpfNode.connect(this.isoVadAnalyser);

    this.gateNode.connect(this.hpfNode);
    this.hpfNode.connect(this.lpfNode);

    let micSrc = this.lpfNode;

    micSrc.connect(this.radioBassFilter);
    this.radioBassFilter.connect(this.radioPresenceFilter);
    this.radioPresenceFilter.connect(this.radioWarmthNode);
    this.radioWarmthNode.connect(this.broadcastCompressorNode);
    micSrc = this.broadcastCompressorNode;

    if (this.pitchWorkletNode) {
      micSrc.connect(this.pitchWorkletNode);
      micSrc = this.pitchWorkletNode;
    }

    if (this.bitcrushWorkletNode) {
      micSrc.connect(this.bitcrushWorkletNode);
      micSrc = this.bitcrushWorkletNode;
    }

    // Connect DJ Mic to Master Bus
    micSrc.connect(this.masterBusGain);

    // Connect Music Decks (through Ducking Gain) to Master Bus
    this.duckingGainNode.connect(this.masterBusGain);

    // Connect Soundboard Bus to Master Bus
    this.soundboardBusGain.connect(this.masterBusGain);

    // Connect Radio Static Hiss to Master Bus
    this.radioNoiseGainNode.connect(this.masterBusGain);

    // Master Bus -> Master Limiter -> Output Analyser & Stream Destination
    this.masterBusGain.connect(this.masterLimiterNode);
    this.masterLimiterNode.connect(this.outputAnalyser);
    this.masterLimiterNode.connect(this.destinationNode);

    // Speaker / Headphone Monitoring Output
    if (this.isMonitoring) {
      this.masterLimiterNode.connect(ctx.destination);
    }
  }

  async startMicrophone(deviceId = 'default') {
    await this.init();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.inputStream) {
      this.stopMicrophone();
    }

    const constraints = {
      audio: {
        deviceId: deviceId !== 'default' ? { exact: deviceId } : undefined,
        echoCancellation: true,
        noiseSuppression: this.noiseSuppressionEnabled,
        autoGainControl: true,
      }
    };

    try {
      this.inputStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.mediaStreamSource = this.ctx.createMediaStreamSource(this.inputStream);
      this.mediaStreamSource.connect(this.inputGainNode);
      return true;
    } catch (err) {
      console.error('Failed to get mic stream', err);
      alert('Could not access microphone.');
      return false;
    }
  }

  stopMicrophone() {
    if (this.mediaStreamSource) {
      this.mediaStreamSource.disconnect();
      this.mediaStreamSource = null;
    }
    if (this.inputStream) {
      this.inputStream.getTracks().forEach(t => t.stop());
      this.inputStream = null;
    }
  }

  loadDeckTrack(deckName, file) {
    this.init().then(() => {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      audio.crossOrigin = 'anonymous';

      if (deckName === 'A') {
        if (this.deckAAudio) this.deckAAudio.pause();
        this.deckAAudio = audio;
        this.deckASource = this.ctx.createMediaElementSource(audio);
        this.deckASource.connect(this.deckAGainNode);
        const nameEl = document.getElementById('deckATrackName');
        if (nameEl) nameEl.textContent = file.name;
      } else {
        if (this.deckBAudio) this.deckBAudio.pause();
        this.deckBAudio = audio;
        this.deckBSource = this.ctx.createMediaElementSource(audio);
        this.deckBSource.connect(this.deckBGainNode);
        const nameEl = document.getElementById('deckBTrackName');
        if (nameEl) nameEl.textContent = file.name;
      }
    });
  }

  playDeck(deckName) {
    const audio = deckName === 'A' ? this.deckAAudio : this.deckBAudio;
    if (audio) {
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      audio.play();
    }
  }

  pauseDeck(deckName) {
    const audio = deckName === 'A' ? this.deckAAudio : this.deckBAudio;
    if (audio) audio.pause();
  }

  setCrossfader(val) {
    if (!this.isInitialized) return;
    const x = val / 100;
    // Equal power crossfade curve
    const gainA = Math.cos(x * 0.5 * Math.PI);
    const gainB = Math.sin(x * 0.5 * Math.PI);
    this.xfaderGainA.gain.setTargetAtTime(gainA, this.ctx.currentTime, 0.02);
    this.xfaderGainB.gain.setTargetAtTime(gainB, this.ctx.currentTime, 0.02);
  }

  // Programmatic Web Audio Soundboard Sound Effects (Zero External Files!)
  triggerSoundboard(sfxType) {
    this.init().then(() => {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const ctx = this.ctx;
      const now = ctx.currentTime;

      if (sfxType === 'airhorn') {
        // Dual Sawtooth Pitch Bend Airhorn
        [466.16, 622.25].forEach(freq => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.15, now + 0.1);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.95, now + 0.5);

          g.gain.setValueAtTime(0.3, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

          osc.connect(g);
          g.connect(this.soundboardBusGain);
          osc.start(now);
          osc.stop(now + 0.65);
        });
      } else if (sfxType === 'stinger') {
        // News Triad Chord Stinger
        [329.63, 493.88, 659.25].forEach(freq => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          g.gain.setValueAtTime(0.25, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          osc.connect(g);
          g.connect(this.soundboardBusGain);
          osc.start(now);
          osc.stop(now + 1.25);
        });
      } else if (sfxType === 'siren') {
        // Emergency Siren Sweep
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(950, now + 0.4);
        osc.frequency.linearRampToValueAtTime(400, now + 0.8);
        g.gain.setValueAtTime(0.3, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        osc.connect(g);
        g.connect(this.soundboardBusGain);
        osc.start(now);
        osc.stop(now + 0.95);
      } else if (sfxType === 'impact') {
        // Bass Sub Impact Drop + Noise Burst
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
        g.gain.setValueAtTime(0.6, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc.connect(g);
        g.connect(this.soundboardBusGain);
        osc.start(now);
        osc.stop(now + 0.75);
      } else if (sfxType === 'chime') {
        // 1000Hz Dual Bell Station ID Chime
        [1000, 1500].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          const startTime = now + idx * 0.15;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          g.gain.setValueAtTime(0.3, startTime);
          g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);
          osc.connect(g);
          g.connect(this.soundboardBusGain);
          osc.start(startTime);
          osc.stop(startTime + 0.85);
        });
      } else if (sfxType === 'snare') {
        // Snare/Laughter pop
        const noise = ctx.createBufferSource();
        noise.buffer = this.createWhiteNoiseBuffer();
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.4, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        noise.connect(filter);
        filter.connect(g);
        g.connect(this.soundboardBusGain);
        noise.start(now);
        noise.stop(now + 0.3);
      }
    });
  }

  speakTestPhrase() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("Welcome to RADIONEST Internet Radio Console. Broadcasting live FM Announcer quality with soundboard cart wall and auto talkover ducking.");
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  applySettings(settings) {
    this.activeSettings = { ...settings };
    if (!this.isInitialized) return;

    const pitchRatio = Math.pow(2, settings.pitchShift / 12);
    if (this.pitchWorkletNode) {
      this.pitchWorkletNode.port.postMessage({ pitchRatio });
    }

    if (this.bitcrushWorkletNode) {
      this.bitcrushWorkletNode.port.postMessage({ bits: settings.bitDepth });
    }

    if (this.radioBassFilter) {
      this.radioBassFilter.gain.setTargetAtTime(settings.radioBass || 0, this.ctx.currentTime, 0.02);
    }

    if (this.radioPresenceFilter) {
      this.radioPresenceFilter.gain.setTargetAtTime(settings.radioPresence || 0, this.ctx.currentTime, 0.02);
    }

    if (this.broadcastCompressorNode) {
      const compPct = (settings.radioCompressor || 0) / 100;
      const thresh = -10 - compPct * 30;
      const ratio = 1 + compPct * 19;
      this.broadcastCompressorNode.threshold.setTargetAtTime(thresh, this.ctx.currentTime, 0.02);
      this.broadcastCompressorNode.ratio.setTargetAtTime(ratio, this.ctx.currentTime, 0.02);
    }

    if (this.radioWarmthNode) {
      this.radioWarmthNode.curve = this.makeWarmthCurve(settings.radioWarmth || 0);
    }

    if (this.radioNoiseGainNode) {
      const noiseVol = ((settings.radioNoise || 0) / 100) * 0.15;
      this.radioNoiseGainNode.gain.setTargetAtTime(noiseVol, this.ctx.currentTime, 0.02);
    }

    if (this.hpfNode) this.hpfNode.frequency.setTargetAtTime(settings.hpf || 60, this.ctx.currentTime, 0.02);
    if (this.lpfNode) this.lpfNode.frequency.setTargetAtTime(settings.lpf || 16000, this.ctx.currentTime, 0.02);

    if (this.masterBusGain) {
      this.masterBusGain.gain.setTargetAtTime((settings.masterGain || 100) / 100, this.ctx.currentTime, 0.02);
    }
  }

  setMonitoring(enable) {
    this.isMonitoring = enable;
    if (!this.isInitialized) return;
    if (enable) {
      this.masterLimiterNode.connect(this.ctx.destination);
    } else {
      try { this.masterLimiterNode.disconnect(this.ctx.destination); } catch (e) {}
    }
  }

  makeWarmthCurve(amount) {
    if (amount <= 0) return null;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const factor = 1 + (amount / 100) * 3;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = Math.tanh(x * factor) / Math.tanh(factor);
    }
    return curve;
  }

  createWhiteNoiseBuffer() {
    const sampleRate = this.ctx ? this.ctx.sampleRate : 44100;
    const bufferSize = sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }
    return buffer;
  }

  startRecording() {
    if (!this.destinationNode) return;
    this.recordedChunks = [];
    const stream = this.destinationNode.stream;
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.recordedChunks.push(e.data);
    };

    this.mediaRecorder.start(100);
    this.recordStartTime = Date.now();
  }

  stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) return resolve(null);

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const duration = Math.round((Date.now() - this.recordStartTime) / 1000);
        resolve({ blob, url, duration });
      };

      this.mediaRecorder.stop();
    });
  }

  // Visualizer Loop & Talkover Auto-Ducking Engine
  startVisualizer() {
    const waveData = new Uint8Array(this.inputAnalyser.frequencyBinCount);
    const fftData = new Uint8Array(this.outputAnalyser.frequencyBinCount);
    const vadData = this.isoVadAnalyser ? new Uint8Array(this.isoVadAnalyser.frequencyBinCount) : null;

    const resizeCanvases = () => {
      if (this.waveCanvas && this.waveCanvas.parentElement) {
        const w = Math.max(280, this.waveCanvas.parentElement.clientWidth - 24);
        if (this.waveCanvas.width !== w) {
          this.waveCanvas.width = w;
          if (this.fftCanvas) this.fftCanvas.width = w;
        }
      }
    };
    window.addEventListener('resize', resizeCanvases);
    resizeCanvases();

    const draw = () => {
      requestAnimationFrame(draw);

      // Talkover Auto-Ducking & Sound Isolation
      if (vadData && !this.isBypassed) {
        this.isoVadAnalyser.getByteFrequencyData(vadData);

        let vocalEnergy = 0;
        const binCount = vadData.length;
        const startBin = Math.floor(binCount * 0.05);
        const endBin = Math.floor(binCount * 0.6);

        for (let i = startBin; i <= endBin; i++) {
          vocalEnergy += vadData[i];
        }
        const avgEnergy = vocalEnergy / (endBin - startBin + 1) / 255;
        const energyDb = avgEnergy > 0 ? 20 * Math.log10(avgEnergy) : -100;

        const isSpeechDetected = energyDb > this.isolationSens;

        const vadDot = document.getElementById('vadDot');
        const vadText = document.getElementById('vadText');
        if (vadDot && vadText) {
          if (isSpeechDetected) {
            vadDot.className = 'status-dot active';
            vadText.textContent = 'DJ Speaking (On-Air)';
          } else {
            vadDot.className = 'status-dot idle';
            vadText.textContent = 'Mic Standby';
          }
        }

        // Adaptive Sound Isolation
        const targetIsoGain = isSpeechDetected ? 1.0 : Math.max(0.02, 1.0 - (this.isolationDepth / 100) * 0.95);
        const isoAlpha = isSpeechDetected ? 0.35 : 0.08;
        this.currentIsoGain += isoAlpha * (targetIsoGain - this.currentIsoGain);
        if (this.isoGainNode) this.isoGainNode.gain.setValueAtTime(this.currentIsoGain, this.ctx.currentTime);

        // Auto Talkover Ducking for Deck Music
        if (this.isDuckingEnabled && this.duckingGainNode) {
          const duckFactor = Math.pow(10, -this.duckAmountDb / 20); // e.g. -14dB = 0.2
          const targetDuckGain = isSpeechDetected ? duckFactor : 1.0;
          const duckAlpha = isSpeechDetected ? 0.2 : 0.05; // Fast attack, smooth decay
          this.currentDuckingGain += duckAlpha * (targetDuckGain - this.currentDuckingGain);
          this.duckingGainNode.gain.setValueAtTime(this.currentDuckingGain, this.ctx.currentTime);
        }
      }

      // Draw Waveform
      if (this.waveCtx && this.waveCanvas) {
        this.inputAnalyser.getByteTimeDomainData(waveData);
        const w = this.waveCanvas.width;
        const h = this.waveCanvas.height;

        this.waveCtx.fillStyle = '#04060a';
        this.waveCtx.fillRect(0, 0, w, h);
        this.waveCtx.lineWidth = 2;
        this.waveCtx.strokeStyle = '#00f2fe';
        this.waveCtx.shadowBlur = 8;
        this.waveCtx.shadowColor = '#00f2fe';

        this.waveCtx.beginPath();
        const sliceWidth = w / waveData.length;
        let x = 0;

        for (let i = 0; i < waveData.length; i++) {
          const v = waveData[i] / 128.0;
          const y = (v * h) / 2;
          if (i === 0) this.waveCtx.moveTo(x, y);
          else this.waveCtx.lineTo(x, y);
          x += sliceWidth;
        }

        this.waveCtx.lineTo(w, h / 2);
        this.waveCtx.stroke();
        this.waveCtx.shadowBlur = 0;

        let sum = 0;
        for (let i = 0; i < waveData.length; i++) {
          const val = (waveData[i] - 128) / 128;
          sum += val * val;
        }
        const rms = Math.sqrt(sum / waveData.length);
        const micDb = rms > 0 ? Math.max(-60, Math.round(20 * Math.log10(rms))) : -60;
        this.updateMeter('mic', micDb);
      }

      // Draw Spectrum (FFT)
      if (this.fftCtx && this.fftCanvas) {
        this.outputAnalyser.getByteFrequencyData(fftData);
        const w = this.fftCanvas.width;
        const h = this.fftCanvas.height;

        this.fftCtx.fillStyle = '#04060a';
        this.fftCtx.fillRect(0, 0, w, h);

        const barCount = 48;
        const barWidth = (w / barCount) - 2;
        let outSum = 0;

        for (let i = 0; i < barCount; i++) {
          const value = fftData[i * 2];
          outSum += value;
          const percent = value / 255;
          const barHeight = percent * h;

          const gradient = this.fftCtx.createLinearGradient(0, h, 0, 0);
          gradient.addColorStop(0, '#ff0055');
          gradient.addColorStop(0.7, '#00f2fe');
          gradient.addColorStop(1, '#00f5d4');

          this.fftCtx.fillStyle = gradient;
          this.fftCtx.fillRect(i * (barWidth + 2), h - barHeight, barWidth, barHeight);
        }

        const avgOut = outSum / barCount / 255;
        const outDb = avgOut > 0 ? Math.max(-60, Math.round(20 * Math.log10(avgOut))) : -60;
        this.updateMeter('out', outDb);
      }
    };

    draw();
  }

  updateMeter(type, db) {
    const fillEl = document.getElementById(type === 'mic' ? 'micMeterFill' : 'outMeterFill');
    const dbEl = document.getElementById(type === 'mic' ? 'micDb' : 'outDb');
    const clipEl = document.getElementById(type === 'mic' ? 'micClip' : 'outClip');

    if (fillEl && dbEl) {
      const pct = Math.max(0, Math.min(100, ((db + 60) / 60) * 100));
      fillEl.style.width = pct + '%';
      dbEl.textContent = db <= -60 ? '-∞ dB' : `${db} dB`;
      if (clipEl) clipEl.classList.toggle('active', db >= -1);
    }
  }
}

// Global UI Initialization
document.addEventListener('DOMContentLoaded', () => {
  const engine = new RadioStudioEngine();

  // Populate Mics
  async function populateMics() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const micSelect = document.getElementById('micSelect');
      if (!micSelect) return;
      micSelect.innerHTML = '<option value="default">Default Microphone</option>';
      devices.filter(d => d.kind === 'audioinput').forEach((d, i) => {
        const option = document.createElement('option');
        option.value = d.deviceId;
        option.textContent = d.label || `Microphone ${i + 1}`;
        micSelect.appendChild(option);
      });
    } catch (e) {
      console.warn('Microphone enumeration failed', e);
    }
  }

  populateMics();

  // Preset Grid
  const presetGrid = document.getElementById('presetGrid');
  function renderPresets() {
    if (!presetGrid) return;
    presetGrid.innerHTML = '';

    STATION_PRESETS.forEach(preset => {
      const card = document.createElement('div');
      card.className = `preset-card ${engine.currentPresetId === preset.id ? 'active' : ''}`;
      card.dataset.id = preset.id;
      card.innerHTML = `
        <div class="preset-icon">${preset.icon}</div>
        <div class="preset-name">${preset.name}</div>
      `;
      card.addEventListener('click', () => {
        document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        engine.currentPresetId = preset.id;
        engine.applySettings(preset.settings);
        updateSlidersUI(preset.settings);
      });
      presetGrid.appendChild(card);
    });
  }

  renderPresets();

  function updateSlidersUI(settings) {
    const map = {
      pitchShift: 'pitchVal',
      masterGain: 'masterGainVal',
      radioBass: 'radioBassVal',
      radioPresence: 'radioPresenceVal',
      radioCompressor: 'radioCompressorVal',
      radioWarmth: 'radioWarmthVal',
    };

    Object.keys(settings).forEach(key => {
      const slider = document.getElementById(key);
      if (slider) slider.value = settings[key];
      const label = document.getElementById(map[key]);
      if (label) {
        let text = settings[key];
        if (key === 'pitchShift') text = (settings[key] > 0 ? '+' : '') + settings[key] + ' st';
        else if (key === 'radioBass' || key === 'radioPresence') text = (settings[key] > 0 ? '+' : '') + settings[key] + ' dB';
        else if (key === 'radioCompressor' || key === 'radioWarmth' || key === 'masterGain') text = settings[key] + '%';
        label.textContent = text;
      }
    });
  }

  const sliderIds = ['pitchShift', 'masterGain', 'radioBass', 'radioPresence', 'radioCompressor', 'radioWarmth'];
  sliderIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        const val = parseFloat(el.value);
        engine.activeSettings[id] = val;
        engine.applySettings(engine.activeSettings);
        updateSlidersUI(engine.activeSettings);
      });
    }
  });

  // Sound Isolation Controls
  document.getElementById('isoDepth')?.addEventListener('input', (e) => {
    engine.isolationDepth = parseFloat(e.target.value);
    const label = document.getElementById('isoDepthVal');
    if (label) label.textContent = `${engine.isolationDepth}%`;
  });

  document.getElementById('isoSens')?.addEventListener('input', (e) => {
    engine.isolationSens = parseFloat(e.target.value);
    const label = document.getElementById('isoSensVal');
    if (label) label.textContent = `${engine.isolationSens} dB`;
  });

  document.getElementById('noiseSuppressionToggle')?.addEventListener('change', (e) => {
    engine.noiseSuppressionEnabled = e.target.checked;
  });

  document.getElementById('voiceIsolationToggle')?.addEventListener('change', (e) => {
    engine.voiceIsolationEnabled = e.target.checked;
    if (engine.isoHpfNode && engine.isoLpfNode) {
      engine.isoHpfNode.frequency.value = e.target.checked ? 85 : 20;
      engine.isoLpfNode.frequency.value = e.target.checked ? 7500 : 20000;
    }
  });

  // Talkover Ducking Controls
  document.getElementById('duckingToggle')?.addEventListener('change', (e) => {
    engine.isDuckingEnabled = e.target.checked;
  });

  document.getElementById('duckAmount')?.addEventListener('input', (e) => {
    engine.duckAmountDb = parseFloat(e.target.value);
    const label = document.getElementById('duckAmountVal');
    if (label) label.textContent = `-${engine.duckAmountDb} dB`;
  });

  // DJ Mic Buttons
  const startMicBtn = document.getElementById('startMicBtn');
  const stopMicBtn = document.getElementById('stopMicBtn');

  startMicBtn?.addEventListener('click', async () => {
    const select = document.getElementById('micSelect');
    const deviceId = select ? select.value : 'default';
    const ok = await engine.startMicrophone(deviceId);
    if (ok) {
      startMicBtn.classList.add('hidden');
      stopMicBtn.classList.remove('hidden');
      populateMics();
    }
  });

  stopMicBtn?.addEventListener('click', () => {
    engine.stopMicrophone();
    startMicBtn.classList.remove('hidden');
    stopMicBtn.classList.add('hidden');
  });

  document.getElementById('testVoiceBtn')?.addEventListener('click', () => {
    engine.speakTestPhrase();
  });

  // Headphone Monitor Button
  const monitorToggleBtn = document.getElementById('monitorToggleBtn');
  const monitorLabel = document.getElementById('monitorLabel');
  monitorToggleBtn?.addEventListener('click', () => {
    const newState = !engine.isMonitoring;
    engine.setMonitoring(newState);
    if (monitorLabel) monitorLabel.textContent = newState ? 'ON' : 'MUTED';
  });

  // DJ Decks
  document.getElementById('deckABrowseBtn')?.addEventListener('click', () => {
    document.getElementById('deckAFileInput')?.click();
  });
  document.getElementById('deckAFileInput')?.addEventListener('change', (e) => {
    if (e.target.files.length > 0) engine.loadDeckTrack('A', e.target.files[0]);
  });
  document.getElementById('deckAPlayBtn')?.addEventListener('click', () => engine.playDeck('A'));
  document.getElementById('deckAPauseBtn')?.addEventListener('click', () => engine.pauseDeck('A'));

  document.getElementById('deckBBrowseBtn')?.addEventListener('click', () => {
    document.getElementById('deckBFileInput')?.click();
  });
  document.getElementById('deckBFileInput')?.addEventListener('change', (e) => {
    if (e.target.files.length > 0) engine.loadDeckTrack('B', e.target.files[0]);
  });
  document.getElementById('deckBPlayBtn')?.addEventListener('click', () => engine.playDeck('B'));
  document.getElementById('deckBPauseBtn')?.addEventListener('click', () => engine.pauseDeck('B'));

  // Crossfader
  document.getElementById('crossfader')?.addEventListener('input', (e) => {
    engine.setCrossfader(parseFloat(e.target.value));
  });

  // Soundboard Cart Wall
  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sfx = btn.dataset.sfx;
      engine.triggerSoundboard(sfx);
    });
  });

  // ON-AIR Live Stream Broadcast Toggle
  const goLiveBtn = document.getElementById('goLiveBtn');
  const onAirBadge = document.getElementById('onAirBadge');
  const wsCount = document.getElementById('wsCount');

  goLiveBtn?.addEventListener('click', async () => {
    await engine.init();
    if (engine.isOnAir) {
      if (engine.ws) {
        engine.ws.close();
        engine.ws = null;
      }
      engine.isOnAir = false;
      goLiveBtn.classList.remove('live');
      goLiveBtn.innerHTML = '<span class="air-icon">📡</span> GO LIVE ON-AIR';
      onAirBadge.className = 'on-air-badge off';
      if (wsCount) wsCount.textContent = 'Offline';
      return;
    }

    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      engine.ws = socket;
      engine.isOnAir = true;
      goLiveBtn.classList.add('live');
      goLiveBtn.innerHTML = '<span class="air-icon">🔴</span> BROADCASTING LIVE';
      onAirBadge.className = 'on-air-badge live';
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'presence' || data.type === 'welcome') {
          if (wsCount) wsCount.textContent = `${data.count} Listener${data.count === 1 ? '' : 's'} Live`;
        }
      } catch (e) {}
    };

    socket.onclose = () => {
      engine.ws = null;
      engine.isOnAir = false;
      goLiveBtn.classList.remove('live');
      goLiveBtn.innerHTML = '<span class="air-icon">📡</span> GO LIVE ON-AIR';
      onAirBadge.className = 'on-air-badge off';
      if (wsCount) wsCount.textContent = 'Offline';
    };
  });

  // Session Recorder
  const recBtn = document.getElementById('recBtn');
  const stopRecBtn = document.getElementById('stopRecBtn');
  const recTimer = document.getElementById('recTimer');
  const clipsList = document.getElementById('clipsList');
  let recInterval = null;

  recBtn?.addEventListener('click', async () => {
    await engine.init();
    engine.startRecording();
    recBtn.classList.add('hidden');
    stopRecBtn.classList.remove('hidden');

    let sec = 0;
    recTimer.textContent = '00:00';
    recInterval = setInterval(() => {
      sec++;
      const m = String(Math.floor(sec / 60)).padStart(2, '0');
      const s = String(sec % 60).padStart(2, '0');
      recTimer.textContent = `${m}:${s}`;
    }, 1000);
  });

  stopRecBtn?.addEventListener('click', async () => {
    clearInterval(recInterval);
    const clip = await engine.stopRecording();
    recBtn.classList.remove('hidden');
    stopRecBtn.classList.add('hidden');

    if (clip && clipsList) {
      const item = document.createElement('div');
      item.className = 'clip-item';
      item.innerHTML = `
        <div>📻 Radio Show Recording (${clip.duration}s)</div>
        <div class="clip-actions">
          <audio src="${clip.url}" controls style="height:28px; width:140px;"></audio>
          <a href="${clip.url}" download="radionest-show.webm" class="btn btn-sm btn-ghost">💾 Download</a>
        </div>
      `;
      clipsList.prepend(item);
    }
  });

  // PWA Service Worker Registration & Install Prompt
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((reg) => console.log('[PWA] ServiceWorker registered with scope:', reg.scope))
        .catch((err) => console.warn('[PWA] ServiceWorker registration failed:', err));
    });
  }

  let deferredPrompt = null;
  const pwaInstallBtn = document.getElementById('pwaInstallBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaInstallBtn) pwaInstallBtn.classList.remove('hidden');
  });

  pwaInstallBtn?.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('[PWA] User response to install prompt:', outcome);
      deferredPrompt = null;
      pwaInstallBtn.classList.add('hidden');
    }
  });
});

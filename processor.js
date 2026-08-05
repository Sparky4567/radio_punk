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
      if (e.data.pitchRatio !== undefined) {
        this.pitchRatio = Math.max(0.25, Math.min(4.0, e.data.pitchRatio));
      }
      if (e.data.grainSize !== undefined) {
        this.grainSize = Math.max(512, Math.min(4096, e.data.grainSize));
      }
    };
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];
    if (!input || !input[0] || !output || !output[0]) return true;

    const inChannel = input[0];
    const outChannel = output[0];
    const len = inChannel.length;

    // Transparent direct passthrough when pitchRatio is 1.0 (default clean mode)
    if (Math.abs(this.pitchRatio - 1.0) < 0.001) {
      outChannel.set(inChannel);
      if (output[1]) output[1].set(inChannel);
      for (let i = 0; i < len; i++) {
        this.buffer[this.writePos] = inChannel[i];
        this.writePos = (this.writePos + 1) % this.bufferSize;
      }
      return true;
    }

    for (let i = 0; i < len; i++) {
      this.buffer[this.writePos] = inChannel[i];

      const p1 = (this.grain1 % this.grainSize) / this.grainSize;
      const p2 = (this.grain2 % this.grainSize) / this.grainSize;

      // Smooth Hann windowing
      const w1 = 0.5 * (1 - Math.cos(2 * Math.PI * p1));
      const w2 = 0.5 * (1 - Math.cos(2 * Math.PI * p2));

      const offset1 = this.grainSize - (this.grain1 % this.grainSize);
      const offset2 = this.grainSize - (this.grain2 % this.grainSize);

      const idx1 = (Math.floor(this.writePos - offset1) % this.bufferSize + this.bufferSize) % this.bufferSize;
      const idx2 = (Math.floor(this.writePos - offset2) % this.bufferSize + this.bufferSize) % this.bufferSize;

      outChannel[i] = this.buffer[idx1] * w1 + this.buffer[idx2] * w2;

      const delta = this.pitchRatio - 1;
      this.grain1 += delta;
      this.grain2 += delta;
      this.writePos = (this.writePos + 1) % this.bufferSize;
    }

    if (output[1]) {
      output[1].set(outChannel);
    }

    return true;
  }
}

class BitcrusherProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bits = 16;
    this.normfreq = 1.0;
    this.phaser = 0;
    this.lastSample = 0;

    this.port.onmessage = (e) => {
      if (e.data.bits !== undefined) this.bits = Math.max(1, Math.min(16, e.data.bits));
      if (e.data.normfreq !== undefined) this.normfreq = Math.max(0.01, Math.min(1.0, e.data.normfreq));
    };
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];
    if (!input || !input[0] || !output || !output[0]) return true;

    const inChannel = input[0];
    const outChannel = output[0];

    // Transparent direct passthrough when default 16-bit
    if (this.bits === 16 && this.normfreq >= 0.99) {
      outChannel.set(inChannel);
      if (output[1]) output[1].set(inChannel);
      return true;
    }

    const len = inChannel.length;
    const step = Math.pow(0.5, this.bits);

    for (let i = 0; i < len; i++) {
      this.phaser += this.normfreq;
      if (this.phaser >= 1.0) {
        this.phaser -= 1.0;
        this.lastSample = step * Math.floor(inChannel[i] / step + 0.5);
      }
      outChannel[i] = this.lastSample;
    }

    if (output[1]) {
      output[1].set(outChannel);
    }

    return true;
  }
}

registerProcessor('pitch-shifter-processor', PitchShifterProcessor);
registerProcessor('bitcrusher-processor', BitcrusherProcessor);

import { deflateSync } from "node:zlib";

function createPng(size: number): Uint8Array {
  const width = size;
  const height = size;
  const rawData = new Uint8Array(height * (width * 4 + 1));

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (width * 4 + 1);
    rawData[rowOffset] = 0;

    for (let x = 0; x < width; x++) {
      const idx = rowOffset + 1 + x * 4;
      const cx = x - width / 2;
      const cy = y - height / 2;
      const dist = Math.sqrt(cx * cx + cy * cy);
      const radius = width * 0.44;

      if (dist <= radius) {
        const t = y / height;
        rawData[idx + 0] = Math.round(255 * (1 - t) + 0 * t);
        rawData[idx + 1] = Math.round(0 * (1 - t) + 242 * t);
        rawData[idx + 2] = Math.round(85 * (1 - t) + 254 * t);
        rawData[idx + 3] = 255;
      } else {
        rawData[idx + 0] = 7;
        rawData[idx + 1] = 10;
        rawData[idx + 2] = 16;
        rawData[idx + 3] = 255;
      }
    }
  }

  const compressedData = deflateSync(rawData);
  const pngHeader = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);

  function makeChunk(type: string, data: Uint8Array): Uint8Array {
    const len = data.length;
    const chunk = new Uint8Array(12 + len);
    const view = new DataView(chunk.buffer);
    view.setUint32(0, len);
    chunk[4] = type.charCodeAt(0);
    chunk[5] = type.charCodeAt(1);
    chunk[6] = type.charCodeAt(2);
    chunk[7] = type.charCodeAt(3);
    chunk.set(data, 8);

    let crc = 0xffffffff;
    for (let i = 4; i < 8 + len; i++) {
      crc ^= chunk[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
      }
    }
    view.setUint32(8 + len, (crc ^ 0xffffffff) >>> 0);
    return chunk;
  }

  const ihdrData = new Uint8Array(13);
  const ihdrView = new DataView(ihdrData.buffer);
  ihdrView.setUint32(0, width);
  ihdrView.setUint32(4, height);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = makeChunk("IHDR", ihdrData);
  const idatChunk = makeChunk("IDAT", compressedData);
  const iendChunk = makeChunk("IEND", new Uint8Array(0));

  const totalLen = pngHeader.length + ihdrChunk.length + idatChunk.length + iendChunk.length;
  const result = new Uint8Array(totalLen);
  let pos = 0;
  result.set(pngHeader, pos); pos += pngHeader.length;
  result.set(ihdrChunk, pos); pos += ihdrChunk.length;
  result.set(idatChunk, pos); pos += idatChunk.length;
  result.set(iendChunk, pos);

  return result;
}

await Bun.write("icon-192.png", createPng(192));
await Bun.write("icon-512.png", createPng(512));
console.log("PWA Icons generated successfully!");

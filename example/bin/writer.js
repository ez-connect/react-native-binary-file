const { closeSync, openSync, unlinkSync, writeSync } = require('fs-extra');

const INT8_LENGTH = 1;
const INT32_LENGTH = 4;
const INT64_LENGTH = 8;

const TEST_BYTE = 127;
const TEST_INT32 = 1024;
const TEST_INT64 = -4399732317488540; // Math.floor(Math.random() * Number.MIN_SAFE_INTEGER)
const TEST_FLOAT32 = 1274908055393305.8; // Math.random() * Number.MIN_SAFE_INTEGER
const TEST_FLOAT64 = 5.791361377691017e+307; // Math.random() * Number.MAX_VALUE)

const FILE_NAME = '../assets/test-file.dat';

const file = openSync(FILE_NAME, 'w');
console.info(`Write to ${FILE_NAME}`);

let pos = 0;

// Write 1 byte
let buf = Buffer.alloc(INT8_LENGTH);
buf.writeInt8(TEST_BYTE, 0);
pos += writeSync(file, buf, 0, buf.length, pos);

// Write int32
buf = Buffer.alloc(INT32_LENGTH);
buf.writeInt32BE(TEST_INT32, 0);
pos += writeSync(file, buf, 0, buf.length, pos);

// Write int64
buf = Buffer.alloc(INT64_LENGTH);
// buf.writeBigInt64BE(TEST_INT64, 0); // available on Node v12+
buf.writeInt32BE(TEST_INT64 >> 8, 0);
buf.writeInt32BE(TEST_INT64 & 0xff, 4);
pos += writeSync(file, buf, 0, buf.length, pos);

// Write float32
buf = Buffer.alloc(INT32_LENGTH);
buf.writeFloatBE(TEST_FLOAT32, 0);
pos += writeSync(file, buf, 0, buf.length, pos);

// Write float64
buf = Buffer.alloc(INT64_LENGTH);
buf.writeFloatBE(TEST_FLOAT64, 0);
pos += writeSync(file, buf, 0, buf.length, pos);

// Write string
buf = [72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]; // Hello world
pos += writeSync(file, buf, 0, buf.length, pos);

closeSync(file);

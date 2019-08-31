
# react-native-binary-file

A simple binary file reader for react-native. It uses `RandomAccessFile` and `FileHandle`.

## Getting started

`$npm i react-native-binary-file`

Or

`$ yarn add react-native-binary-file`

### Mostly automatic installation

#### React-Native < 0.60.x

`$ react-native link react-native-binary-file`

You can add and install use `react-native install`

`$ react-native install react-native-binary-file`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-binary-file` and add `RNBinaryFile.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNBinaryFile.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`

2. Add `import com.reactlibrary.RNBinaryFilePackage;` to the imports at the top of the file

3. Add `new RNBinaryFilePackage()` to the list returned by the `getPackages()` method

4. Setup gradle

Append the following lines to `android/settings.gradle`:

```gradle
  include ':react-native-binary-file'
  project(':react-native-binary-file').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-binary-file/android')
```

Insert the following lines inside the dependencies block in `android/app/build.gradle`:

```gradle
  compile project(':react-native-binary-file')
```

## API

```javascript
class BinaryFile {
  open(filename: string): Promise<number>;
  close(fd: number): Promise<void>;
  seek(fd: number, pos: number): Promise<void>;
  read(fd: number, len: number): Promise<Uint8Array>;
  readByte(fd: number): Promise<number>;
  readInt32(fd: number): Promise<number>;
  readInt64(fd: number): Promise<number>;
  readFloat32(fd: number): Promise<number>;
  readFloat64(fd: number): Promise<number>;
}
```

## Usage

```javascript
import { BinaryFile } from 'react-native-binary-file';

// Open a file for reading
const fd = await BinaryFile.open('path-to-file');

// Read a byte
const byteValue = await BinaryFile.readByte(fd);
// Read a next integer (int32) - big endian
const intValue = await BinaryFile.readInt32(fd);
// Read a next integer (int64) - big endian
const intValue = await BinaryFile.readInt64(fd);

// Seek to 1024
await BinaryFile.seek(fd, 1024);
// Read 512 bytes (uint8[])
const buffer = await BinaryFile.read(fd, 512);

// Close the file
await BinaryFile.close(fd);

// Another file
const fd2 = await BinaryFile.open('path-to-file-2');
// ...
await BinaryFile.close(fd2);
```

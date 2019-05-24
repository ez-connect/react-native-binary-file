
# react-native-binary-file

## Getting started

`$ yarn add react-native-binary-file`

Or

`$ react-native install react-native-binary-file`

### Mostly automatic installation

`$ react-native link react-native-binary-file`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-binary-file` and add `RNBinaryFile.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNBinaryFile.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNBinaryFilePackage;` to the imports at the top of the file
  - Add `new RNBinaryFilePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-binary-file'
  	project(':react-native-binary-file').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-binary-file/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-binary-file')
  	```

## Usage

```javascript
import BinaryFile from 'react-native-binary-file';

// Open a file for reading
const fd = await BinaryFile.open('path-to-file');
// Read a byte
const byteValue = await BinaryFile.readByte(fd);
// Read a next integer (int32) - big endian
const intValue = await BinaryFile.readInt(fd);

// Seek to 1024
await BinaryFile.seek(fd, 1024);
// Read 512 bytes (uint8[])
const buffer = await BinaryFile.read(fd, 512);

// Close the file
await BinaryFile.close(fd);
```

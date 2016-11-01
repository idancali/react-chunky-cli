<p align="center">
  <a href="https://github.com/idancali/react-chunky-cli">
    <img height="256" src="https://raw.githubusercontent.com/idancali/react-chunky-cli/master/logo.png">
  </a>
  <p align="center"> <b> React Chunky </b> Helps You Digest Your React Mobile And Web Apps In Manageable Chunks. </p>
</p>

# React Chunky
[![Version](https://img.shields.io/npm/v/react-chunky-cli.svg)](https://www.npmjs.com/package/react-chunky-cli)
[![Author](https://img.shields.io/badge/say%20hi-%40idancali-green.svg)](https://twitter.com/idancali)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fidancali)

# Overview

React Chunky helps you build solid React Web and Mobile apps, faster and easier. It does that by splitting up parts of your app into more manageable sections - or Chunks.

# Installation

```javascript
npm install -g react-chunky-cli
```

# Usage

Creating a brand new React Web app is as easy as this:

```javascript
chunky init --name MyApp
```

If you want to create a React Native app instead, add the ```--native``` flag:

```javascript
chunky init --native --name MyApp
```

# Starting Your App

Great, you should now find a newly created ```MyApp``` directory in your current working path. Go ahead and look through it:

```javascript
cd MyApp
```

To start your app up with all its underlaying dependencies, simply call Chunky with the platform you desire to start.

To start your iOS app, for example:

```javascript
chunky ios
```

# Writing Chunks

After creating your React Chunky app as shown above, you should be ready to write some Chunks. Have a look at [Writing A Real-World Chunk](https://github.com/idancali/react-chunky#writing-a-real-world-chunk) for more details on what constitutes a full-blown Chunk.

# License

Copyright (c) 2016 I. Dan Calinescu

 Licensed under the The MIT License (MIT) (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://raw.githubusercontent.com/idancali/react-chunky-cli/master/LICENSE

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

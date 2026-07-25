---
name: video-engineering
description: Specializes in implementing web-based video playback, streaming (WebRTC, HLS), and in-browser video processing.
---
# Video Engineering

When working with video on the frontend, apply these strategies:

1.  **HTML5 Video**: Use the native `<video>` tag for simple MP4/WebM playback. Always provide proper attributes (`controls`, `playsinline`, `preload="metadata"`).
2.  **Streaming Protocols (HLS / DASH)**: For VOD (Video on Demand) or live streaming, utilize libraries like `hls.js`, `dash.js`, or fully featured players like `Video.js` or `Plyr`. This ensures adaptive bitrate streaming (changing quality based on network speed).
3.  **WebRTC**: For ultra-low latency real-time communication (video calls, live broadcasting), use the WebRTC API. Manage ICE candidates, STUN/TURN servers, and peer connections carefully.
4.  **Video Performance**:
    *   Avoid auto-playing unmuted video, as browsers will block it.
    *   Use poster images (`poster="..."`) so the UI doesn't look empty while the video loads.
    *   Unload off-screen videos or use Intersection Observer to pause them to save CPU and bandwidth.
5.  **Advanced Processing**: For browser-based video editing or transcoding, consider integrating `@ffmpeg/ffmpeg` (FFmpeg.wasm) to process video directly on the client side using WebAssembly.

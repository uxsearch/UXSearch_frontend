import React from 'react'
import videojs from 'video.js'
import RecordRTC from 'recordrtc'
import Record from 'videojs-record/dist/videojs.record'

import 'webrtc-adapter'
import '../../../../node_modules/videojs-record/dist/css/videojs.record.css'
import '../../../../node_modules/video.js/dist/video-js.css'

const CameraOptions = {
  controls: {
    autoPlay: true
  },
  loop: false,
  fluid: false,
  autoSetup: true,
  plugins: {
    record: {
      autoPlay: true,
      audio: false,
      screen: true,
      maxLength: 10, //1200 seconds
      debug: true
    }
  }
};

const recordAuto = () => {
  document.getElementById('screenButton').click()
}

class Screen extends React.Component {

  async componentDidMount() {
    this.player = videojs(this.videoNode, CameraOptions, () => {
      var version_info = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
      videojs.log(version_info)
      this.player.children_[1].setAttribute('id', 'screenButton')
      this.player.children_[1].setAttribute('onLoad', recordAuto())
    });

    // device is ready
    this.player.on('deviceReady', () => {
      console.log('device is ready!');
      this.player.record().start()
    });
    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      console.log('started recording!');
    });
    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished recording: ', this.player.recordedData);
      this.player.record().saveAs({'video': 'screen_video.webm'});
    });
    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });
    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }
  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  render() {
    return (
      <div data-vjs-player>
        <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin myVideo-dimension" playsInline></video>
      </div>
    );
  }
}

export default Screen
'use strict';

var constraints = {
  video: true
};

const video = document.getElementById('video')

function handleSuccess(stream) {
  window.stream = stream; // only to make stream available to console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('getUserMedia error: ', error);
}

const startVideo = () => {
  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
}

// startVideo()

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    if (resizedDetections.length !== 0) {
      resizedDetections.forEach((detection) => {
        const box = detection.detection.box
        const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' })
        drawBox.draw(canvas)
      })
    }
    // console.log(resizedDetections[0].detection.box)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})


const getNameLabel = () => {
  const listLabels = ['Tuan Anh']
  return Promise.all(
    listLabels.map(async label => {
      for (let i = 1; i <= 2; i++)
    })
  )
}

// console.log(faceapi)
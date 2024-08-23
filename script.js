const URL = 'https://teachablemachine.withgoogle.com/models/PPtinubGs/';
const THRESHOLD = 0.9;

window.onload = () => {
  let recognizer;

  async function createModel() {
    const checkpointURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    const recognizer = speechCommands.create(
      'BROWSER_FFT',
      undefined,
      checkpointURL,
      metadataURL
    );

    await recognizer.ensureModelLoaded();

    return recognizer;
  }

  async function init() {
    recognizer = await createModel();

    recognizer.listen(
      result => {
        const scores = result.scores;
        const chatIndex = recognizer.wordLabels().indexOf('Chat');

        if (scores[chatIndex] > THRESHOLD) {
          console.log("Chat detected");
          document.getElementById('message').innerText = "Chat is this fr";
        }
      },
      {
        includeSpectrogram: true,
        probabilityThreshold: 0.40,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.5
      }
    );
  }

  init();
};

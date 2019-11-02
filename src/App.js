import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ConnectedImageCapture, ImageCapture } from './TensorComponents/ImageCapture';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { WorkshopContext } from './AppContext';
import { ExampleInput, ConnectedExampleInput } from './ExampleInput';
import { ConnectedImageCaptureButton } from './ImageCaptureButtons';
import { ConnectedPrediction } from './Prediction';
import { ImageUpload, ConnectedImageUpload } from './ImageUpload';

function App() {
  return (
    <div className="App">
      <WorkshopContext>
		<ConnectedExampleInput />
		<ConnectedPrediction />
		<ConnectedImageUpload />
      </WorkshopContext>
    </div>
  );
}

export default App;

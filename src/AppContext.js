import React from 'react';
import * as mobilenetModule from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as tf from '@tensorflow/tfjs';
import { setInterval } from 'timers';

export const AppContext = React.createContext({});

export class WorkshopContext extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            camera: null,
            net: null,
            classifier: knnClassifier.create(),
            examples: [],
            result: null
        };

        this.setCamera = this.setCamera.bind(this);
        this.addExample = this.addExample.bind(this);
        this.newExample = this.newExample.bind(this);
        this.checkResults = this.checkResults.bind(this);
    }

    async initNet() {
        const net = await mobilenetModule.load();
        console.log(net);
        this.setState({ net: net });
        setInterval(this.checkResults, 20)        
    }

    componentDidMount() {
        this.initNet();
    }
    
    setCamera(camera) {
        this.setState({ camera: camera });
    }

    newExample(exampleId) {
        if (this.state.examples.indexOf(exampleId) !== -1) {
            return;
        }
        const newExamples = [...this.state.examples, exampleId];
        //console.log(newExamples);
        this.setState({ examples: newExamples });
    }

    async checkResults() {
        const { classifier, net, camera } = this.state;
        if (classifier.getNumClasses() > 0) {
            const img = await camera.capture();
      
            // Get the activation from mobilenet from the webcam.
            const activation = net.infer(img, 'conv_preds');
            // Get the most likely class and confidences from the classifier module.
            const result = await classifier.predictClass(activation);
      
            // const classes = ['A', 'B', 'C'];
            // document.getElementById('console').innerText = `
            //   prediction: ${classes[result.label]}\n
            //   probability: ${result.confidences[result.label]}
            // `;s
      
            // Dispose the tensor to release the memory.
            this.setState({ result: result })
            img.dispose();
          }
      
          await tf.nextFrame();
    }

    async addExample(classId) {
        if (!this.state.camera || !this.state.net || !classId) {
            return;
        }
        const img = await this.state.camera.capture();

        // Get the intermediate activation of MobileNet 'conv_preds' and pass that
        // to the KNN classifier.
        const activation = this.state.net.infer(img, 'conv_preds');

        // Pass the intermediate activation to the classifier.
        this.state.classifier.addExample(activation, classId);

        // Dispose the tensor to release the memory.
        img.dispose();
    }

    render() {
        //console.log(this.state.examples);
        return (
            <AppContext.Provider value={{
                state: this.state,
                actions: {
                    setCamera: this.setCamera,
                    newExample: this.newExample,
                    addExample: this.addExample
                }
            }}>
                {this.state.net ? "Ready to go!" : "Net still initializing"}
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
import React from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenetModule from '@tensorflow-models/mobilenet';
import { AppContext } from '../AppContext';

export class ImageCapture extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            camera: null
        }
    }

    async componentDidMount() {
        const webcam = document.getElementsByClassName("image-capture__camera-element")[0];
        const tfCamera = await tf.data.webcam(webcam);
        //console.log(this.props);
        this.props.setCamera(tfCamera);
        this.setState(tfCamera);
    }

    render() {
        return (
            <div className="image-capture__wrapper">
                <video className="image-capture__camera-element"></video>
            </div>
        );
    }
}

export class ConnectedImageCapture extends React.PureComponent {
    render() {
        return (
            <AppContext.Consumer>
                {context => (
                    <ImageCapture setCamera={context.actions.setCamera}/>
                )}
            </AppContext.Consumer>
        );
    }
}
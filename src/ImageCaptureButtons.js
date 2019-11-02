import React from 'react';
import { AppContext } from './AppContext';

export class ImageCaptureButton extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { examples, image, addImageFileExample, resetImageState } = this.props;
        //console.log(examples);
        console.log(image);
        return (
            <div className="image-capture-button__wrapper">
                {examples.map(e => <button id={`${e}`} key={e} onClick={() => {
                    addImageFileExample(e, image);
                    resetImageState();
                }}>
                {e}
                </button>
            )}
            </div>
        );
    }
}

export const ConnectedImageCaptureButton = (props) => (
    <AppContext.Consumer>
        {context => (
            <ImageCaptureButton examples={context.state.examples} addImageFileExample={context.actions.addImageFileExample} resetImageState={props.resetImageState} image={props.image}/>
        )}
    </AppContext.Consumer>
);
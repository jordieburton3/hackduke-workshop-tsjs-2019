import React from 'react';
import { AppContext } from './AppContext';

export class ImageCaptureButton extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { examples } = this.props;
        //console.log(examples);
        return (
            <div className="image-capture-button__wrapper">
                {examples.map(e => <button id={`${e}`} key={e} onClick={() => this.props.addExample(e)}>{e}</button>)}
            </div>
        );
    }
}

export const ConnectedImageCaptureButton = () => (
    <AppContext.Consumer>
        {context => (
            <ImageCaptureButton examples={context.state.examples} addExample={context.actions.addExample}/>
        )}
    </AppContext.Consumer>
);
import React from 'react';
import { AppContext } from './AppContext';

class Prediction extends React.PureComponent {
    render() {
        const { result } = this.props;
        console.log(result);
        return (
            <div className="prediction__wrapper">
                <p>Prediction: {result ? result.label : ""}</p>
                <p>Probability: {result ? result.confidences[result.label] : ""}</p>
            </div>
        );
    }
}

export const ConnectedPrediction = () => (
    <AppContext.Consumer>
        {context => (
            <Prediction result={context.state.result}/>
        )}
    </AppContext.Consumer>
);
import React from 'react';
import { AppContext } from './AppContext';

export class ExampleInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleOnSubmit(event) {
        event.preventDefault();
        //console.log(this.props)
        this.props.newExample(this.state.value);
        this.setState({ value: "" });
    }

    render() {
        return (
            <div className="example-input__wrapper">
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}

export const ConnectedExampleInput = () => (
    <AppContext.Consumer>
        {context => (
            <ExampleInput newExample={context.actions.newExample}/>
        )}
    </AppContext.Consumer>
);
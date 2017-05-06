import React from 'react'

class Button extends React.Component {
    render() {
        return (
            <button className="button" onClick={this.props.click}>{this.props.text}</button>
        )
    }
}

export default Button
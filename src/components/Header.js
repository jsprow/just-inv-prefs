import React from 'react'

class Header extends React.Component {

    render() {
        return (
            <div id="header">
                <h1>{this.props.text}</h1>
            </div>
        )
    }
}

export default Header
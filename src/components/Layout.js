import React from 'react'
import Selectors from './Selectors'

const testExp = new RegExp('Android|webOS|iPhone|iPad|' +
    'BlackBerry|Windows Phone|' +
    'Opera Mini|IEMobile|Mobile',
    'i')

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = { mobile: '' }
    }
    componentDidMount() {
        if (testExp.test(navigator.userAgent))
            this.setState({ mobile: 'mobile' })
    }
    render() {
        return (
            <div className="layout">
                <div className="container">
                    <h1>Pick Your Dang Car!</h1>
                </div>
                <Selectors mobile={this.state.mobile} />
            </div>
        )
    }
}

export default Layout

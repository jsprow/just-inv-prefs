import React from 'react'
// import Selectors from './Selectors'
import Header from './Header'
import MobileInput from './MobileInput'
import Selectors from './Selectors'
import Button from './Button'

const testExp = new RegExp('Android|webOS|iPhone|iPad|' +
    'BlackBerry|Windows Phone|' +
    'Opera Mini|IEMobile|Mobile',
    'i')
const pages = [
    0,
    1,
    2
]
const headers = [`What's Your Number?`, `Pick Your Car!`, `Send Your Prefs`]
const forwardButtons = ['Set Number', 'Pick Car', 'Send Prefs']
const backButtons = ['', 'Back to Phone', 'Back to Cars']

var mobileNumber

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            validMobile: false,
            pageState: pages[0],
            header: headers[0],
            forwardButton: forwardButtons[0],
            backButton: backButtons[0]
        }
        this.goForward = this.goForward.bind(this)
        this.goBack = this.goBack.bind(this)
        this.getMobile = this.getMobile.bind(this)
    }
    componentDidMount() {
        if (testExp.test(navigator.userAgent))
            this.setState({ mobile: 'mobile' })
    }
    getMobile(event) {
        mobileNumber = event.target.value

        let input = document.getElementById('mobileInput'),
            _mobile = mobileNumber.replace(/[^0-9.]/g, '')

        if (_mobile.length === 10) {
            input.classList.remove('invalid')
            this.setState({ validMobile: true })
        } else {
            input.classList.add('invalid')
            this.setState({ validMobile: false })
        }

    }
    goForward() {
        if (this.state.pageState === pages[0])
            if (this.state.validMobile)
                this.setState({
                    pageState: pages[1],
                    header: headers[1],
                    forwardButton: forwardButtons[1],
                    backButton: backButtons[1]
                })
        if (this.state.pageState === pages[1])
            this.setState({
                pageState: pages[2],
                header: headers[2],
                forwardButton: forwardButtons[2],
                backButton: backButtons[2]
            })
    }
    goBack() {
        if (this.state.pageState === pages[1]) {
            this.setState({
                pageState: pages[0],
                header: headers[0],
                forwardButton: forwardButtons[0],
                backButton: backButtons[0]
            })
        }
        if (this.state.pageState === pages[2]) {
            this.setState({
                pageState: pages[1],
                header: headers[1],
                forwardButton: forwardButtons[1],
                backButton: backButtons[1]
            })
        }
    }
    render() {
        const pageState = this.state.pageState
        let Page = null

        if (pageState === pages[0])
            Page = <MobileInput blur={this.getMobile} />
        else if (pageState === pages[1])
            Page = <Selectors />

        return (
            <div className="layout">
                <Header text={this.state.header} />
                <div id="pageState">
                    {Page}
                </div>
                <Button click={this.goBack} text={this.state.backButton} />
                <Button click={this.goForward} text={this.state.forwardButton} />
                {/*<Selectors mobile={this.state.mobile} />*/}
            </div>
        )
    }
}

export default Layout

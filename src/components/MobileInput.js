import React from 'react'

var mobileNumber

class MobileInput extends React.Component {
    constructor(props) {
        super(props)
        this.getMobile = this.getMobile.bind(this)
    }
    getMobile(e) {
        mobileNumber = e.target.value
        console.log(e.target.value)
    }
    render() {
        return <InputElement className="mobile-input" onBlur={this.getMobile} mask={"\\(999\\)999\\-9999"} maskChar={" "} alwaysShowMask={true} />
    }
}

export const mobile = mobileNumber
export default MobileInput
import React from 'react'
import InputElement from 'react-input-mask'

class MobileInput extends React.Component {   
    render() {
        return (
            <InputElement 
                onChange={this.props.change} 
                onBlur={this.props.blur} 
                id="mobileInput" 
                className="mobile-input" 
                mask={"\\(999\\)999\\-9999"} 
                maskChar={" "} 
                alwaysShowMask={true} 
            />
        )
    }
}

export default MobileInput
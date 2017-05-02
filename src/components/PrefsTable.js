import React from 'react'

class PrefsTable extends React.Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.make}</td>
                        <td>{this.props.model}</td>
                        <td>{this.props.year}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default PrefsTable
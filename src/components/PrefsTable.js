import React from 'react'

class PrefsTable extends React.Component {
    render() {
        return (
            <div className={"container " + this.props.visible}>
                <h1>Your Picks:</h1>
                <table className="prefs-table">
                    <thead className="prefs-head">
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody id="prefs-body">
                        {this.props.prefs}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PrefsTable
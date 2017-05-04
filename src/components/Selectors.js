import React from 'react'
import carListBig from '../data/carList.json'
import io from 'socket.io-client'

var socket = io('http://localhost:3030')
socket.on('ready', function (data) {
    console.log(data)
})
// import seetdrandom from 'seedrandom'

const carList = carListBig.makes

var makes = [],
    models = [],
    years = [],
    pref,
    prefs = [],
    modelsList,
    yearsList,
    prefsList,
    makeSelected,
    modelSelected,
    modelsDisabled = 'disabled',
    yearsDisabled = 'disabled',
    tableVisible = 'not-visible'

function Makes() {
    makes = ['Select Make']
    for (var i = 0; i < carList.length; i++) {
        var make = carList[i].name

        if (makes.indexOf(make) === -1) {
            makes.push(make)
        }
    }
    const makesList = makes.map((make, index) => {
        return <option key={'make_' + index}>{make}</option>
    })
    return (
        <div className="select-box">
            <select id="makesList" onChange={getModels}>{makesList}</select>
        </div>
    )
}
function getModels() {
    models = ['Select Model']
    modelsDisabled = 'enabled'
    pref = { 'make': '', 'model': '', 'year': '' }

    makeSelected = document.getElementById('makesList').value

    for (let i = 0; i < carList.length; i++) {
        let make = carList[i].name,
            _models = carList[i].models

        if (makeSelected === make) {
            for (let i = 0; i < _models.length; i++) {
                let model = _models[i].name
                models.push(model)
            }
        }
    }
    modelsList = models.map((model, index) => {
        return <option key={'model_' + index}>{model}</option>
    })
}
class Models extends React.Component {
    render() {
        return (
            <div className={"select-box " + this.props.disabled}>
                <select id="modelsList" onChange={getYears}>{this.props.models}</select>
            </div>
        )
    }
}
function getYears() {
    years = ['Select Year']
    yearsDisabled = 'enabled'

    modelSelected = document.getElementById('modelsList').value

    for (let i = 0; i < carList.length; i++) {
        if (makeSelected === carList[i].name) {
            var _models = carList[i].models
            for (let i = 0; i < _models.length; i++) {
                if (modelSelected === _models[i].name) {
                    var _years = _models[i].years
                    for (let i = 0; i < _years.length; i++) {
                        let year = _years[i].year;
                        years.push(year)
                    }
                }
            }
        }
    }
    yearsList = years.map((year, index) => {
        return <option key={'year' + index}>{year}</option>
    })
}
class Years extends React.Component {
    render() {
        return (
            <div className={"select-box " + this.props.disabled}>
                <select id="yearsList">{this.props.years}</select>
            </div>
        )
    }
}
class Pref extends React.Component {
    render() {
        return (
            <tr id={'pref_' + this.props.index}>
                <td>{this.props.make}</td>
                <td>{this.props.model}</td>
                <td>{this.props.year}</td>
                <td onClick={this.removePref} id={'close_' + this.props.index}>&#10006;</td>
            </tr>
        )
    }
}
function submitPrefs(event) {
    if (pref.make.length === 0 && document.getElementById('makesList')) {
        var make = document.getElementById('makesList').value
        if (make !== 'Select Make') {
            pref.make = make
        }
    }
    if (pref.model.length === 0 && document.getElementById('modelsList')) {
        var model = document.getElementById('modelsList').value
        if (model !== 'Select Model') {
            pref.model = model
        }
    }
    if (pref.year.length === 0 && document.getElementById('yearsList')) {
        var year = document.getElementById('yearsList').value
        if (year !== 'Select Year') {
            pref.year = year
        }
    }
    prefs.push(pref)
    prefsList = prefs.map((pref, index) => {
        return (
            <Pref key={'pref_' + index} index={index} make={pref.make} model={pref.model} year={pref.year} />
        )
    })
    pref = { 'make': '', 'model': '', 'year': '' }
}
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
class Selectors extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            models: modelsList,
            years: yearsList,
            modelsDisabled: modelsDisabled,
            yearsDisabled: yearsDisabled,
            tableVisible: tableVisible,
            prefs: prefs
        }
        this.submit = this.submit.bind(this)
    }
    change() {
        this.setState({
            models: modelsList,
            years: yearsList,
            modelsDisabled: modelsDisabled,
            yearsDisabled: yearsDisabled
        })
    }
    submit() {
        submitPrefs(event)
        tableVisible = 'is-visible'
        this.setState({ tableVisible: tableVisible, prefs: prefsList })
    }
    send() {
        var _prefs = []
        if (prefsList) {
            for (var i = 0; i < prefsList.length; i++) {
                _prefs.push({
                    "make": prefsList[i].props.make,
                    "model": prefsList[i].props.model,
                    "year": prefsList[i].props.year
                })
            }
            socket.emit('send-prefs', { _prefs })
            console.log(_prefs)
        }
    }
    render() {
        return (
            <div className="container">
                <form id="selectorBox" onChange={() => this.change()} >
                    <div className="select-style">
                        <Makes />
                        <Models disabled={this.state.modelsDisabled} models={this.state.models} />
                        <Years disabled={this.state.yearsDisabled} years={this.state.years} />
                        <button type="button" className="submit-button" onClick={this.submit} >Pick</button>
                    </div >
                </form >
                <PrefsTable prefs={prefsList} visible={this.state.tableVisible} />
                <button className="submit-button" onClick={this.send}>Send</button>
            </div >
        )
    }
}

export default Selectors
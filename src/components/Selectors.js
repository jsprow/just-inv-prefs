import React from 'react'
import ReactDOM from 'react-dom'
import carListBig from '../data/carList.json'

const carList = carListBig.makes

var makes = [],
    models = [],
    years = [],
    modelsList,
    yearsList,
    modelsDisabled = 'disabled',
    yearsDisabled = 'disabled'

function Prefs(make, model, years) {
    this.make = []
    this.model = []
    this.year = []
}

var pref = new Prefs()
function Makes() {
    makes = ['']
    for (var i = 0; i < carList.length; i++) {
        var make = carList[i].name

        if (makes.indexOf(make) === -1) {
            makes.push(make)
        }
    }
    const makesList = makes.map((make, index) => {
        return <option key={'make' + index}>{make}</option>
    })
    return (
        <div className="select-box enabled">
            <select id="makesList" onChange={getModels}>{makesList}</select>
        </div>
    )
}
function getModels() {
    models = []
    modelsDisabled = 'enabled'
    pref = new Prefs()

    const makeSelected = document.getElementById('makesList').value

    pref.make = []
    pref.make.push(makeSelected)
    console.log(pref.make)

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
        return <option key={'model' + index}>{model}</option>
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
    const modelSelected = document.getElementById('modelsList').value
    years = []
    yearsDisabled = 'enabled'
    pref.model = []
    pref.model.push(modelSelected)

    for (let i = 0; i < carList.length; i++) {
        if (pref.make[0] === carList[i].name) {
            var _models = carList[i].models
            for (let i = 0; i < _models.length; i++) {
                if (pref.model[0] === _models[i].name) {
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
                <select id="yearsList" onChange={handlePrefs}>{this.props.years}</select>
            </div>
        )
    }
}
function handlePrefs() {
    const yearSelected = document.getElementById('yearsList').value

    pref.year.push(yearSelected)
    console.log(pref.make, pref.model, pref.year)
}
function submitPrefs(event) {
    if (pref.make.length === 0 && document.getElementById('makesList')) {
        pref.make.push(document.getElementById('makesList').value)
    }
    if (pref.model.length === 0 && document.getElementById('modelsList')) {
        pref.model.push(document.getElementById('modelsList').value)
    }
    if (pref.year.length === 0 && document.getElementById('yearsList')) {
        pref.year.push(document.getElementById('yearsList').value)
    }

    console.log(pref.make, pref.model, pref.year)

    event.preventDefault()
    ReactDOM.render(
        <tr>
            <td>{pref.make[0]}</td>
            <td>{pref.model[0]}</td>
            <td>{pref.year[0]}</td>
        </tr>,
        document.getElementById('prefs-body')
    )
}
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
                <tbody id="prefs-body">
                </tbody>
            </table>
        )
    }
}
class Selectors extends React.Component {
    constructor(props) {
        super(props)
        this.state = { models: modelsList, years: yearsList, modelsDisabled: modelsDisabled, yearsDisabled: yearsDisabled }
    }
    change() {
        this.setState({ models: modelsList, years: yearsList, modelsDisabled: modelsDisabled, yearsDisabled: yearsDisabled })
    }
    render() {
        return (
            <div className="container">
                <form id="selectorBox" onChange={() => this.change()} >
                    <div className="select-style">
                        <Makes />
                        <Models disabled={this.state.modelsDisabled} models={this.state.models} />
                        <Years disabled={this.state.yearsDisabled} years={this.state.years} />
                        <input className="submit-button" type="submit" onClick={submitPrefs} value="Submit" />
                    </div >
                </form >
                <PrefsTable />
            </div >
        )
    }
}

export default Selectors
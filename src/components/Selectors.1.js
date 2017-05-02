import React from 'react'
import ReactDOM from 'react-dom'
import carListBig from '../data/carList.json'
import _ from 'lodash'

const carList = carListBig.makes

var makes = [],
    models = [],
    years = []

function Prefs(make, model, years) {
    this.make = []
    this.model = []
    this.year = []
}

var pref = new Prefs()
function Makes() {
    makes = []
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
        <select id="makesList" onChange={getModels}>{makesList}</select>
    )
}
function getModels() {
    models = []
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
    const modelsList = models.map((model, index) => {
        return <option key={'model' + index}>{model}</option>
    })
    ReactDOM.render(
        <select id="yearsList" onChange={handlePrefs}></select>,
        document.getElementById('yearsBox')
    )
    ReactDOM.render(
        <select id="modelsList" onChange={getYears}>{modelsList}</select>,
        document.getElementById('modelsBox')
    )
}
function getYears() {
    const modelSelected = document.getElementById('modelsList').value
    years = []
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
    const yearsList = years.map((year, index) => {
        return <option key={'year' + index}>{year}</option>
    })
    ReactDOM.render(
        <select id="yearsList" onChange={handlePrefs}>{yearsList}</select>,
        document.getElementById('yearsBox')
    )
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
}
class Selectors extends React.Component {
    render() {
        return (
            <form id="selectorBox">
                <div id="makesBox"><Makes /></div>
                <div id="modelsBox"></div>
                <div id="yearsBox"></div>
                <input type="submit" onClick={submitPrefs} value="Submit" />
            </form>
        )
    }
}

export default Selectors
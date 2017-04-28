import React from 'react'
import ReactDOM from 'react-dom'
import carList from '../data/carListParsed.json'

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
        var make = carList[i].make

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

    for (var i = 0; i < carList.length; i++) {
        var make = carList[i].make,
            model = carList[i].model

        if (makeSelected === make) {
            models.push(model)
        }
    }
    const modelsList = models.map((model, index) => {
        return <option key={'model' + index}>{model}</option>
    })
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
    console.log(pref.make, pref.model)

    for (var i = 0; i < carList.length; i++) {
        var model = carList[i].model,
            year = carList[i].years

        if (modelSelected === model) {
            years.push(year)
        }
    }
    const yearsList = years.map((year) => {
        return year.map((_year, index) => {
            return <option key={'year' + index}>{_year}</option>
        })
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
function Selectors() {
    return (
        <form id="selectorBox">
            <div id="makesBox"><Makes /></div>
            <div id="modelsBox"></div>
            <div id="yearsBox"></div>
            <input type="submit" onClick={submitPrefs} value="Submit" />
        </form>
    )
}

export default Selectors
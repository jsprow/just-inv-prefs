import React from 'react'
import Banner from  './Banner'
import Selectors from  './Selectors'
import PrefsTable from './PrefsTable'

function Layout() {
    return(
        <div className="layout">
            <Banner />
            <Selectors />
            <PrefsTable />
        </div>
    )
}

export default Layout

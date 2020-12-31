import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMusic} from '@fortawesome/free-solid-svg-icons'
function Nav( {libraryStatus , setLibraryStatus}) {
    return (
        <nav>
            <h1 className = "name">waves</h1>
            <button onClick = {() => setLibraryStatus(!libraryStatus)}>
                <FontAwesomeIcon icon = {faMusic} />
                Library
            </button> 
        </nav>
    )
}

export default Nav

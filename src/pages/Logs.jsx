import React from 'react'
import { NavLink } from 'react-router-dom'

const Logs = () => {
    return (
        <div>
            Logs
            <button>
                <NavLink
                    to="/interview-screen/result-logs">
                    Finish Interview
                </NavLink>
            </button>
        </div>
    )
}

export default Logs
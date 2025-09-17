import "../styles/InterViewScreen.css"
import { Outlet } from 'react-router-dom'

const InterViewScreen = () => {
  return (
    <div>
        <h1>InterViewScreen</h1>
        <Outlet/>
    </div>
  )
}

export default InterViewScreen
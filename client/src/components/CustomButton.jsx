import { useSnapshot } from "valtio"
import state from "../store"

const CustomButton = ({type, title , handleClick, customstyles }) => {
    const snap = useSnapshot(state);
    const generateStyle = (type) => {
        if (type === "filled") {
            return {
                backgroundColor: snap.color,
                color: "#fff"
            }
        }
    }
  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md ${customstyles}` } onClick={handleClick} style={generateStyle(type)}>{title}</button>
  )
}

export default CustomButton
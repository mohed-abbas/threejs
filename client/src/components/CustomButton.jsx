import { useSnapshot } from "valtio"
import state from "../store"
import { getContrastingColor } from "../config/helpers";
const CustomButton = ({type, title , handleClick, customstyles }) => {
    const snap = useSnapshot(state);
    const generateStyle = (type) => {
        if (type === "filled") {
            return {
                backgroundColor: snap.color,
                color:  getContrastingColor(snap.color)
            }
        }else if ( type=== 'outline') {
          return {
            backgroundColor: 'transparent',
            border: `1px solid`  + snap.color,
            color:  getContrastingColor(snap.color)
          }
        }
    }
  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md ${customstyles}` } onClick={handleClick} style={generateStyle(type)}>{title}</button>
  )
}

export default CustomButton
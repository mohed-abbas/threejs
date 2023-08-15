
import { useSnapshot } from "valtio"
import state from "../store"
import CustomButton from "./CustomButton"
const FilePicker = ({file, setFile, readfile}) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input 
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor='file-upload' className="filepicker-label">
          Upload file
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === '' ? 'No file selected' : file.name }
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-6">
        <CustomButton
          type='outline'
          title='Logo'
          handleClick={() =>readfile('logo')}
          customstyles='text-xs'
        />
        <CustomButton
          type='filled'
          title='Full'
          handleClick={() =>readfile('full')}
          customstyles='text-xs'
        />
      </div>
    </div>
  )
}

export default FilePicker
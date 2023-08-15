import CustomButton from "./CustomButton"


const AIpicker = ({prompt, setprompt, generatingImg, handleSubmit}) => {
  return (
    <div className="aipicker-container">
      <textarea 
        className="aipicker-textarea"
        placeholder="Ask AI(Dall.E)"
        value={prompt}
        onChange={(e) => setprompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type='outline'
            title='Asking AI'
            customstyles='text-xs'
          />
        ): (
          <>
          <CustomButton 
            type='outline'
            title='Ai Logo'
            handleClick={() => handleSubmit('logo')}
            customstyles='text-xs'
          />
          <CustomButton 
            type='filled'
            title='Ai Full'
            handleClick={() => handleSubmit('full')}
            customstyles='text-xs'
          />
          </>
        )}
      </div>
      <div> </div>
    </div>
  )
}

export default AIpicker
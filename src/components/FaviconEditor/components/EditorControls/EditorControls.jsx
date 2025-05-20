import EditorInput from "./components/EditorInput/EditorInput";

export default function EditorControls({ editorState, onStateUpdate }) {
  const { brightness, saturation, blur, invert, zoom, borderRadius } = editorState;

  return (
      <div className="space-y-5">
        <EditorInput 
          name="Brillo" 
          min='0.5' 
          max='1.5' 
          step='0.01' 
          value={brightness} 
          onChange={(e) => onStateUpdate({ brightness: Number(e.target.value) })} 
        />
      
        <EditorInput 
          name="Saturación" 
          min='0' 
          max='2' 
          step='0.01' 
          value={saturation} 
          onChange={(e) => onStateUpdate({ saturation: Number(e.target.value) })} 
        />

        <EditorInput 
          name="Desenfoque" 
          min='0' 
          max='5' 
          step='0.1' 
          value={blur} 
          onChange={(e) => onStateUpdate({ blur: Number(e.target.value) })} 
        />

        <EditorInput 
          name="Inversión" 
          min='0' 
          max='1' 
          step='0.1' 
          value={invert} 
          onChange={(e) => onStateUpdate({ invert: Number(e.target.value) })} 
        />

        <EditorInput 
          name="Zoom"
          min="0.5"
          max="3"
          step="0.1"
          value={zoom}
          onChange={(e) => onStateUpdate({ zoom: parseFloat(e.target.value) })}
        />

        <EditorInput 
          name="Borde redondeado"
          min="0"
          max={editorState.cropBox.size / 2}
          step="1"
          value={borderRadius}
          onChange={(e) => onStateUpdate({ borderRadius: parseInt(e.target.value) })}
        />
      </div>
  );
}
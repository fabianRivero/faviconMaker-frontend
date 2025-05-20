import { createContext, useContext, useState } from "react";

const EditorImageContext = createContext();

export function EditorImageProvider({ children }) {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <EditorImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </EditorImageContext.Provider>
  );
}

export function useEditorImage() {
  return useContext(EditorImageContext);
}

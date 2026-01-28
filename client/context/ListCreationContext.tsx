import { createContext, useContext, useState } from "react";

type ListCreationContextType = {
  selectedEmoji: string;
  setSelectedEmoji: (emoji: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ListCreationContext = createContext<ListCreationContextType | undefined>(undefined);

export function ListCreationProvider({ children }: { children: React.ReactNode }) {
  const [selectedEmoji, setSelectedEmoji] = useState("🧮");
  const [selectedColor, setSelectedColor] = useState("#2563EB");

  return (
    <ListCreationContext.Provider 
      value=
      {{
        selectedEmoji,
        selectedColor,
        setSelectedEmoji,
        setSelectedColor
      }}
    >
      {children}
    </ListCreationContext.Provider>
  )
}

export function useListCreationContext(){
  const context = useContext(ListCreationContext);

  if(!context){
    throw new Error("useListCreationContext must be used within a ListCreationProvider");
  }

  return context;
}
import React from "react"
import { getStringSet } from "./stringSet";

interface SendbirdLiveContextValues {
  stringSet: ReturnType<typeof getStringSet>;
}

// @ts-ignore
export const SendbirdLiveContext = React.createContext<SendbirdLiveContextValues>({});
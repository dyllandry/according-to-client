import { createContext } from 'react'

// Context is used like a React component to pass values through components
// without explicitly having to pass values down. Think of the meaning like
// this: "You can get a lot of information from the context of a sitaution
// without anyone directly telling you what's going on."
// https://reactjs.org/docs/context.html
export const CmsUrlContext = createContext(process.env.REACT_APP_CMS_URL)

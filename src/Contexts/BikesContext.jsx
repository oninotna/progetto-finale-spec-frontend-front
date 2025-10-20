import { 
    createContext, 
    useContext 
} from "react";

import useBikes from "../CustomHooks/useBikes";


const BikesContext = createContext();

function BikesProvider ({children}) {
    const hook = useBikes();
  

    return <BikesContext value={ hook }>
                {children}
            </BikesContext>
};

function useBikesContext() {
  return useContext(BikesContext);
};

export { BikesProvider, useBikesContext };
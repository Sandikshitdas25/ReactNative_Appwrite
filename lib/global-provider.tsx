import { createContext, ReactNode, useContext } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface GlobalContextType {
    isLoggedin: boolean;
    user?: User | null;
    loading: boolean;
    refetch: () => void
}

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined); 

export const GlobalProvider = ({ children }: {children : ReactNode}) => {
    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({
        fn: getCurrentUser,
    })

    const isLoggedin = !!user
    //!null => true => !true => false
    //!{name} => false => !false => true

    // console.log(JSON.stringify(user, null, 2))

    return ( 
        <GlobalContext.Provider 
            value={{
                isLoggedin,
                user,
                loading,
                refetch
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext)

    if(!context) {
        throw new Error("UseGlobalContext must be used within a GlobalProvider")
    }

    return context
}

export default GlobalProvider
import { useState } from "react"
import LocaleContext from "../context/LocaleContext"
import { Locales } from "../types/LocaleType";

interface LocaleProviderProps {
    children: React.ReactNode;
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
    const [locale, setLocale] = useState<Locales>('en')

    return (
        <LocaleContext.Provider
            value={{locale, setLocale}}
        >
            {children}
        </LocaleContext.Provider>
    )
}

export default LocaleProvider;
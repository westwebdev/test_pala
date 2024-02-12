import { Dispatch, SetStateAction, createContext } from "react";
import { Locales } from "../types/LocaleType";

export interface LocaleContextType {
    locale: Locales;
    setLocale: Dispatch<SetStateAction<Locales>>
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export default LocaleContext;

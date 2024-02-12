import { ChangeEvent, useContext } from "react"
import LocaleContext, { LocaleContextType } from "../../context/LocaleContext"
import { Locales } from "../../types/LocaleType"

const LocaleSelector = () => {
    const {setLocale} = useContext(LocaleContext) as LocaleContextType

    const languageSelectorHandle = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as Locales

        setLocale(value)
    }

    return (
        <select name="lang" onChange={(e) => languageSelectorHandle(e)}>
            <option value="en">EN</option>
            <option value="sk">SK</option>
        </select>
    );
}

export default LocaleSelector;
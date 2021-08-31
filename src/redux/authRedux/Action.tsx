import { DARK_THEME, LIGHT_THEME } from "./ActionType"


export const changeToLightTheme = () => {
    return {
        type: LIGHT_THEME
    }
}

export const changeToDarkTheme = () => {
    return {
        type:DARK_THEME
    }
}
import { createTheme } from '@mui/material/styles';

// project imports
import { ComponentsOverrides } from './overrides';
import themePalette from './palette';
import themeTypography from './typography';
import customShadows from './customShadows';
import shadows from './shadows';
import { themeColors } from './colors'

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    const color = themeColors();

    const themeOption = {
        colors: color,
        customization: {
            fontFamily: "Open Sans"
        }
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        typography: themeTypography(themeOption),
        shape: { borderRadius: 12 },
        shadows: shadows(themeOption),
        customShadows: customShadows(themeOption),
    };

    const themes = createTheme(themeOptions);
    themes.components = ComponentsOverrides(themes);

    return themes;
};

export default theme;

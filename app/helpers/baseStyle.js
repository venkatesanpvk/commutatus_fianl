import { fullWhite, minBlack, lightBlue } from '../../node_modules/material-ui/styles/colors';
import { fontQsregular, mariner, pickerText } from './variables';
import { fade } from '../../node_modules/material-ui/utils/colorManipulator';
import spacing from '../../node_modules/material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: fontQsregular,
  palette: {
    primary1Color: pickerText,
    primary2Color: lightBlue,
    primary3Color: fullWhite,
    accent1Color: minBlack,
    accent2Color: fullWhite,
    accent3Color: fullWhite,
    buttonFilterColor: lightBlue,
    textColor: pickerText,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: fullWhite,
    canvasColor: fullWhite,
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: pickerText,
    clockCircleColor: fade(fullWhite, 0.12),
  },
  dialog: {
    titleFontSize: 22,
    bodyFontSize: 12,
    bodyColor: mariner,
  },
};

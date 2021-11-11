import { Colors, ThemeManager } from 'react-native-ui-lib';

export const loadStyles = () => {
  Colors.loadColors({
    mainColor: '#aa00ff',
  });

  ThemeManager.setComponentTheme('Button', {
    backgroundColor: Colors.mainColor,
    outlineColor: Colors.mainColor,
  });

  ThemeManager.setComponentTheme('Text', props => {
    const baseStyle = {
      fontSize: 16,
      color: 'grey',
    };

    if (props.h1) {
      return { style: { ...baseStyle, fontSize: 38 } };
    }
    if (props.h2) {
      return { style: { ...baseStyle, fontSize: 28 } };
    }
    if (props.h3) {
      return { style: { ...baseStyle, fontSize: 21 } };
    }
    return {
      style: baseStyle,
    };
  });

  ThemeManager.setComponentTheme('View', {
    backgroundColor: 'white',
  });
};

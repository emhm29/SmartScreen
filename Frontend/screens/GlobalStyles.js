
export const Color = {
  primary: '#6200ee',
  secondary: '#03dac6',
  background: '#ffffff',
  text: '#333333',
  header: '#000000',
  buttonText: '#ffffff',
};

export const FontSize = {
  small: 12,
  medium: 16,
  large: 24,
};

export const FontFamily = {
  regular: 'System',
  bold: 'System',
};

export const Border = {
  radius: 5,
  width: 1,
};

export const GlobalStyles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Color.background,
  },
  text: {
    fontSize: FontSize.medium,
    color: Color.text,
    fontFamily: FontFamily.regular,
  },
  header: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    color: Color.header,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Color.primary,
    padding: 10,
    borderRadius: Border.radius,
    alignItems: 'center',
  },
  buttonText: {
    color: Color.buttonText,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.bold,
  },
};

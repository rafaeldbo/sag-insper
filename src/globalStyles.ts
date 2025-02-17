import CSS from 'csstype';

const GlobalStyles: { [key: string]: CSS.Properties } = {
    global: {
        fontFamily: 'Arial, sans-serif',
    }
};
export default GlobalStyles;

export const colors: { [key: string]: string } = {
    darkRed: '#C00000',
    red: '#FF0000',
    black: '#000000',
    white: '#FFFFFF',
    darkGray: '#595959',
    gray: '#BFBFBF',
    lightGray: '#404040',
    vibrantOrange: '#FFC000',
    lightVibrantOrange: '#FFDD71',
    
    lightOrange: '#FABF8F',
    lightRed: '#E6B8B7',
    lightGreen: '#C4D79B',
    purple: '#B1A0C7',
    lightBlue: '#8DB4E2',
}

export const LineHeight:number = 1
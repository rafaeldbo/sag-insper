import CSS from 'csstype';
import { colors } from '../../globalStyles';

const styles: { [key: string]: CSS.Properties } = {

    container: {
        backgroundColor: colors.white,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

        padding: '0.5rem',
        margin: '0.5rem',

        border: `2  px solid ${colors.black}`,
        borderRadius: '0.5rem',
        boxShadow: `0 0 0.25rem ${colors.lightGray}`,
    },
    ExcelInputTitle : {
        fontWeight: 'bold',
        margin: '0.25rem',
        color: colors.darkRed,
    },
    sendButton: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',     
        backgroundColor: colors.darkRed,

        margin: '0.25rem',
        padding: '0.25rem',
        width: '90%',

        border: `2px solid ${colors.black}`,
        borderRadius: '0.5rem',
        boxShadow: `0 0 0.25rem ${colors.lightGray}`,
    },
};

export default styles;
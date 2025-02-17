import CSS from 'csstype';
import { colors, LineHeight } from '../../globalStyles';

const styles: { [key: string]: CSS.Properties } = {
    slotsColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: `${(24-11.5)*4*LineHeight}rem`,
        position: 'relative',
    },
    container: {
        backgroundColor: colors.white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        border: `1px solid ${colors.black}`,
    },
    floatingSlot: {
        zIndex: 10,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '7pt',
    },
    timeRangeColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '2.5rem',
        margin: '0.25rem',
    },
    timetableColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '12rem',
        margin: '0.25rem',
    },
    margin: {
        margin: '0.2rem',
        padding: 'auto 0',      
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    titleRowBlock: {
        backgroundColor: colors.darkRed,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
        lineHeight: '1.5rem',
        width: '12rem',
        height: '1.5rem',
        marginBottom: '0.25rem',
    },
};

export default styles;
import CSS from 'csstype';
import { colors } from '../globalStyles';

const styles: { [key: string]: CSS.Properties } = {
    container: {
        backgroundColor: colors.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
    },
};

export default styles;
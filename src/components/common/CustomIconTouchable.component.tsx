import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from './CustomText.component';

interface CustomTouchableIcon {
    onPress: () => void;
    style?: object;
    iconName: string;
    size: number;
    color?: string;
    text?: string; 
    textStyle?: object;

}

const CustomTouchableIcon: React.FC<CustomTouchableIcon> = ({ onPress, style, iconName, size, color, text, textStyle }) => {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={iconName} size={size} color={color} style={[styles.icon, style]} />
            {text && <CustomText style={[styles.text, textStyle]}>{text}</CustomText>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',  
    },
    icon: {
        marginRight: 8, 
    },
    text: {
        fontSize: 16, 
    },
});


export default CustomTouchableIcon;
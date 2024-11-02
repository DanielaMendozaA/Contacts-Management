import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CustomTouchableIcon {
    onPress: () => void;
    style?: object;
    iconName: string;
    size: number;
    color?: string;

}

const CustomTouchableIcon: React.FC<CustomTouchableIcon> = ({ onPress, style, iconName, size, color }) => {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={iconName} size={size} color={color} style={[styles.icon, style]} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {

    },
    icon: {
        marginRight: 8,
    },
})

export default CustomTouchableIcon;
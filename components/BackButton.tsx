import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";


const BackButton = () => {
    return (
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={22} />
        </TouchableOpacity>
    )
}

export default BackButton;
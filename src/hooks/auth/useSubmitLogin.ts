import { useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { ILoginUser } from "../../interfaces/users/user.interface";
import { AuthService } from "../../services/auth/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveToken } from "../../redux/features/userThunks";
import { useAuth } from "../../context/AuthContext";

const useSubmitLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const { signIn } = useAuth();

    const submitLogin = async (data: ILoginUser, onSuccess: () => void) => {
        setLoading(true);

        try {
            const loginUser = await AuthService.login(data);
            dispatch(saveToken(loginUser.data.token));
            await AsyncStorage.setItem('user', JSON.stringify(loginUser.data.user))
            console.log("token guardado en submitlogin!!!!", );
            
            signIn(loginUser.data.token);
            onSuccess(); 
        } catch (err: any) {
            setError(err.message || JSON.stringify(err) || 'Error al agregar contacto');
            setError(err.message || 'Error al agregar contacto');
        } finally {
            setLoading(false);
        }
    };

    return{ submitLogin, loading, error }

};

export default useSubmitLogin;
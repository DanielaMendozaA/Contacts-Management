import { useState } from "react";
import { IRegisterUser } from "../../interfaces/users/user.interface";
import { AuthService } from "../../services/auth/auth.service";

const useSubmitRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitRegister = async (data: IRegisterUser, onSuccess: () => void) => {
        setLoading(true)

        try {
            const registerUser = await AuthService.register(data);
            onSuccess();
            return registerUser;
        } catch (err: any) {
            setError(err.message || JSON.stringify(err) || 'Error al agregar contacto');
            setError(err.message || 'Error al agregar contacto');
        } finally {
            setLoading(false);
        }
    }

    return{submitRegister, loading, error }

}

export default useSubmitRegister;
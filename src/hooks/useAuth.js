import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export function useAuth() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        };
    };

    async function createUser(data) {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );

            await updateProfile(user, {
                displayName: data.displayName,
            });

            setLoading(false);

            return user;

        } catch (err) {
            let systemErrorMessage

            if(err.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if(err.message.includes("email-already")) {
                systemErrorMessage = "Email já cadastrado.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
            };

            setLoading(false);

            setError(systemErrorMessage);
        };
    };

    function logout() {
        checkIfIsCancelled();

        signOut(auth);
    };

    async function login(data) {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);

            setLoading(false);
        } catch (err) {
            let systemErrorMessage

            if (err.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário ou Senha inválido."
            } else if (err.message.includes("wrong-password")) {
                systemErrorMessage = "Usuário ou Senha inválido."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }

            setError(systemErrorMessage);
            setLoading(false);
        };
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
};
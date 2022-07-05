import { useEffect, useReducer, useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import { db } from "../firebase/config";

const initialState = {
    loading: null,
    error: null
};

function insertReducer(state, action) {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "INSERTED_DATA":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    };
}

export function useInsertData(dataCollection) {
    const [response, dispatch] = useReducer(insertReducer, initialState);
    
    const [cancelled, setCancelled] = useState(false);

    function checkCancelBeforeDisptach(action) {
        if(!cancelled) {
            dispatch(action);
        };
    };

    async function insertData(data) {
        checkCancelBeforeDisptach({
            type: "LOADING"
        });

        try {
            const newData = {...data, createdAt: Timestamp.now()};
            const insertedData = await addDoc(
                collection(db, dataCollection),
                newData
            );

            checkCancelBeforeDisptach({
                type: "INSERTED_DATA",
                payload: insertedData
            });
        } catch (err) {
            checkCancelBeforeDisptach({
                type: "ERROR",
                payload: err.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {insertData, response}
};
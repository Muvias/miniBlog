import { useEffect, useReducer, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";

import { db } from "../firebase/config";

const initialState = {
    loading: null,
    error: null
};

function updateReducer(state, action) {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "UPDATED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    };
}

export function useUpdateDocument(dataCollection) {
    const [response, dispatch] = useReducer(updateReducer, initialState);
    
    const [cancelled, setCancelled] = useState(false);

    function checkCancelBeforeDisptach(action) {
        if(!cancelled) {
            dispatch(action);
        };
    };

    async function updateDocument(id, data) {
        checkCancelBeforeDisptach({
            type: "LOADING",
        });

        try {
            const docRef = await doc(db, dataCollection, id);

            const updatedDocument = await updateDoc(docRef, data)

            checkCancelBeforeDisptach({
                type: "UPDATED_DOC",
                payload: updatedDocument
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

    return { updateDocument, response }
};
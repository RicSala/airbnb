'use client'

import { createContext } from "react";
import { useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import { uiReducer } from "./uiReducer";



export const UiContext = createContext()

const UI_INITIAL_STATE = {
    RegisterModalisOpen: false,
    LoginModalisOpen: false,
    RentModalisOpen: false,
};

// Instead of using Zustand, we can use useReducer
export const UiProvider = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const onOpenRegisterModal = () => {
        dispatch({ type: '[UI] - onOpen register modal' });
    };

    const onCloseRegisterModal = () => {
        dispatch({ type: '[UI] - onClose register modal' });
    };

    const onOpenLoginModal = () => {
        dispatch({ type: '[UI] - onOpen Login modal' });
    };

    const onCloseLoginModal = () => {
        dispatch({ type: '[UI] - onClose Login modal' });
    };

    const onOpenRentModal = () => {
        console.log("OPENING RENT MODAL FROM UI CONTEXT")
        dispatch({ type: '[UI] - onOpen Rent modal' });
    };

    const onCloseRentModal = () => {
        dispatch({ type: '[UI] - onClose Rent modal' });
    };

    // We return the state and the methods so we can use them in the components
    return (
        <UiContext.Provider value={{
            ...state,

            // methods

            onOpenRegisterModal,
            onCloseRegisterModal,
            onOpenLoginModal,
            onCloseLoginModal,
            onOpenRentModal,
            onCloseRentModal,
        }}>
            {children}
        </UiContext.Provider>
    );
};

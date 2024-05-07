"use client"

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface Context {}

const GlobalContext = createContext<Context>({
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {

	return (
		<GlobalContext.Provider value={{}}>
			{children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext);
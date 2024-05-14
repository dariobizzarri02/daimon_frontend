"use client"

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

export interface Context {
	authenticated: boolean;
	setAuthenticated: Dispatch<SetStateAction<boolean>>;
	user: string;
	setUser: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<Context>({
	authenticated: false,
	setAuthenticated: () => {},
	user: "",
	setUser: () => {}
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [authenticated, setAuthenticated]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
	const [user, setUser]: [string, Dispatch<SetStateAction<string>>] = useState("");

	return (
		<GlobalContext.Provider value={{
			authenticated,
			setAuthenticated,
			user,
			setUser
		}}>
			{children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext);
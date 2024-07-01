"use client"

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

export interface Context {
	authenticated: boolean  | null;
	setAuthenticated: Dispatch<SetStateAction<boolean | null>>;
	user: string;
	setUser: Dispatch<SetStateAction<string>>;
	displayCreated: boolean | null;
	setDisplayCreated: Dispatch<SetStateAction<boolean | null>>;
}

const GlobalContext = createContext<Context>({
	authenticated: null,
	setAuthenticated: () => {},
	user: "",
	setUser: () => {},
	displayCreated: null,
	setDisplayCreated: () => {}
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [authenticated, setAuthenticated]: [boolean | null, Dispatch<SetStateAction<boolean | null>>] = useState(null as boolean | null);
	const [user, setUser]: [string, Dispatch<SetStateAction<string>>] = useState("");
	const [displayCreated, setDisplayCreated]: [boolean | null, Dispatch<SetStateAction<boolean | null>>] = useState(null as boolean | null);

	return (
		<GlobalContext.Provider value={{
			authenticated,
			setAuthenticated,
			user,
			setUser,
			displayCreated,
			setDisplayCreated
		}}>
			{children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext);
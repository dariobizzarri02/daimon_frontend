'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface Context {
	character: string,
	setCharacter: Dispatch<SetStateAction<string>>,
	author: string,
	setAuthor: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<Context>({
	character: '',
	setCharacter: () => {},
	author: '',
	setAuthor: () => {}
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [character, setCharacter] = useState<string>('000000000000');
	const [author, setAuthor] = useState<string>('000000000000');

	return (
		<GlobalContext.Provider value={{ character, setCharacter, author, setAuthor }}>
			{children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext);
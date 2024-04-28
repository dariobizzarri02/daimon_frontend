'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface Context {
	player: string,
	setPlayer: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<Context>({
	player: '',
	setPlayer: () => {}
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [player, setPlayer] = useState<string>('000000000000');

	return (
		<GlobalContext.Provider value={{ player, setPlayer }}>
			{children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext);
import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [menuOpen, setMenuOpen] = useState(false);
	return <GlobalContext.Provider value={{ menuOpen, setMenuOpen }}>{children}</GlobalContext.Provider>;
}

export function useGlobalState() {
	const globalContext = useContext(GlobalContext);
	if (!globalContext) throw new Error('useGlbalData hook은 GlobalProvider컴포넌트 안에서만 호출가능');
	return globalContext;
}

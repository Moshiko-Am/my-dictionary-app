import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import axios from 'axios';

interface IAppContextProps {
	query: string;
	result: any;
	font: 'roboto' | 'merriweather' | 'ibm';
	theme: 'light' | 'dark';
	setQuery: (query: string) => void;
	setResult: (result: any) => void;
	setFont: (font: 'roboto' | 'merriweather' | 'ibm') => void;
	setTheme: (theme: 'light' | 'dark') => void;
	toggleTheme: () => void;
	isLoading: boolean;
}

const AppContext = createContext<IAppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [result, setResult] = useState<never[] | null>([]);
	const [font, setFont] = useState<'roboto' | 'merriweather' | 'ibm'>('roboto');
	const [theme, setTheme] = useState<'light' | 'dark'>(
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	);

	const toggleTheme = useCallback(() => {
		if (document.documentElement.classList.contains('light')) {
			document.documentElement.classList.remove('light');
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
		}
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const initialTheme = mediaQuery.matches ? 'dark' : 'light';

		document.documentElement.classList.add(initialTheme);

		const handleChange = (e: MediaQueryListEvent) => {
			const newTheme = e.matches ? 'dark' : 'light';

			document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
			document.documentElement.classList.add(newTheme);

			setTheme(newTheme);
		};

		document.body.classList.remove('roboto', 'merriweather', 'ibm');
		document.body.classList.add(font);

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, [theme, font]);

	// Handle the query change:
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				if (query) {
					const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);

					if (!response?.data?.length) {
						setResult([]);
					} else {
						setResult(response.data?.[0]);
					}
				}
			} catch (e) {
				console.error('Error fetching data:', e);
				setResult(null);
			}
			setIsLoading(false);
		})();
	}, [query]);

	return (
		<AppContext.Provider
			value={{
				query,
				setQuery,
				result,
				setResult,
				font,
				setFont,
				theme,
				setTheme,
				toggleTheme,
				isLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = React.useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within a AppProvider');
	}
	return context;
};

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
}

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
	isLoading: boolean;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Check for existing session on mount
	useEffect(() => {
		const savedUser = localStorage.getItem('auth-user');
		if (savedUser) {
			setUser(JSON.parse(savedUser));
		}
		setIsLoading(false);
	}, []);

const login = async (email: string, password: string) => {
	setIsLoading(true);
	console.log("Login function")
	try {
		// Replace this with your actual API call
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			throw new Error('Login failed');
		}

		const data = await response.json();
		const user = data.user;

		setUser(user);
		localStorage.setItem('auth-user', JSON.stringify(user));
		setIsLoading(false);
		return true;
	} catch (error) {
		setIsLoading(false);
		throw error;
	}
};


	const logout = () => {
		setUser(null);
		localStorage.removeItem('auth-user');
	};

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				isLoading,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

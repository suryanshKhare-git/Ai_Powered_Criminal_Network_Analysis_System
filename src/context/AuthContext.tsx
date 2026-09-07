import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

interface Investigator {
  name: string;
  email: string;
  investigatorId: string;
  mobile: string;
  department: string;
  designation: string;
  role?: string;
}

interface AuthContextType {
  investigator: Investigator | null;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  register: (
    investigator: Investigator,
    password: string
  ) => Promise<boolean>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// FastAPI Backend
const API_URL = 'http://127.0.0.1:8000/api/v1';

export const AuthProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {

  // =========================================================
  // RESTORE EXISTING SESSION
  // =========================================================

  const [investigator, setInvestigator] =
    useState<Investigator | null>(() => {
      const saved = localStorage.getItem('investigator');

      if (!saved) {
        return null;
      }

      try {
        return JSON.parse(saved);
      } catch {
        localStorage.removeItem('investigator');
        return null;
      }
    });


  // =========================================================
  // LOGIN
  // =========================================================

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {

    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      console.log('Login response:', data);

      if (!data.success) {
        return false;
      }

      /*
       * Backend should return investigator details.
       * If it doesn't, create a basic investigator object
       * from the login email for prototype purposes.
       */

      const loggedInInvestigator =
        data.investigator || {
          name: 'Investigator',
          email: email,
          investigatorId: 'INV-001',
          mobile: '',
          department: 'Investigation',
          designation: 'Investigation Officer',
        };

      setInvestigator(loggedInInvestigator);

      localStorage.setItem(
        'investigator',
        JSON.stringify(loggedInInvestigator)
      );

      // Save token if backend provides one
      if (data.access_token) {
        localStorage.setItem(
          'access_token',
          data.access_token
        );
      }

      return true;

    } catch (error) {
      console.error('Login error:', error);

      return false;
    }
  };


  // =========================================================
  // REGISTER
  // =========================================================

  const register = async (
    investigatorData: Investigator,
    password: string
  ): Promise<boolean> => {

    try {
      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify({
            name: investigatorData.name,

            email: investigatorData.email,

            investigatorId:
              investigatorData.investigatorId,

            mobile: investigatorData.mobile,

            department:
              investigatorData.department,

            designation:
              investigatorData.designation,

            password: password,
          }),
        }
      );

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      console.log('Register response:', data);

      if (!data.success) {
        return false;
      }

      /*
       * IMPORTANT:
       *
       * Registration does NOT automatically
       * log the investigator in.
       *
       * User will be sent to Login page.
       */

      return true;

    } catch (error) {
      console.error(
        'Registration error:',
        error
      );

      return false;
    }
  };


  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = async (): Promise<void> => {

    try {

      await fetch(
        `${API_URL}/auth/logout`,
        {
          method: 'POST',

          headers: {
            Accept: 'application/json',
          },
        }
      );

    } catch (error) {

      console.error(
        'Logout API error:',
        error
      );
    }

    // Clear React session
    setInvestigator(null);

    // Clear browser session
    localStorage.removeItem(
      'investigator'
    );

    localStorage.removeItem(
      'access_token'
    );
  };


  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <AuthContext.Provider
      value={{
        investigator,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// ===========================================================
// USE AUTH HOOK
// ===========================================================

export const useAuth = () => {

  const context = useContext(
    AuthContext
  );

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
};
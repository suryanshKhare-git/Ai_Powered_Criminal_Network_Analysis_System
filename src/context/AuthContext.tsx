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

// =========================================================
// FASTAPI BACKEND
// =========================================================

const API_URL = 'http://127.0.0.1:8000/api/v1';

// =========================================================
// AUTH PROVIDER
// =========================================================

export const AuthProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {

  // =======================================================
  // RESTORE SESSION
  // =======================================================

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
        localStorage.removeItem('access_token');

        return null;
      }
    });

  // =======================================================
  // LOGIN
  // =======================================================

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

      // Read response safely
      const rawText = await response.text();

      console.log(
        'LOGIN STATUS:',
        response.status
      );

      console.log(
        'LOGIN RESPONSE:',
        rawText
      );

      // -----------------------------------------------------
      // HTTP ERROR
      // -----------------------------------------------------

      if (!response.ok) {

        let message =
          `Login failed. Server returned ${response.status}.`;

        try {
          const errorData = JSON.parse(rawText);

          message =
            errorData.detail ||
            errorData.message ||
            errorData.error ||
            message;

        } catch {
          if (rawText.trim()) {
            message = rawText;
          }
        }

        console.error(
          'Login server error:',
          message
        );

        return false;
      }

      // -----------------------------------------------------
      // PARSE JSON
      // -----------------------------------------------------

      let data: any;

      try {
        data = JSON.parse(rawText);

      } catch {
        console.error(
          'Invalid login response from server.'
        );

        return false;
      }

      console.log(
        'Parsed login response:',
        data
      );

      // -----------------------------------------------------
      // BACKEND SUCCESS CHECK
      // -----------------------------------------------------

      if (!data.success) {

        console.error(
          'Login rejected:',
          data.message ||
          data.detail ||
          data.error ||
          'Unknown error'
        );

        return false;
      }

      // -----------------------------------------------------
      // INVESTIGATOR DATA
      // -----------------------------------------------------

      const loggedInInvestigator =
        data.investigator || {
          name: 'Investigator',

          email: email,

          investigatorId: 'INV-001',

          mobile: '',

          department: 'Investigation',

          designation:
            'Investigation Officer',
        };

      // -----------------------------------------------------
      // SAVE REACT STATE
      // -----------------------------------------------------

      setInvestigator(
        loggedInInvestigator
      );

      // -----------------------------------------------------
      // SAVE SESSION
      // -----------------------------------------------------

      localStorage.setItem(
        'investigator',
        JSON.stringify(
          loggedInInvestigator
        )
      );

      // -----------------------------------------------------
      // SAVE TOKEN
      // -----------------------------------------------------

      if (data.access_token) {

        localStorage.setItem(
          'access_token',
          data.access_token
        );

      }

      console.log(
        'Login successful'
      );

      return true;

    } catch (error) {

      console.error(
        'Login connection error:',
        error
      );

      return false;
    }
  };

  // =======================================================
  // REGISTER
  // =======================================================

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

            name:
              investigatorData.name,

            email:
              investigatorData.email,

            investigatorId:
              investigatorData.investigatorId,

            mobile:
              investigatorData.mobile,

            department:
              investigatorData.department,

            designation:
              investigatorData.designation,

            password:
              password,
          }),
        }
      );

      // -----------------------------------------------------
      // READ RAW RESPONSE
      // -----------------------------------------------------

      const rawText =
        await response.text();

      console.log(
        'REGISTER STATUS:',
        response.status
      );

      console.log(
        'REGISTER RESPONSE:',
        rawText
      );

      // -----------------------------------------------------
      // HTTP ERROR
      // -----------------------------------------------------

      if (!response.ok) {

        let message =
          `Registration failed. Server returned ${response.status}.`;

        try {

          const errorData =
            JSON.parse(rawText);

          message =
            errorData.detail ||
            errorData.message ||
            errorData.error ||
            message;

        } catch {

          if (rawText.trim()) {
            message = rawText;
          }

        }

        console.error(
          'Registration server error:',
          message
        );

        throw new Error(message);
      }

      // -----------------------------------------------------
      // PARSE JSON
      // -----------------------------------------------------

      let data: any;

      try {

        data =
          JSON.parse(rawText);

      } catch {

        throw new Error(
          'Invalid response received from authentication server.'
        );

      }

      console.log(
        'Parsed register response:',
        data
      );

      // -----------------------------------------------------
      // SUCCESS CHECK
      // -----------------------------------------------------

      if (!data.success) {

        throw new Error(
          data.message ||
          data.detail ||
          data.error ||
          'Registration was rejected by the server.'
        );

      }

      console.log(
        'Registration successful'
      );

      /*
       * Registration does NOT automatically
       * log the user in.
       *
       * Register.tsx already sends
       * the user back to Login.
       */

      return true;

    } catch (error) {

      console.error(
        'Registration error:',
        error
      );

      throw error;
    }
  };

  // =======================================================
  // LOGOUT
  // =======================================================

  const logout = async (): Promise<void> => {

    try {

      const token =
        localStorage.getItem(
          'access_token'
        );

      await fetch(
        `${API_URL}/auth/logout`,
        {
          method: 'POST',

          headers: {
            Accept: 'application/json',

            ...(token
              ? {
                  Authorization:
                    `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

    } catch (error) {

      console.error(
        'Logout API error:',
        error
      );

    } finally {

      // ---------------------------------------------------
      // CLEAR REACT SESSION
      // ---------------------------------------------------

      setInvestigator(null);

      // ---------------------------------------------------
      // CLEAR LOCAL SESSION
      // ---------------------------------------------------

      localStorage.removeItem(
        'investigator'
      );

      localStorage.removeItem(
        'access_token'
      );

      console.log(
        'Investigator logged out'
      );
    }
  };

  // =======================================================
  // PROVIDER
  // =======================================================

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

// =========================================================
// USE AUTH
// =========================================================

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      'useAuth must be used inside AuthProvider'
    );

  }

  return context;
};
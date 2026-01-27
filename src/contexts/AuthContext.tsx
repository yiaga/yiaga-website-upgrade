import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'user' | 'technical' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  addAuditLog: (action: string, details: string) => void;
  getAuditLogs: () => AuditLogEntry[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@yiaga.org',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'technical@yiaga.org',
    password: 'tech123',
    name: 'Technical User',
    role: 'technical',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'user@yiaga.org',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
];

const ROLE_HIERARCHY: Record<UserRole, number> = {
  user: 1,
  technical: 2,
  admin: 3,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('yiaga_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('yiaga_user');
      }
    }
    setIsLoading(false);
  }, []);

  const addAuditLog = (action: string, details: string) => {
    if (!user) return;
    
    const logs = JSON.parse(localStorage.getItem('yiaga_audit_logs') || '[]');
    const newLog: AuditLogEntry = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action,
      details,
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.1', // Demo IP
    };
    logs.unshift(newLog);
    localStorage.setItem('yiaga_audit_logs', JSON.stringify(logs.slice(0, 1000))); // Keep last 1000 logs
  };

  const getAuditLogs = (): AuditLogEntry[] => {
    return JSON.parse(localStorage.getItem('yiaga_audit_logs') || '[]');
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check stored users first
    const storedUsers = JSON.parse(localStorage.getItem('yiaga_users') || '[]');
    const allUsers = [...DEMO_USERS, ...storedUsers];
    
    const foundUser = allUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('yiaga_user', JSON.stringify(userWithoutPassword));
      
      // Add audit log
      const logs = JSON.parse(localStorage.getItem('yiaga_audit_logs') || '[]');
      logs.unshift({
        id: Date.now().toString(),
        userId: foundUser.id,
        userName: foundUser.name,
        userRole: foundUser.role,
        action: 'LOGIN',
        details: 'User logged in successfully',
        timestamp: new Date().toISOString(),
        ipAddress: '192.168.1.1',
      });
      localStorage.setItem('yiaga_audit_logs', JSON.stringify(logs));
      
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const storedUsers = JSON.parse(localStorage.getItem('yiaga_users') || '[]');
    const allUsers = [...DEMO_USERS, ...storedUsers];
    
    if (allUsers.some(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role: 'user' as UserRole,
      createdAt: new Date().toISOString(),
    };

    storedUsers.push(newUser);
    localStorage.setItem('yiaga_users', JSON.stringify(storedUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('yiaga_user', JSON.stringify(userWithoutPassword));

    return { success: true };
  };

  const logout = () => {
    if (user) {
      addAuditLog('LOGOUT', 'User logged out');
    }
    setUser(null);
    localStorage.removeItem('yiaga_user');
  };

  const hasPermission = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    const userLevel = ROLE_HIERARCHY[user.role];
    
    return roles.some(role => userLevel >= ROLE_HIERARCHY[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        hasPermission,
        addAuditLog,
        getAuditLogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

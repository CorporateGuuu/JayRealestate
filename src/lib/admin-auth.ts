import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from './database';

const JWT_SECRET = process.env.JWT_SECRET || 'jay-real-estate-admin-secret-key';
const JWT_EXPIRES_IN = '7d';

// Admin user interface
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'agent';
  created_at: string;
}

// JWT payload interface
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// Admin authentication class
export class AdminAuth {
  
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token
  static generateToken(user: AdminUser): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  // Verify JWT token
  static verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  // Create admin user
  static async createAdminUser(email: string, password: string, name: string, role: 'admin' | 'manager' | 'agent' = 'admin'): Promise<AdminUser> {
    if (!supabase) {
      throw new Error('Database not available - missing environment variables');
    }

    try {
      const hashedPassword = await this.hashPassword(password);

      const { data, error } = await supabase
        .from('admin_users')
        .insert([{
          email: email.toLowerCase(),
          password_hash: hashedPassword,
          name,
          role
        }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('Admin user with this email already exists');
        }
        throw new Error('Failed to create admin user');
      }

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        created_at: data.created_at
      };
    } catch (error) {
      console.error('Error creating admin user:', error);
      throw error;
    }
  }

  // Authenticate admin user
  static async authenticateAdmin(email: string, password: string): Promise<{ user: AdminUser; token: string } | null> {
    if (!supabase) {
      console.warn('Database not available - missing environment variables');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

      if (error || !data) {
        return null;
      }

      const isValidPassword = await this.verifyPassword(password, data.password_hash);
      if (!isValidPassword) {
        return null;
      }

      const user: AdminUser = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        created_at: data.created_at
      };

      const token = this.generateToken(user);

      return { user, token };
    } catch (error) {
      console.error('Error authenticating admin:', error);
      return null;
    }
  }

  // Get admin user by ID
  static async getAdminById(userId: string): Promise<AdminUser | null> {
    if (!supabase) {
      console.warn('Database not available - missing environment variables');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, name, role, created_at')
        .eq('id', userId)
        .single();

      if (error || !data) {
        return null;
      }

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        created_at: data.created_at
      };
    } catch (error) {
      console.error('Error fetching admin user:', error);
      return null;
    }
  }

  // Update admin user
  static async updateAdminUser(userId: string, updates: Partial<Pick<AdminUser, 'name' | 'email' | 'role'>>): Promise<AdminUser | null> {
    if (!supabase) {
      console.warn('Database not available - missing environment variables');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .update({
          ...updates,
          email: updates.email?.toLowerCase()
        })
        .eq('id', userId)
        .select('id, email, name, role, created_at')
        .single();

      if (error) {
        throw new Error('Failed to update admin user');
      }

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        created_at: data.created_at
      };
    } catch (error) {
      console.error('Error updating admin user:', error);
      throw error;
    }
  }

  // Change password
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    if (!supabase) {
      throw new Error('Database not available - missing environment variables');
    }

    try {
      // First verify current password
      const { data, error } = await supabase
        .from('admin_users')
        .select('password_hash')
        .eq('id', userId)
        .single();

      if (error || !data) {
        throw new Error('Admin user not found');
      }

      const isValidPassword = await this.verifyPassword(currentPassword, data.password_hash);
      if (!isValidPassword) {
        throw new Error('Current password is incorrect');
      }

      // Hash new password and update
      const hashedNewPassword = await this.hashPassword(newPassword);
      
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password_hash: hashedNewPassword })
        .eq('id', userId);

      if (updateError) {
        throw new Error('Failed to update password');
      }

      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }

  // List all admin users
  static async listAdminUsers(): Promise<AdminUser[]> {
    if (!supabase) {
      console.warn('Database not available - missing environment variables');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, name, role, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Failed to fetch admin users');
      }

      return data.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        created_at: user.created_at
      }));
    } catch (error) {
      console.error('Error listing admin users:', error);
      throw error;
    }
  }

  // Delete admin user
  static async deleteAdminUser(userId: string): Promise<boolean> {
    if (!supabase) {
      throw new Error('Database not available - missing environment variables');
    }

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', userId);

      if (error) {
        throw new Error('Failed to delete admin user');
      }

      return true;
    } catch (error) {
      console.error('Error deleting admin user:', error);
      throw error;
    }
  }
}

// Client-side auth utilities
export const clientAuth = {
  // Store token in cookie
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      document.cookie = `admin_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
    }
  },

  // Get token from cookie
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('admin_token='));
    
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  },

  // Remove token
  removeToken: () => {
    if (typeof window !== 'undefined') {
      document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = clientAuth.getToken();
    if (!token) return false;

    try {
      const payload = AdminAuth.verifyToken(token);
      return payload !== null && payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
};

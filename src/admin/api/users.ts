import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  avatar_url?: string;
  phone?: string;
  created_at: string;
  last_login?: string;
}

export const usersService = {
  list: async (): Promise<User[]> => {
    // Fetch all users with their profiles and roles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) throw profilesError;
    if (!profiles) return [];

    // Fetch roles for all users
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('user_id, role');

    if (rolesError) throw rolesError;

    // Combine profiles with roles
    return profiles.map((profile) => {
      const userRole = roles?.find((r) => r.user_id === profile.id);
      return {
        id: profile.id,
        email: profile.email || '',
        full_name: profile.full_name || '',
        role: (userRole?.role as 'admin' | 'editor' | 'viewer') || 'viewer',
        status: (profile.status as 'active' | 'inactive') || 'active',
        avatar_url: profile.avatar_url || undefined,
        phone: profile.phone || undefined,
        created_at: profile.created_at || '',
        last_login: profile.last_login || undefined,
      };
    });
  },

  get: async (id: string): Promise<User | undefined> => {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (profileError || !profile) return undefined;

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', id)
      .single();

    return {
      id: profile.id,
      email: profile.email || '',
      full_name: profile.full_name || '',
      role: (roleData?.role as 'admin' | 'editor' | 'viewer') || 'viewer',
      status: (profile.status as 'active' | 'inactive') || 'active',
      avatar_url: profile.avatar_url || undefined,
      phone: profile.phone || undefined,
      created_at: profile.created_at || '',
      last_login: profile.last_login || undefined,
    };
  },

  create: async (email: string, password: string, full_name: string, role: 'admin' | 'editor' | 'viewer'): Promise<User> => {
    // Create auth user (requires admin access)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');

    // Profile is auto-created by trigger, just assign role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({ user_id: authData.user.id, role });

    if (roleError) throw roleError;

    // Log audit trail
    await supabase.from('audit_logs').insert({
      user_id: (await supabase.auth.getUser()).data.user?.id,
      action: 'create',
      table_name: 'users',
      record_id: authData.user.id,
      new_values: { email, full_name, role }
    });

    return {
      id: authData.user.id,
      email,
      full_name,
      role,
      status: 'active',
      created_at: authData.user.created_at,
    };
  },

  update: async (id: string, data: Partial<User>): Promise<User | undefined> => {
    const updates: any = {};
    if (data.full_name !== undefined) updates.full_name = data.full_name;
    if (data.phone !== undefined) updates.phone = data.phone;
    if (data.status !== undefined) updates.status = data.status;
    if (data.avatar_url !== undefined) updates.avatar_url = data.avatar_url;

    const { error: profileError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id);

    if (profileError) throw profileError;

    // Update role if provided
    if (data.role) {
      const { error: roleError } = await supabase
        .from('user_roles')
        .update({ role: data.role })
        .eq('user_id', id);

      if (roleError) throw roleError;

      // Log role change
      await supabase.from('audit_logs').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        action: 'update',
        table_name: 'user_roles',
        record_id: id,
        new_values: { role: data.role }
      });
    }

    return await usersService.get(id);
  },

  remove: async (id: string): Promise<void> => {
    // Delete auth user (cascades to profiles and user_roles)
    const { error } = await supabase.auth.admin.deleteUser(id);
    
    if (error) throw error;

    // Log deletion
    await supabase.from('audit_logs').insert({
      user_id: (await supabase.auth.getUser()).data.user?.id,
      action: 'delete',
      table_name: 'users',
      record_id: id
    });
  },
};
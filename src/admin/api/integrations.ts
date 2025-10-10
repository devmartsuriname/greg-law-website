import { supabase } from '@/integrations/supabase/client';

export interface YouTubeConfig {
  apiKey: string;
  channelId: string;
  syncInterval: 'manual' | 'daily' | 'weekly';
}

export interface GoogleCalendarConfig {
  apiKey: string;
  calendarId: string;
}

export type IntegrationConfigData = YouTubeConfig | GoogleCalendarConfig;

export interface IntegrationConfig {
  id?: string;
  integrationType: 'youtube' | 'google_calendar';
  config: IntegrationConfigData;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const integrationsService = {
  /**
   * Get YouTube configuration
   */
  getYouTubeConfig: async (): Promise<IntegrationConfig | null> => {
    const { data, error } = await supabase
      .from('integrations_config')
      .select('*')
      .eq('integration_type', 'youtube')
      .maybeSingle();

    if (error) {
      console.error('Error fetching YouTube config:', error);
      throw error;
    }

    if (!data) return null;

    return {
      id: data.id,
      integrationType: 'youtube',
      config: data.config as YouTubeConfig,
      enabled: data.enabled,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  /**
   * Get Google Calendar configuration
   */
  getCalendarConfig: async (): Promise<IntegrationConfig | null> => {
    const { data, error } = await supabase
      .from('integrations_config')
      .select('*')
      .eq('integration_type', 'google_calendar')
      .maybeSingle();

    if (error) {
      console.error('Error fetching Calendar config:', error);
      throw error;
    }

    if (!data) return null;

    return {
      id: data.id,
      integrationType: 'google_calendar',
      config: data.config as GoogleCalendarConfig,
      enabled: data.enabled,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  /**
   * Update YouTube configuration
   */
  updateYouTubeConfig: async (config: YouTubeConfig, enabled: boolean = false): Promise<IntegrationConfig> => {
    const { data: user } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('integrations_config')
      .upsert({
        integration_type: 'youtube',
        config: config,
        enabled: enabled,
        created_by: user?.user?.id,
      }, {
        onConflict: 'integration_type'
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating YouTube config:', error);
      throw error;
    }

    return {
      id: data.id,
      integrationType: 'youtube',
      config: data.config as YouTubeConfig,
      enabled: data.enabled,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  /**
   * Update Google Calendar configuration
   */
  updateCalendarConfig: async (config: GoogleCalendarConfig, enabled: boolean = false): Promise<IntegrationConfig> => {
    const { data: user } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('integrations_config')
      .upsert({
        integration_type: 'google_calendar',
        config: config,
        enabled: enabled,
        created_by: user?.user?.id,
      }, {
        onConflict: 'integration_type'
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating Calendar config:', error);
      throw error;
    }

    return {
      id: data.id,
      integrationType: 'google_calendar',
      config: data.config as GoogleCalendarConfig,
      enabled: data.enabled,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  /**
   * Test connection (placeholder for future implementation)
   */
  testConnection: async (type: 'youtube' | 'google_calendar'): Promise<{ success: boolean; message: string }> => {
    // This is a placeholder - actual testing would require calling the respective APIs
    console.log(`Test connection for ${type} - not yet implemented`);
    return {
      success: false,
      message: 'Connection testing is not yet implemented. Please configure API keys and save.',
    };
  },
};

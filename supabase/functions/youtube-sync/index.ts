import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: { url: string };
    };
    publishedAt: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    const channelId = Deno.env.get('YOUTUBE_CHANNEL_ID');

    if (!youtubeApiKey || !channelId) {
      return new Response(
        JSON.stringify({ error: 'YouTube API key or Channel ID not configured' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch videos from YouTube API
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=50&type=video`;
    
    const response = await fetch(youtubeUrl);
    const data = await response.json();

    if (!data.items) {
      throw new Error('No videos found');
    }

    const videos: YouTubeVideo[] = data.items;
    let synced = 0;
    let errors = 0;

    // Sync each video to media table
    for (const video of videos) {
      try {
        const { error } = await supabase
          .from('media')
          .upsert(
            {
              youtube_id: video.id.videoId,
              youtube_title: video.snippet.title,
              youtube_description: video.snippet.description,
              youtube_thumbnail: video.snippet.thumbnails.high.url,
              youtube_published_at: video.snippet.publishedAt,
              title: video.snippet.title,
              type: 'youtube',
              published: true,
              featured: false,
            },
            { onConflict: 'youtube_id', ignoreDuplicates: false }
          );

        if (error) {
          console.error(`Error syncing video ${video.id.videoId}:`, error);
          errors++;
        } else {
          synced++;
        }
      } catch (err) {
        console.error(`Failed to process video ${video.id.videoId}:`, err);
        errors++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        synced,
        errors,
        total: videos.length,
        message: `Successfully synced ${synced} videos (${errors} errors)`,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('YouTube sync error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

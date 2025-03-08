
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

interface WebhookPayload {
  type: string
  table: string
  record: any
  schema: string
  old_record: any | null
}

serve(async (req) => {
  try {
    // Get the Mapbox token from environment variables
    const mapboxToken = Deno.env.get('MAPBOX_PUBLIC_TOKEN')
    
    if (!mapboxToken) {
      return new Response(
        JSON.stringify({ error: 'Mapbox token not configured' }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    // Return the token
    return new Response(
      JSON.stringify({ token: mapboxToken }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

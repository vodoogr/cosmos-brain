import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envFile = fs.readFileSync('.env.local', 'utf8')
const envUrl = envFile.match(/NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.*)/)?.[1]?.trim()
const envKey = envFile.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*(.*)/)?.[1]?.trim()

const supabase = createClient(envUrl, envKey)

async function checkQueries() {
  console.log('Testing preset query...')
  const { data: q1, error: e1 } = await supabase.from('simulation_presets')
      .select('id, name, preset_type, brain_band_config, visual_config, correlation_config, simulation_config, camera_config, is_system, is_public')
      .or('is_system.eq.true,is_public.eq.true')
      .order('name', { ascending: true })
  
  if (e1) console.error('Preset Service Query Error:', e1.message)
  else console.log('Preset query works! Total:', q1?.length)

  console.log('Testing universe relationships query...')
  const { data: q2, error: e2 } = await supabase.from('astronomy_relationships')
      .select('id, source_object_id, target_object_id, relationship_type, weight, metadata')
  if (e2) console.error('Universe Rel Query Error:', e2.message)
  else console.log('Universe rel query works! Total:', q2?.length)

  console.log('Testing brain relationships query...')
  const { data: q3, error: e3 } = await supabase.from('brain_region_relationships')
      .select('id, source_region_id, target_region_id, relationship_type, weight, metadata')
  if (e3) console.error('Brain Rel Query Error:', e3.message)
  else console.log('Brain rel query works! Total:', q3?.length)
}
checkQueries()

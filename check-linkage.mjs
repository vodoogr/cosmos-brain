import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envFile = fs.readFileSync('.env.local', 'utf8')
const envUrl = envFile.match(/NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.*)/)?.[1]?.trim()
const envKey = envFile.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*(.*)/)?.[1]?.trim()

const supabase = createClient(envUrl, envKey)

async function checkLinkages() {
  const { data: releases } = await supabase.from('dataset_releases').select('*').eq('is_active', true)
  const universeRelease = releases?.find(r => r.kind === 'universe_catalog')?.id
  const brainRelease = releases?.find(r => r.kind === 'brain_atlas')?.id

  console.log('Universe Release ID:', universeRelease)
  console.log('Brain Release ID:', brainRelease)

  if (universeRelease) {
    const { data: objs } = await supabase.from('astronomy_objects').select('id, x, y, z').eq('dataset_release_id', universeRelease)
    console.log(`Universe Objects found linked to active release: ${objs?.length}`)
    if (objs?.length) console.log('Sample coords (scaled 0.0025):', objs[0].x * 0.0025, objs[0].y * 0.0025)
  }

  if (brainRelease) {
    const { data: regs } = await supabase.from('brain_regions').select('id, x, y, z').eq('dataset_release_id', brainRelease)
    console.log(`Brain Regions found linked to active release: ${regs?.length}`)
    if (regs?.length) console.log('Sample coords (scaled 0.015):', regs[0].x * 0.015, regs[0].y * 0.015)
  }
}
checkLinkages()

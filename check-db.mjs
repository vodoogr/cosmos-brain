import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envFile = fs.readFileSync('.env.local', 'utf8')
const envUrl = envFile.match(/NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.*)/)?.[1]?.trim()
const envKey = envFile.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*(.*)/)?.[1]?.trim()

const supabaseUrl = envUrl
const supabaseAnonKey = envKey

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkData() {
  console.log('Fetching dataset_releases...')
  const { data: releases, error: relError } = await supabase
    .from('dataset_releases')
    .select('*')

  if (relError) {
    console.log('Error fetching releases:', relError.message)
  } else {
    console.log(`Found ${releases?.length || 0} releases:`)
    console.log(releases)
  }

  console.log('\nFetching a few astronomy_objects...')
  const { data: objects, error: objError } = await supabase
    .from('astronomy_objects')
    .select('id, name, object_type')
    .limit(3)

  console.log(`Found ${objects?.length || 0} astronomy objects (Max 3).`)

  console.log('\nFetching brain_regions...')
  const { data: regions, error: regError } = await supabase
    .from('brain_regions')
    .select('id, name')
    .limit(3)

  console.log(`Found ${regions?.length || 0} brain regions (Max 3).`)
}

checkData()

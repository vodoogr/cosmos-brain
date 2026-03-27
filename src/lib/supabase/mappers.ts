export const mapSnakeToCamel = <T extends Record<string, any>>(obj: T): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(mapSnakeToCamel)
  }

  return Object.keys(obj).reduce((result, key) => {
    const camelKey = key.replace(/([-_][a-z])/g, group =>
      group.toUpperCase().replace('-', '').replace('_', '')
    )
    result[camelKey] = mapSnakeToCamel(obj[key])
    return result
  }, {} as any)
}

export const mapCamelToSnake = <T extends Record<string, any>>(obj: T): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(mapCamelToSnake)
  }

  return Object.keys(obj).reduce((result, key) => {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    result[snakeKey] = mapCamelToSnake(obj[key])
    return result
  }, {} as any)
}

// Domain Specific Mappers
export const mapSetiCandidate = (row: any) => mapSnakeToCamel(row)
export const mapSetiTarget = (row: any) => mapSnakeToCamel(row)
export const mapSetiObservation = (row: any) => mapSnakeToCamel(row)
export const mapSetiInstrument = (row: any) => mapSnakeToCamel(row)
export const mapSetiMlRun = (row: any) => mapSnakeToCamel(row)

export const mapSmallBody = (row: any) => mapSnakeToCamel(row)
export const mapSmallBodyEphemerisAsset = (row: any) => mapSnakeToCamel(row)

export const mapMeteorEvent = (row: any) => mapSnakeToCamel(row)
export const mapMeteorEventAsset = (row: any) => mapSnakeToCamel(row)

// Export unified wrapper
export const mappers = {
  mapSnakeToCamel,
  mapCamelToSnake,
  mapSetiCandidate,
  mapSetiTarget,
  mapSetiObservation,
  mapSetiInstrument,
  mapSetiMlRun,
  mapSmallBody,
  mapSmallBodyEphemerisAsset,
  mapMeteorEvent,
  mapMeteorEventAsset
}

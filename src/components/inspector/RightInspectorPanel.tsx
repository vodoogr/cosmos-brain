'use client'

import { useSelectionStore } from '@/stores/selectionStore'
import { X, Network, Database } from 'lucide-react'
import { BrainRegion, UniverseObject } from '@/types/domain'

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'number') return Number.isFinite(value) ? value.toString() : '—'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'string') return value
  return JSON.stringify(value)
}

export const RightInspectorPanel = () => {
  const { selectedPayload, clearSelection, selectedDomain } = useSelectionStore()

  if (!selectedPayload || !selectedDomain) return null

  const isUniverse = selectedDomain === 'universe'
  const selectedData = selectedPayload as UniverseObject | BrainRegion
  const title = selectedData.name

  return (
    <div className="absolute right-0 top-14 bottom-16 w-[350px] bg-black/80 backdrop-blur-md border-l border-white/10 z-40 overflow-y-auto text-white font-sans flex flex-col shadow-2xl">
      <div className="border-b border-white/10 p-5 flex justify-between items-start bg-gradient-to-br from-white/5 to-transparent">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-1 block">
            {isUniverse ? 'Astronomical Object' : 'Brain Region'}
          </span>
          <h2 className="text-lg font-light tracking-wide text-white">{title}</h2>
        </div>
        <button
          onClick={clearSelection}
          className="p-1 hover:bg-white/10 rounded-full transition text-slate-400 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-5 space-y-6 flex-1">
        <div className="space-y-2 border border-white/5 bg-white/[0.02] p-3 rounded-lg">
          <div className="flex items-center text-xs text-slate-400 mb-1 space-x-1">
            <Network size={12} />
            <span className="uppercase tracking-widest font-semibold">
              Coordinates
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
            <div className="bg-white/5 rounded py-1">
              <span className="text-slate-500 mr-1">X</span>
              {typeof selectedData.x === 'number' ? selectedData.x.toFixed(2) : '0.00'}
            </div>
            <div className="bg-white/5 rounded py-1">
              <span className="text-slate-500 mr-1">Y</span>
              {typeof selectedData.y === 'number' ? selectedData.y.toFixed(2) : '0.00'}
            </div>
            <div className="bg-white/5 rounded py-1">
              <span className="text-slate-500 mr-1">Z</span>
              {typeof selectedData.z === 'number' ? selectedData.z.toFixed(2) : '0.00'}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-xs text-slate-400 mb-1 space-x-1">
            <Database size={12} />
            <span className="uppercase tracking-widest font-semibold">
              Properties
            </span>
          </div>

          <div className="space-y-1">
            {Object.entries(selectedData.metadata || {}).length > 0 ? (
              Object.entries(selectedData.metadata || {}).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between gap-4 text-xs py-1.5 border-b border-white/5 last:border-0"
                >
                  <span className="text-slate-400 capitalize">
                    {key.replaceAll('_', ' ')}
                  </span>
                  <span className="text-slate-200 font-medium text-right break-all">
                    {formatValue(value)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-500">No metadata available</div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <button className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition py-2 rounded text-xs font-semibold tracking-wide">
            Find Correlated {isUniverse ? 'Regions' : 'Clusters'}
          </button>
        </div>
      </div>
    </div>
  )
}

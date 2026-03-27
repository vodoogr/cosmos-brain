'use client'

import { useSelectionStore } from '@/stores/selectionStore'
import { UniverseObject, BrainRegion, SetiTarget, SetiCandidate, SmallBody, MeteorEvent } from '@/types/domain'

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

  // Resolve Title based on domain
  let title = 'Unknown Object'
  let subtitle = 'Unverified'

  if (selectedDomain === 'universe' || selectedDomain === 'brain' || selectedDomain === 'smallBody') {
    title = (selectedPayload as UniverseObject | BrainRegion | SmallBody).name ?? 'Unnamed'
  } else if (selectedDomain === 'setiTarget') {
    title = (selectedPayload as SetiTarget).name
  } else if (selectedDomain === 'setiCandidate') {
    title = 'Candidate ' + (selectedPayload as SetiCandidate).id.slice(0, 6)
    subtitle = `Frequency: ${(selectedPayload as SetiCandidate).frequency}`
  } else if (selectedDomain === 'meteorEvent') {
    title = (selectedPayload as MeteorEvent).eventName
  }

  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-64px-80px)] w-80 glass-panel border-l border-[#98CBFF]/15 z-40 p-6 flex flex-col gap-8 bg-black/60 backdrop-blur-md">
      <header>
        <div className="flex justify-between items-start mb-1">
          <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[9px] font-bold uppercase border border-tertiary/30">
            {selectedDomain.replace(/([A-Z])/g, ' $1').trim()}
          </span>
          <span onClick={clearSelection} className="material-symbols-outlined text-outline/40 text-sm cursor-pointer hover:text-primary transition-colors">
            close
          </span>
        </div>
        <h2 className="text-xl font-headline font-bold text-primary uppercase tracking-tight">{title}</h2>
        <p className="text-[10px] font-label text-outline/60 uppercase">{subtitle}</p>
      </header>

      <div className="space-y-6 flex-1 overflow-y-auto pr-1">
        <div className="space-y-2">
          <h4 className="text-[10px] font-label uppercase text-primary/70">Raw Properties</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries((selectedPayload as Record<string,any>).metadata || {}).slice(0, 4).map(([k, v], idx) => (
              <div key={idx} className="bg-surface-container-lowest p-3 border-l-2 border-primary/20">
                <p className="text-[9px] font-label text-outline/60 uppercase mb-1 truncate">{k.replace(/_/g, ' ')}</p>
                <p className="text-sm font-headline font-medium text-on-surface truncate">{formatValue(v)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 pb-4">
          <h4 className="text-[10px] font-label uppercase text-primary/70">System Actions</h4>
          <div className="space-y-2">
            <button className="w-full py-2 bg-primary/10 border border-primary/30 text-primary font-bold text-[10px] uppercase tracking-wider hover:bg-primary/20 transition-all">ANALYZE SIGNAL</button>
            <button className="w-full py-2 bg-surface-container-highest/50 border border-outline-variant/30 text-on-surface/70 font-bold text-[10px] uppercase tracking-wider hover:text-primary transition-all">VIEW RAW DATA</button>
            <button className="w-full py-2 border border-tertiary/40 text-tertiary font-bold text-[10px] uppercase tracking-wider hover:bg-tertiary/10 transition-all">RUN ML CLASSIFICATION</button>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-outline-variant/10">
        <div className="flex items-center gap-3 text-[9px] font-label text-outline/40 uppercase">
          <span className="h-2 w-2 rounded-full bg-tertiary animate-pulse"></span> SYSTEM NOMINAL | PACKET 144-X
        </div>
      </div>
    </aside>
  )
}

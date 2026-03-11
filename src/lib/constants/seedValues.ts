export const MOCK_ASTRONOMY_OBJECTS = [
    { id: 'a1', name: 'Alpha Centauri', type: 'star', coordinates: { x: 5, y: 2, z: -10 }, metadata: { class: 'G-type', mass: '1.1 M☉' } },
    { id: 'a2', name: 'Andromeda Galaxy', type: 'galaxy', coordinates: { x: -8, y: 5, z: -15 }, metadata: { distance: '2.5M ly' } },
    { id: 'a3', name: 'Virgo Cluster', type: 'cluster', coordinates: { x: 0, y: -5, z: -5 }, metadata: { galaxies: 1300 } },
    { id: 'a4', name: 'Sirius', type: 'star', coordinates: { x: 2, y: 8, z: -2 }, metadata: { class: 'A-type', bright: true } }
]

export const MOCK_BRAIN_REGIONS = [
    { id: 'b1', name: 'Prefrontal Cortex', coordinates: { x: 0, y: 2, z: 2 }, metadata: { lobe: 'Frontal', function: 'Decision making' } },
    { id: 'b2', name: 'Somatosensory Cortex', coordinates: { x: 0, y: 4, z: -1 }, metadata: { lobe: 'Parietal', function: 'Touch processing' } },
    { id: 'b3', name: 'Primary Visual Cortex', coordinates: { x: 0, y: 1, z: -4 }, metadata: { lobe: 'Occipital', function: 'Visual processing' } },
    { id: 'b4', name: 'Hippocampus', coordinates: { x: -1, y: 0.5, z: 0 }, metadata: { system: 'Limbic', function: 'Memory' } }
]

// landing_page/src/components/interactive/DashboardMap.tsx
// Real MapLibre instance fitted into the ProductUI dashboard chrome.
// Locked interactions (no zoom/pan) so it reads as a screenshot, with corridor + alert overlays.
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const TIER_COLORS = ['#5EE26B', '#46993F', '#F4B84A', '#FF6B57'];

const STYLE = {
  version: 8,
  sources: {
    'osm-raster': {
      type: 'raster',
      tiles: ['https://basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors © CARTO'
    }
  },
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
  layers: [
    { id: 'bg', type: 'background', paint: { 'background-color': '#0A0E14' } },
    { id: 'base', type: 'raster', source: 'osm-raster', paint: { 'raster-opacity': 0.85 } }
  ]
} as const;

export default function DashboardMap() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const map = new maplibregl.Map({
      container: container.current,
      style: STYLE as unknown as maplibregl.StyleSpecification,
      center: [-71.12, 46.85],
      zoom: 10.4,
      attributionControl: { compact: true },
      interactive: false,
      bearing: -8
    });

    map.on('load', async () => {
      try {
        const res = await fetch('/data/sample-risk.geojson');
        const data = await res.json();
        map.addSource('risk', { type: 'geojson', data });

        // Glow halo
        map.addLayer({
          id: 'risk-glow',
          type: 'line',
          source: 'risk',
          filter: ['==', ['get', 'kind'], 'corridor'],
          paint: {
            'line-width': 14,
            'line-blur': 8,
            'line-opacity': 0.45,
            'line-color': [
              'match', ['get', 'tier'],
              1, TIER_COLORS[0], 2, TIER_COLORS[1],
              3, TIER_COLORS[2], 4, TIER_COLORS[3],
              '#8B95A8'
            ]
          }
        });

        // Corridor centerline
        map.addLayer({
          id: 'risk-lines',
          type: 'line',
          source: 'risk',
          filter: ['==', ['get', 'kind'], 'corridor'],
          paint: {
            'line-width': 3,
            'line-color': [
              'match', ['get', 'tier'],
              1, TIER_COLORS[0], 2, TIER_COLORS[1],
              3, TIER_COLORS[2], 4, TIER_COLORS[3],
              '#8B95A8'
            ]
          }
        });

        // Alert pulse halos
        map.addLayer({
          id: 'alerts-halo',
          type: 'circle',
          source: 'risk',
          filter: ['==', ['get', 'kind'], 'alert'],
          paint: {
            'circle-radius': 22,
            'circle-color': TIER_COLORS[0],
            'circle-opacity': 0.18,
            'circle-blur': 0.8
          }
        });
        map.addLayer({
          id: 'alerts',
          type: 'circle',
          source: 'risk',
          filter: ['==', ['get', 'kind'], 'alert'],
          paint: {
            'circle-radius': 6,
            'circle-color': TIER_COLORS[0],
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#0A0E14'
          }
        });

        // Substations
        map.addLayer({
          id: 'assets',
          type: 'circle',
          source: 'risk',
          filter: ['==', ['get', 'kind'], 'asset'],
          paint: {
            'circle-radius': 5,
            'circle-color': '#E6EAF0',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#0A0E14'
          }
        });
      } catch (e) {
        console.warn('risk overlay unavailable', e);
      }
    });

    return () => { map.remove(); };
  }, []);

  return <div ref={container} className="h-full w-full" aria-label="Vegetation Manager risk map" />;
}

// landing_page/src/components/interactive/MapTeaser.tsx
// Live MapLibre risk map — dark basemap, brand sequential palette, hover tooltips,
// pulsing alerts, click-to-fly. Brand §10: dark-first, signal in color, structure in neutrals.
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const TIER_COLORS = ['#5EE26B', '#46993F', '#F4B84A', '#FF6B57']; // 1..4 — sequential per Brand §10
const BONE  = '#E6EAF0';
const MIST  = '#8B95A8';
const STEEL = '#3F4859';

const STYLE = {
  version: 8,
  sources: {
    'osm-raster': {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors'
    }
  },
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
  layers: [
    { id: 'bg', type: 'background', paint: { 'background-color': '#0A0E14' } },
    {
      id: 'base',
      type: 'raster',
      source: 'osm-raster',
      paint: {
        // Heavy desaturation + invert lightness to fake a dark basemap from OSM raster
        'raster-opacity': 0.25,
        'raster-saturation': -1,
        'raster-brightness-min': 0,
        'raster-brightness-max': 0.55,
        'raster-contrast': -0.2
      }
    }
  ]
} as const;

interface AlertProps {
  span: string;
  iou: number;
  tier: number;
  encroach: string;
  species: string;
}

export default function MapTeaser() {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [hover, setHover] = useState<{
    x: number; y: number; data: AlertProps | null;
  } | null>(null);
  const [coord, setCoord] = useState<{ lat: number; lon: number; z: number }>({
    lat: 46.85, lon: -71.12, z: 10.2
  });

  useEffect(() => {
    if (!container.current) return;

    const map = new maplibregl.Map({
      container: container.current,
      style: STYLE as unknown as maplibregl.StyleSpecification,
      center: [-71.12, 46.85],
      zoom: 10.2,
      attributionControl: { compact: true },
      bearing: -8,
      pitch: 0
    });
    mapRef.current = map;

    map.on('move', () => {
      const c = map.getCenter();
      setCoord({ lat: c.lat, lon: c.lng, z: map.getZoom() });
    });

    map.on('load', async () => {
      try {
        const res = await fetch('/data/sample-risk.geojson');
        const data = await res.json();

        map.addSource('risk', { type: 'geojson', data });

        // Glow halo behind corridor
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
              1, TIER_COLORS[0],
              2, TIER_COLORS[1],
              3, TIER_COLORS[2],
              4, TIER_COLORS[3],
              MIST
            ]
          }
        });

        // Corridor centreline
        map.addLayer({
          id: 'risk-lines',
          type: 'line',
          source: 'risk',
          filter: ['==', ['get', 'kind'], 'corridor'],
          paint: {
            'line-width': 3,
            'line-color': [
              'match', ['get', 'tier'],
              1, TIER_COLORS[0],
              2, TIER_COLORS[1],
              3, TIER_COLORS[2],
              4, TIER_COLORS[3],
              MIST
            ],
            'line-opacity': 0.95
          }
        });

        // Alert points — pulsing tier-1 markers
        map.addLayer({
          id: 'alerts-halo',
          type: 'circle',
          source: 'risk',
          filter: ['==', ['get', 'kind'], 'alert'],
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, 14, 13, 28],
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
            'circle-radius': 5,
            'circle-color': TIER_COLORS[0],
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#0A0E14'
          }
        });

        // Substation assets — bone squares
        map.addLayer({
          id: 'assets',
          type: 'circle',
          source: 'risk',
          filter: ['==', ['get', 'kind'], 'asset'],
          paint: {
            'circle-radius': 4,
            'circle-color': BONE,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#0A0E14'
          }
        });

        // Hover behavior on alerts
        map.on('mouseenter', 'alerts', (e) => {
          map.getCanvas().style.cursor = 'pointer';
          const f = e.features?.[0];
          if (!f) return;
          const props = f.properties as AlertProps;
          const point = e.point;
          setHover({ x: point.x, y: point.y, data: props });
        });
        map.on('mousemove', 'alerts', (e) => {
          const f = e.features?.[0];
          if (!f) return;
          setHover({
            x: e.point.x,
            y: e.point.y,
            data: f.properties as AlertProps
          });
        });
        map.on('mouseleave', 'alerts', () => {
          map.getCanvas().style.cursor = '';
          setHover(null);
        });

        // Click-to-fly on alerts
        map.on('click', 'alerts', (e) => {
          const f = e.features?.[0];
          if (!f || f.geometry.type !== 'Point') return;
          map.flyTo({
            center: f.geometry.coordinates as [number, number],
            zoom: 13,
            duration: 1100,
            essential: true
          });
        });

        // Animated dash marching along the corridor (instrument feel)
        let dashStep = 0;
        let dashRaf = 0;
        const stepDash = () => {
          dashStep = (dashStep + 0.015) % 8;
          if (map.getLayer('risk-march')) {
            map.setPaintProperty('risk-march', 'line-dasharray', [4, 8]);
            map.setPaintProperty('risk-march', 'line-translate', [dashStep, 0]);
          }
          dashRaf = requestAnimationFrame(stepDash);
        };
        // Marching guide line
        map.addLayer({
          id: 'risk-march',
          type: 'line',
          source: 'risk',
          filter: ['==', ['get', 'kind'], 'corridor'],
          paint: {
            'line-width': 1,
            'line-color': BONE,
            'line-opacity': 0.45,
            'line-dasharray': [4, 8]
          }
        });
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
          dashRaf = requestAnimationFrame(stepDash);
        }

        // Cleanup hook
        map.once('remove', () => cancelAnimationFrame(dashRaf));

      } catch (e) {
        console.warn('risk overlay unavailable', e);
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  // Programmatic actions
  const flyToTier1 = () => {
    mapRef.current?.flyTo({
      center: [-71.295, 46.808],
      zoom: 13,
      duration: 1200
    });
  };
  const resetView = () => {
    mapRef.current?.flyTo({
      center: [-71.12, 46.85],
      zoom: 10.2,
      duration: 900
    });
  };

  return (
    <div className="relative h-full w-full">
      <div
        ref={container}
        className="h-full w-full"
        aria-label="Live vegetation risk map · Petit-Saguenay corridor"
      />

      {/* Top overlay — mode + legend */}
      <div
        className="pointer-events-none absolute top-3 left-3 px-3 py-2"
        style={{
          background: 'rgba(10,14,20,0.85)',
          border: '1px solid #3F4859',
          backdropFilter: 'blur(6px)'
        }}
      >
        <p
          style={{
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#5EE26B'
          }}
        >
          ● Live · risk tiers · 18 mo
        </p>
        <div className="mt-2 flex items-center gap-2">
          {[1, 2, 3, 4].map((t, i) => (
            <div key={t} className="flex items-center gap-1">
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  background: TIER_COLORS[i]
                }}
              />
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9,
                  color: '#BFC7D4',
                  letterSpacing: '0.1em'
                }}
              >
                T{t}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="pointer-events-auto absolute top-3 right-3 flex flex-col gap-2">
        <button
          onClick={flyToTier1}
          className="px-3 py-2 transition-colors"
          style={{
            background: '#5EE26B',
            color: '#0A0E14',
            border: '1px solid #5EE26B',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase'
          }}
        >
          Fly to S-0042 →
        </button>
        <button
          onClick={resetView}
          className="px-3 py-2"
          style={{
            background: 'rgba(10,14,20,0.85)',
            color: '#E6EAF0',
            border: '1px solid #3F4859',
            backdropFilter: 'blur(6px)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase'
          }}
        >
          Reset view
        </button>
      </div>

      {/* Coord readout */}
      <div
        className="pointer-events-none absolute bottom-3 left-3 px-3 py-1.5"
        style={{
          background: 'rgba(10,14,20,0.85)',
          border: '1px solid #3F4859',
          backdropFilter: 'blur(6px)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 9,
          color: '#BFC7D4',
          letterSpacing: '0.04em'
        }}
      >
        {coord.lat.toFixed(4)}° N · {Math.abs(coord.lon).toFixed(4)}° W · z {coord.z.toFixed(1)}
      </div>

      {/* Tooltip */}
      {hover && hover.data && (
        <div
          className="pointer-events-none absolute"
          style={{
            top: hover.y + 14,
            left: hover.x + 14,
            background: 'rgba(10,14,20,0.94)',
            border: '1px solid #5EE26B',
            padding: '0.75rem 0.875rem',
            minWidth: 220,
            zIndex: 10,
            backdropFilter: 'blur(6px)'
          }}
        >
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5EE26B',
              marginBottom: 6
            }}
          >
            ● Tier {hover.data.tier} · alert
          </p>
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              color: '#E6EAF0',
              fontSize: 13
            }}
          >
            {hover.data.span}
          </p>
          <p
            style={{
              fontFamily: 'Inter, system-ui',
              color: '#BFC7D4',
              fontSize: 12,
              marginTop: 4,
              fontStyle: 'italic'
            }}
          >
            {hover.data.species}
          </p>
          <div
            style={{
              marginTop: 8,
              paddingTop: 8,
              borderTop: '1px solid #3F4859',
              display: 'flex',
              gap: 16
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#8B95A8'
                }}
              >
                Encroach
              </p>
              <p style={{ fontFamily: 'Inter Display, Inter Tight, Inter', fontWeight: 700, color: '#FF6B57', fontSize: 16, marginTop: 2 }}>
                {hover.data.encroach}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#8B95A8'
                }}
              >
                IoU
              </p>
              <p style={{ fontFamily: 'Inter Display, Inter Tight, Inter', fontWeight: 700, color: '#5EE26B', fontSize: 16, marginTop: 2 }}>
                {hover.data.iou.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

# Twin Studio — Web App UI Kit

The customer-facing dashboard for managing Sat Lab digital twins. A high-fidelity recreation showing the Overview page.

## Components present

- **Status bar** — workspace switcher, live online count, p99 readout, region, command-bar hint
- **Sidebar** — grouped nav with active-rail signal accent, counts, signal/workspace sections
- **KPI cards** — telemetry tiles with sparklines (one with `--glow-signal`)
- **Twin table** — name, status badge, region, p99, confidence, calibration time
- **Status badges** — live (pulse), training, paused, failed
- **Activity feed** — timestamped event log with tag-minis
- **Calibration health panel** — per-twin progress bars

## Caveats

Built without source. Twin names, customer workspace, and metric values are illustrative. The intent is to show the *shape* of an instrumentation-grade dashboard for a digital twin platform — swap in real surfaces if/when available.

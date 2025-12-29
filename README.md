# Void Horizon - Corporate Design System & Technical Specification

## Project Overview
**Void Horizon** is a premium corporate website for an AI engineering and strategic consultancy. The project utilizes a "Fluid Intelligence" design philosophy, characterized by high-end motion design, organic transitions, and a sophisticated "Acid Forest" aesthetic.

## Tech Stack
- **Framework**: React 19 (ESM via esm.sh)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide React
- **Intelligence**: Google Gemini API (@google/genai)
- **Audio**: Web Audio API (Custom Sine-wave Sound Manager)

## Design System
### 1. Aesthetic & Branding
- **Primary Theme**: Dark Mode (Base: `#020302`, Brand Green: `#bfff00`).
- **Typography**: 
  - `Syne`: Used for bold, high-impact headings and brand elements.
  - `Inter`: Used for readable, professional body text.
- **Adaptive Theme**: Supports a "Light Mode" via the `.light-theme` class on `document.documentElement`, which flips the background to white while maintaining the brand green accents.

### 2. Behavioral Rules (Critical)
- **Glitch Effects**: 
  - **Font Glitch**: Scrambles characters 100% of the time on hover to create a "processing" feel.
  - **Color Glitch (RGB Shift)**: Strictly limited to a **5% trigger probability** on hover. It must feel like a rare, subtle digital artifact, not a broken screen.
- **Audio Feedback**: All UI sounds must be soft, non-intrusive sine waves. Global volume is capped at low levels (0.005 - 0.02 gain).
- **Tone of Voice**: Professional, B2B, and sophisticated. Avoid "sci-fi jargon" or "over-the-top" cyberpunk tropes. Use corporate consulting language.

## Component Architecture
- `index.html`: Contains the global CSS, parallax background layers (3D grid, auras, scanlines), and theme-switching variable definitions.
- `index.tsx`: 
  - `SoundManager`: Handles all UI audio feedback.
  - `GlitchText`: The primary interactive text component with scrambled character logic.
  - `AIConcierge`: A sophisticated chat interface using Gemini 3 Flash. Includes iMessage-style entry animations (`message-enter` class).
  - `ProjectDetailModal`: A "Deep-Dive" detail layer for service offerings.
  - `Highlight`: A scroll-triggered "highlighter pen" effect for key phrases.

## Development Guidelines for Windsurf
1. **Maintain Minimal Updates**: Do not rewrite stable layout structures when adding features.
2. **Parallax Integrity**: When adding sections, ensure they respect the existing `useParallax` hook or the background aura movements.
3. **English Only**: The interface is strictly English. Do not introduce other languages.

5. **Smoothness**: Every new element should have an entry animation (e.g., `opacity` + `transform` transition).

## Key State Variables
- `--bg-base`: Background color.
- `--brand-green`: Primary accent color (#bfff00).
- `--text-color`: Primary text color.
- `is-active`: Class used to trigger the `Highlight` component.
- `light-theme`: Class used to toggle adaptive UI.

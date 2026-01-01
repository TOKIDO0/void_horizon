# Void Horizon - Corporate Design System & Technical Specification

## Project Overview
**Void Horizon** is a premium corporate website for an AI engineering and strategic consultancy. The project utilizes a "Fluid Intelligence" design philosophy, characterized by high-end motion design, organic transitions, and a sophisticated "Acid Forest" aesthetic.

## Tech Stack
- **Framework**: React 19 (ESM via esm.sh)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide React
- **Intelligence**: Google Gemini API (@google/genai)
- **Audio**: Web Audio API (Custom Sine-wave Sound Manager)
- **Animations**: GSAP (GreenSock Animation Platform)
- **Notifications**: NTFY Service Integration

## Website Structure & Sections

### 1. Hero Section
- **Purpose**: Landing page with dynamic background and brand introduction
- **Features**: 
  - Animated gradient background with parallax effects
  - Company logo and tagline
  - Call-to-action buttons
  - GSAP-powered entrance animations

### 2. Core Business Domains
- **Purpose**: Showcase main service areas
- **Services**:
  - **Web Architecture**: Digital Asset Hub & Core development
  - **Intelligent Agents**: Autonomous Systems & Neural networks
  - **AI Strategy**: Management Advisory & Future planning
- **Features**: Animated project titles with hover effects

### 3. Ethos Section
- **Purpose**: Company values and philosophy presentation
- **Features**: 
  - Company mission statement
  - Core values display
  - Lightning icon for quick actions (suggested: "Quick Consultation")

### 4. Workflow Process Section
- **Purpose**: Demonstrate project development workflow
- **Steps**:
  1. Discovery - Research and analysis
  2. Strategy - Planning and design
  3. Development - Implementation and coding
  4. Delivery - Deployment and support
- **Features**: 
  - Video background cards
  - Sequential entrance animations
  - Hover effects and transitions

### 5. Contact Section
- **Purpose**: Client contact and inquiry collection
- **Features**:
  - Contact form with validation
  - NTFY notification integration
  - Animated submit button (capsule to rectangle transition)
  - Toast notifications for user feedback

### 6. AI Chat Assistant
- **Purpose**: Interactive AI-powered support
- **Features**:
  - Gemini 3 Flash integration
  - iMessage-style interface
  - Animated entrance effects
  - Floating activation button with rotating animation

## Design System

### 1. Aesthetic & Branding
- **Primary Theme**: Dark Mode (Base: `#020302`, Brand Green: `#bfff00`)
- **Typography**: 
  - `Syne`: Used for bold, high-impact headings and brand elements
  - `Inter`: Used for readable, professional body text
- **Adaptive Theme**: Supports light mode via CSS classes
- **Color Scheme**: 
  - Primary: Black backgrounds with green accents
  - Secondary: White text and UI elements
  - Interactive: Green (#bfff00) for CTAs and highlights

### 2. Animation & Interactions
- **GSAP Animations**: 
  - Text entrance with skew and fade effects
  - Card 3D rotations
  - Scroll-triggered animations
  - Parallax background movements
- **CSS Transitions**:
  - Button hover states
  - Card transformations
  - Smooth section transitions
- **Micro-interactions**:
  - Audio feedback on interactions
  - Hover effects on all interactive elements
  - Loading states and progress indicators

### 3. Behavioral Rules (Critical)
- **Glitch Effects**: 
  - **Font Glitch**: Scrambles characters on hover for "processing" feel
  - **Color Glitch (RGB Shift)**: Limited to 5% trigger probability
- **Audio Feedback**: Soft sine waves, low volume (0.005 - 0.02 gain)
- **Tone of Voice**: Professional, B2B, sophisticated

## Component Architecture

### Core Components
- `SoundManager`: Handles all UI audio feedback
- `GlitchText`: Interactive text with character scrambling
- `AIConcierge`: Chat interface with Gemini integration
- `ScrollRevealSection`: Scroll-triggered animation wrapper
- `AnimatedProjectTitle`: Service showcase with hover effects
- `WorkflowCard`: Process step cards with video backgrounds

### Utility Components
- `useParallax`: Custom hook for parallax scrolling
- `useTypewriter`: Text animation effect
- `Toast`: Notification system for user feedback

## Technical Implementation

### 1. State Management
- **React Hooks**: useState, useEffect, useRef for component state
- **Form State**: Contact form validation and submission
- **UI State**: Modal visibility, chat open/close states
- **Animation State**: GSAP timeline management

### 2. API Integration
- **Google Gemini**: AI chat functionality
- **NTFY Service**: Push notification system
- **Fetch API**: HTTP requests for external services

### 3. Performance Optimizations
- **Lazy Loading**: Images and video content
- **Code Splitting**: Dynamic imports for better loading
- **Animation Performance**: GPU-accelerated transforms
- **Responsive Design**: Mobile-first approach

## Development Guidelines

### 1. Code Organization
- **File Structure**: 
  - `index.html`: Global styles and setup
  - `index.tsx`: Main React application
  - `public/assets/`: Static resources
  - `website-improvements.md`: Future development roadmap

### 2. Best Practices
- **Maintain Minimal Updates**: Don't rewrite stable layouts
- **Parallax Integrity**: Respect existing background movements
- **English Only**: Interface strictly in English
- **Smooth Animations**: Every element needs entrance animation
- **Mobile Responsive**: Touch-optimized interactions

### 3. CSS Architecture
- **Custom Properties**: CSS variables for theming
- **Component Classes**: BEM-style naming conventions
- **Animation Classes**: Reusable animation utilities
- **Responsive Utilities**: Mobile-first media queries

## Key Features & Functionality

### 1. Interactive Elements
- **Navigation**: Smooth scroll to sections
- **Forms**: Validation with real-time feedback
- **Buttons**: Multiple animation styles and states
- **Cards**: Hover effects and information display

### 2. Media Handling
- **Videos**: Background videos with autoplay
- **Images**: Optimized loading and lazy loading
- **Icons**: Lucide React icon system
- **Animations**: GSAP and CSS-based animations

### 3. User Experience
- **Accessibility**: Keyboard navigation support
- **Performance**: Optimized loading and animations
- **Feedback**: Visual and audio feedback
- **Responsive**: Works on all device sizes

## Configuration & Setup

### 1. Environment Variables
- **Gemini API Key**: For AI chat functionality
- **NTFY Topic**: For notification delivery
- **Asset Paths**: Static resource locations

### 2. Build Configuration
- **ESM Imports**: Modern JavaScript module system
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety and development experience

## Future Development

### Planned Features (See website-improvements.md)
- Service detail pages
- Portfolio showcase
- Team introduction
- Blog/technical articles
- Customer testimonials
- Pricing information
- FAQ section
- News and updates
- Online tools and resources
- Partner showcase

### Technical Improvements
- Enhanced SEO optimization
- Performance monitoring
- Advanced analytics
- Multi-language support
- PWA functionality
- Enhanced security

## Troubleshooting

### Common Issues
- **NTFY Notifications**: Check console logs for detailed error information
- **Animation Performance**: Ensure GPU acceleration is enabled
- **Mobile Responsiveness**: Test on various device sizes
- **Audio Feedback**: Check browser audio permissions

### Debug Information
- Console logging enabled for NTFY requests
- GSAP debug mode available
- Performance monitoring tools integrated

---

*This document is maintained alongside the project development. Last updated: December 2024*

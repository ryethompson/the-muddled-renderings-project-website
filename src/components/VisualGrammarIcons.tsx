import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Bedrock Icon: Stepped geological terrain strata plates with isometric relief,
 * matching the procedural landform bedrock in the main canvas.
 */
export const BedrockIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5', size }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Base strata plate (wide elliptical bedrock foundation) */}
    <ellipse
      cx="8"
      cy="12.5"
      rx="6.8"
      ry="2.4"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth="0.85"
    />
    {/* Middle strata plate */}
    <ellipse
      cx="8"
      cy="9.6"
      rx="5"
      ry="1.9"
      fill="currentColor"
      fillOpacity="0.45"
      stroke="currentColor"
      strokeWidth="0.85"
    />
    {/* Top ridge plate */}
    <ellipse
      cx="8"
      cy="6.8"
      rx="3.3"
      ry="1.4"
      fill="currentColor"
      fillOpacity="0.85"
      stroke="currentColor"
      strokeWidth="0.9"
    />
  </svg>
);

/**
 * Spire Icon: Crystalline faceted obelisk with ascending emergent energy plumes,
 * matching the R&D spire and particles in the main canvas.
 */
export const SpireIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5', size }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Ascending plume particles */}
    <circle cx="8" cy="1.2" r="0.75" fill="currentColor" fillOpacity="0.9" />
    <circle cx="9.2" cy="2.7" r="0.6" fill="currentColor" fillOpacity="0.7" />
    <circle cx="6.8" cy="3.3" r="0.5" fill="currentColor" fillOpacity="0.5" />
    {/* Left facet */}
    <path
      d="M8 4.6L5.6 14.5H8V4.6Z"
      fill="currentColor"
      fillOpacity="0.45"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinejoin="round"
    />
    {/* Right facet */}
    <path
      d="M8 4.6L10.4 14.5H8V4.6Z"
      fill="currentColor"
      fillOpacity="0.85"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinejoin="round"
    />
    {/* Center facet ridge highlight */}
    <line
      x1="8"
      y1="4.6"
      x2="8"
      y2="14.5"
      stroke="#ffffff"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeOpacity="0.85"
    />
  </svg>
);

/**
 * Circuits Icon: Cybernetic vein lattice with crystalline geometric node web,
 * matching the business digital intensity web in the main canvas.
 */
export const CircuitsIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5', size }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Polygonal perimeter tendrils */}
    <path
      d="M8 2.2L13.5 6.2L11.5 13.8H4.5L2.5 6.2L8 2.2Z"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeOpacity="0.6"
    />
    {/* Internal crystalline interconnect veins */}
    <path
      d="M8 2.2L8 8.8M13.5 6.2L8 8.8M11.5 13.8L8 8.8M4.5 13.8L8 8.8M2.5 6.2L8 8.8"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeOpacity="0.75"
    />
    {/* Node spark vertices */}
    <circle cx="8" cy="2.2" r="1.1" fill="currentColor" />
    <circle cx="13.5" cy="6.2" r="1" fill="currentColor" />
    <circle cx="11.5" cy="13.8" r="1" fill="currentColor" />
    <circle cx="4.5" cy="13.8" r="1" fill="currentColor" />
    <circle cx="2.5" cy="6.2" r="1" fill="currentColor" />
    {/* Central luminous core spark */}
    <circle cx="8" cy="8.8" r="1.3" fill="#ffffff" fillOpacity="0.95" />
  </svg>
);

/**
 * Aura Icon: Atmospheric coherence aura with concentric orbital ripples and satellite nodes,
 * matching the internet access coherence aura in the main canvas.
 */
export const AuraIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5', size }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Outer dashed orbital ripple */}
    <ellipse
      cx="8"
      cy="8"
      rx="7"
      ry="5.5"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="2.5 2"
      strokeOpacity="0.55"
    />
    {/* Mid continuous coherence ring */}
    <ellipse
      cx="8"
      cy="8"
      rx="4.8"
      ry="3.8"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeOpacity="0.85"
    />
    {/* Inner glowing pulse core */}
    <circle
      cx="8"
      cy="8"
      r="1.8"
      fill="currentColor"
      fillOpacity="0.35"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    {/* Orbital ripple satellites */}
    <circle cx="13.3" cy="6" r="0.9" fill="currentColor" />
    <circle cx="3" cy="9.8" r="0.85" fill="currentColor" />
    <circle cx="8" cy="8" r="0.8" fill="#ffffff" />
  </svg>
);

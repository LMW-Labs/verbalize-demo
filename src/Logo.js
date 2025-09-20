import React from 'react';

const Logo = () => (
  <svg className="w-8 h-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left bracket */}
    <path d="M20 40C20 31.163 27.163 24 36 24H56V36H36C33.791 36 32 37.791 32 40V80H44V92H32V132C32 134.209 33.791 136 36 136H56V148H36C27.163 148 20 140.837 20 132V40Z" fill="url(#gradient1)"/>

    {/* Right bracket */}
    <path d="M180 40C180 31.163 172.837 24 164 24H144V36H164C166.209 36 168 37.791 168 40V80H156V92H168V132C168 134.209 166.209 136 164 136H144V148H164C172.837 148 180 140.837 180 132V40Z" fill="url(#gradient1)"/>

    {/* Microphone base */}
    <rect x="90" y="140" width="20" height="12" rx="2" fill="url(#gradient2)"/>
    <rect x="80" y="148" width="40" height="8" rx="4" fill="url(#gradient2)"/>

    {/* Microphone body */}
    <ellipse cx="100" cy="80" rx="25" ry="35" fill="url(#gradient3)"/>
    <ellipse cx="100" cy="80" rx="20" ry="30" fill="url(#gradient4)"/>

    {/* Sound waves */}
    <path d="M130 65C130 65 140 70 140 80C140 90 130 95 130 95" stroke="url(#gradient5)" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M140 55C140 55 155 62 155 80C155 98 140 105 140 105" stroke="url(#gradient5)" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M150 45C150 45 170 54 170 80C170 106 150 115 150 115" stroke="url(#gradient5)" strokeWidth="4" strokeLinecap="round" fill="none"/>

    {/* Audio level indicators */}
    <circle cx="135" cy="50" r="3" fill="url(#gradient6)"/>
    <circle cx="145" cy="45" r="2" fill="url(#gradient6)"/>
    <circle cx="125" cy="55" r="2" fill="url(#gradient6)"/>
    <circle cx="155" cy="52" r="3" fill="url(#gradient6)"/>

    {/* Microphone grille lines */}
    <line x1="85" y1="70" x2="115" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
    <line x1="85" y1="80" x2="115" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
    <line x1="85" y1="90" x2="115" y2="90" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>

    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#C084FC"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A78BFA"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E0E7FF"/><stop offset="50%" stopColor="#C7D2FE"/><stop offset="100%" stopColor="#A5B4FC"/></linearGradient>
      <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F8FAFC"/><stop offset="100%" stopColor="#E2E8F0"/></linearGradient>
      <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60A5FA"/><stop offset="100%" stopColor="#3B82F6"/></linearGradient>
      <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#34D399"/><stop offset="100%" stopColor="#10B981"/></linearGradient>
    </defs>
  </svg>
);

export default Logo;
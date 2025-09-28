'use client';

export default function ConstructionIllustration({ size = "lg", className = "", darkMode = false }) {
  const sizeClasses = {
    sm: "w-64 h-32",
    md: "w-80 h-40", 
    lg: "w-96 h-48",
    xl: "w-[28rem] h-56"
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative overflow-hidden`}>
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background construction site elements */}
        <defs>
          {/* Gradient for cones */}
          <linearGradient id="coneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          
          {/* Construction worker colors */}
          <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Construction cones */}
        <g className="animate-pulse" style={{ animationDuration: '2s' }}>
          <polygon 
            points="30,160 40,160 35,140" 
            fill="url(#coneGradient)" 
            stroke={darkMode ? '#374151' : '#d1d5db'} 
            strokeWidth="1"
          />
          <rect x="32" y="160" width="6" height="8" fill={darkMode ? '#4b5563' : '#9ca3af'} />
          
          <polygon 
            points="350,165 360,165 355,145" 
            fill="url(#coneGradient)" 
            stroke={darkMode ? '#374151' : '#d1d5db'} 
            strokeWidth="1"
          />
          <rect x="352" y="165" width="6" height="8" fill={darkMode ? '#4b5563' : '#9ca3af'} />
        </g>

        {/* Main text "COMING SOON" being constructed */}
        <g className={darkMode ? 'fill-white' : 'fill-gray-800'}>
          <text 
            x="200" 
            y="100" 
            textAnchor="middle" 
            fontSize="32" 
            fontWeight="bold" 
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            COMING
          </text>
          <text 
            x="200" 
            y="135" 
            textAnchor="middle" 
            fontSize="32" 
            fontWeight="bold" 
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            SOON
          </text>
        </g>

        {/* Construction worker 1 - Left side, climbing ladder */}
        <g>
          {/* Ladder */}
          <line x1="80" y1="170" x2="80" y2="120" stroke={darkMode ? '#6b7280' : '#9ca3af'} strokeWidth="3" />
          <line x1="85" y1="170" x2="85" y2="120" stroke={darkMode ? '#6b7280' : '#9ca3af'} strokeWidth="3" />
          <line x1="78" y1="160" x2="87" y2="160" stroke={darkMode ? '#6b7280' : '#9ca3af'} strokeWidth="2" />
          <line x1="78" y1="145" x2="87" y2="145" stroke={darkMode ? '#6b7280' : '#9ca3af'} strokeWidth="2" />
          <line x1="78" y1="130" x2="87" y2="130" stroke={darkMode ? '#6b7280' : '#9ca3af'} strokeWidth="2" />
          
          {/* Worker head */}
          <circle cx="82.5" cy="135" r="6" fill={darkMode ? '#fbbf24' : '#f59e0b'} />
          <circle cx="82.5" cy="135" r="8" fill="url(#helmetGradient)" opacity="0.8" />
          
          {/* Worker body */}
          <rect x="79" y="141" width="7" height="12" rx="2" fill={darkMode ? '#3b82f6' : '#2563eb'} />
          
          {/* Worker arms */}
          <line x1="78" y1="145" x2="75" y2="150" stroke={darkMode ? '#fbbf24' : '#d97706'} strokeWidth="3" strokeLinecap="round" />
          <line x1="87" y1="145" x2="90" y2="150" stroke={darkMode ? '#fbbf24' : '#d97706'} strokeWidth="3" strokeLinecap="round" />
          
          {/* Worker legs */}
          <line x1="81" y1="153" x2="79" y2="165" stroke={darkMode ? '#1f2937' : '#374151'} strokeWidth="3" strokeLinecap="round" />
          <line x1="84" y1="153" x2="86" y2="165" stroke={darkMode ? '#1f2937' : '#374151'} strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Construction worker 2 - Right side, with hammer */}
        <g>
          {/* Worker head */}
          <circle cx="320" cy="155" r="6" fill={darkMode ? '#fbbf24' : '#f59e0b'} />
          <circle cx="320" cy="155" r="8" fill="url(#helmetGradient)" opacity="0.8" />
          
          {/* Worker body */}
          <rect x="317" y="161" width="7" height="12" rx="2" fill={darkMode ? '#ef4444' : '#dc2626'} />
          
          {/* Worker arms */}
          <line x1="316" y1="165" x2="310" y2="160" stroke={darkMode ? '#fbbf24' : '#d97706'} strokeWidth="3" strokeLinecap="round" />
          <line x1="325" y1="165" x2="330" y2="155" stroke={darkMode ? '#fbbf24' : '#d97706'} strokeWidth="3" strokeLinecap="round" />
          
          {/* Hammer */}
          <rect x="330" y="152" width="8" height="3" rx="1" fill={darkMode ? '#6b7280' : '#9ca3af'} />
          <rect x="332" y="150" width="4" height="7" rx="1" fill={darkMode ? '#4b5563' : '#6b7280'} />
          
          {/* Worker legs */}
          <line x1="319" y1="173" x2="317" y2="180" stroke={darkMode ? '#1f2937' : '#374151'} strokeWidth="3" strokeLinecap="round" />
          <line x1="322" y1="173" x2="324" y2="180" stroke={darkMode ? '#1f2937' : '#374151'} strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Construction worker 3 - Center bottom, carrying letter */}
        <g>
          {/* Letter/brick being carried */}
          <rect x="195" y="150" width="10" height="8" rx="1" fill={darkMode ? '#8b5cf6' : '#7c3aed'} />
          
          {/* Worker head */}
          <circle cx="200" cy="155" r="5" fill={darkMode ? '#fbbf24' : '#f59e0b'} />
          <circle cx="200" cy="155" r="7" fill="url(#helmetGradient)" opacity="0.8" />
          
          {/* Worker body */}
          <rect x="198" y="160" width="6" height="10" rx="2" fill={darkMode ? '#10b981' : '#059669'} />
          
          {/* Worker arms (carrying) */}
          <line x1="197" y1="163" x2="194" y2="157" stroke={darkMode ? '#fbbf24' : '#d97706'} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="203" y1="163" x2="206" y2="157" stroke={darkMode ? '#fbbf24' : '#d97706'} strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Worker legs */}
          <line x1="199" y1="170" x2="197" y2="180" stroke={darkMode ? '#1f2937' : '#374151'} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="201" y1="170" x2="203" y2="180" stroke={darkMode ? '#1f2937' : '#374151'} strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Floating construction elements */}
        <g className="animate-pulse" style={{ animationDuration: '3s' }}>
          {/* Tools scattered around */}
          <circle cx="120" cy="180" r="3" fill={darkMode ? '#6b7280' : '#9ca3af'} opacity="0.7" />
          <rect x="280" y="177" width="8" height="3" rx="1" fill={darkMode ? '#f59e0b' : '#d97706'} opacity="0.7" />
          <polygon points="150,175 155,175 152.5,170" fill={darkMode ? '#ef4444' : '#dc2626'} opacity="0.6" />
        </g>

        {/* Dust/construction particles */}
        <g className="animate-ping" style={{ animationDuration: '4s' }}>
          <circle cx="100" cy="170" r="1" fill={darkMode ? '#6b7280' : '#d1d5db'} opacity="0.5" />
          <circle cx="300" cy="175" r="1.5" fill={darkMode ? '#6b7280' : '#d1d5db'} opacity="0.4" />
          <circle cx="180" cy="185" r="1" fill={darkMode ? '#6b7280' : '#d1d5db'} opacity="0.6" />
        </g>

        {/* Construction site ground line */}
        <line 
          x1="0" 
          y1="185" 
          x2="400" 
          y2="185" 
          stroke={darkMode ? '#4b5563' : '#9ca3af'} 
          strokeWidth="2" 
          strokeDasharray="5,5" 
        />
      </svg>
    </div>
  );
}
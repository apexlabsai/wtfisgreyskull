'use client';

import { useState } from 'react';
import Image from 'next/image';

const archetypes = [
  {
    id: 'lean_athletic',
    name: 'Lean / Athletic',
    image: '/public/archetypes/lean.png',
    description: 'Toned, functional strength with endurance focus'
  },
  {
    id: 'bulky_powerlifter',
    name: 'Bulky / Powerlifter',
    image: '/public/archetypes/bulky.png',
    description: 'Maximum strength and power development'
  },
  {
    id: 'classic_bodybuilder',
    name: 'Classic Bodybuilder',
    image: '/public/archetypes/bodybuilder.png',
    description: 'Symmetrical muscle development and definition'
  },
  {
    id: 'kpop_aesthetic',
    name: 'K-pop Aesthetic',
    image: '/public/archetypes/kpop.png',
    description: 'Lean, modern fitness aesthetic'
  },
  {
    id: 'hollywood_superhero',
    name: 'Hollywood Superhero',
    image: '/public/archetypes/superhero.png',
    description: 'Camera-ready muscle mass and definition'
  }
];

export default function ArchetypeSelector({ selectedArchetype, onArchetypeChange }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Pick your fitness archetype
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {archetypes.map((archetype) => (
          <div
            key={archetype.id}
            onClick={() => onArchetypeChange(archetype.id)}
            className={`
              relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-lg
              ${selectedArchetype === archetype.id 
                ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {/* Image Container */}
            <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
              <Image
                src={archetype.image}
                alt={archetype.name}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to colored background if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback colored background */}
              <div 
                className="hidden w-full h-full items-center justify-center text-white font-semibold text-sm"
                style={{
                  background: `linear-gradient(135deg, ${
                    archetype.id === 'lean_athletic' ? '#10b981, #059669' :
                    archetype.id === 'bulky_powerlifter' ? '#8b4513, #a0522d' :
                    archetype.id === 'classic_bodybuilder' ? '#dc2626, #b91c1c' :
                    archetype.id === 'kpop_aesthetic' ? '#ec4899, #be185d' :
                    '#3b82f6, #1d4ed8'
                  })`
                }}
              >
                {archetype.name}
              </div>
            </div>
            
            {/* Label and Description */}
            <div className="p-3 bg-white rounded-b-lg">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {archetype.name}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {archetype.description}
              </p>
            </div>
            
            {/* Selection Indicator */}
            {selectedArchetype === archetype.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name="target"
        value={selectedArchetype}
        required
      />
    </div>
  );
}

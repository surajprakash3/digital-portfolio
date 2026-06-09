import React from 'react';
import Sun from './Sun';
import Planet from './Planet';

const planetsData = [
    { name: 'Skills', radius: 10, speed: 0.5, size: 0.8, color: '#A5A5A5' }, // Mercury
    { name: 'Projects', radius: 14, speed: 0.35, size: 1.2, color: '#E3BB76' }, // Venus
    { name: 'Experience', radius: 18, speed: 0.25, size: 1.3, color: '#2B82C9' }, // Earth
    { name: 'Certifications', radius: 22, speed: 0.2, size: 0.9, color: '#EF5B30' }, // Mars
    { name: 'Achievements', radius: 28, speed: 0.15, size: 2.5, color: '#D39C7E' }, // Jupiter
    { name: 'Leadership', radius: 34, speed: 0.12, size: 2.1, color: '#C5AB6E' }, // Saturn
    { name: 'Research', radius: 40, speed: 0.1, size: 1.5, color: '#B8D8D8' }, // Uranus
    { name: 'Contact', radius: 45, speed: 0.08, size: 1.4, color: '#3E54E8' }, // Neptune
];

const SolarSystem = ({ onPlanetClick }) => {
    return (
        <group>
            <Sun onClick={onPlanetClick} />
            {planetsData.map((planet) => (
                <Planet
                    key={planet.name}
                    {...planet}
                    onClick={onPlanetClick}
                />
            ))}
        </group>
    );
};

export default SolarSystem;

import React, { useState } from 'react';
import { MapPin, Users, Building, Home, Navigation, Filter } from 'lucide-react';

const LocationMap = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');

  const locations = [
    {
      id: 1,
      name: 'Oficina Principal',
      type: 'office',
      address: 'Av. Libertador 1234, CABA',
      coordinates: { lat: -34.6037, lng: -58.3816 },
      employeeCount: 15,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Sucursal Norte',
      type: 'branch',
      address: 'Av. Cabildo 5678, CABA',
      coordinates: { lat: -34.5601, lng: -58.4601 },
      employeeCount: 8,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Almacén',
      type: 'warehouse',
      address: 'Ruta 8 Km 45, Pilar',
      coordinates: { lat: -34.4587, lng: -58.9140 },
      employeeCount: 5,
      color: 'bg-orange-500'
    },
    {
      id: 4,
      name: 'Trabajo Remoto',
      type: 'remote',
      address: 'Ubicaciones Diversas',
      coordinates: { lat: -34.6118, lng: -58.3960 },
      employeeCount: 12,
      color: 'bg-purple-500'
    }
  ];

  const checkIns = [
    { id: 1, employee: 'María García', location: 'Oficina Principal', time: '08:45', coords: { lat: -34.6037, lng: -58.3816 } },
    { id: 2, employee: 'Carlos López', location: 'Trabajo Remoto', time: '09:00', coords: { lat: -34.6118, lng: -58.3960 } },
    { id: 3, employee: 'Ana Martínez', location: 'Sucursal Norte', time: '08:30', coords: { lat: -34.5601, lng: -58.4601 } },
    { id: 4, employee: 'Laura Fernández', location: 'Oficina Principal', time: '08:15', coords: { lat: -34.6037, lng: -58.3816 } },
    { id: 5, employee: 'Diego Sánchez', location: 'Oficina Principal', time: '09:45', coords: { lat: -34.6037, lng: -58.3816 } },
    { id: 6, employee: 'Carmen Ruiz', location: 'Trabajo Remoto', time: '08:50', coords: { lat: -34.6118, lng: -58.3960 } },
    { id: 7, employee: 'Roberto Jiménez', location: 'Almacén', time: '08:20', coords: { lat: -34.4587, lng: -58.9140 } },
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'office':
        return Building;
      case 'branch':
        return Building;
      case 'warehouse':
        return Building;
      case 'remote':
        return Home;
      default:
        return MapPin;
    }
  };

  const filteredCheckIns = selectedLocation === 'all' 
    ? checkIns 
    : checkIns.filter(checkIn => checkIn.location === selectedLocation);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mapa de Ubicaciones</h2>
          <p className="text-gray-600">Visualiza la ubicación de los empleados en tiempo real</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="all">Todas las ubicaciones</option>
            {locations.map(location => (
              <option key={location.id} value={location.name}>{location.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {locations.map((location) => {
          const Icon = getLocationIcon(location.type);
          return (
            <div key={location.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${location.color}`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{location.employeeCount}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{location.name}</h3>
              <p className="text-sm text-gray-600">{location.address}</p>
            </div>
          );
        })}
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 relative">
          {/* Simulated Map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Vista del Mapa</h3>
              <p className="text-gray-600">Mapa interactivo con ubicaciones en tiempo real</p>
            </div>
          </div>
          
          {/* Location Markers */}
          {locations.map((location, index) => (
            <div
              key={location.id}
              className={`absolute w-6 h-6 rounded-full ${location.color} shadow-lg border-2 border-white flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform`}
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`
              }}
              title={location.name}
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Check-ins */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Registros Recientes</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">En tiempo real</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredCheckIns.map((checkIn) => (
            <div key={checkIn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">
                    {checkIn.employee.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{checkIn.employee}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{checkIn.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{checkIn.time}</div>
                <div className="text-xs text-gray-500">
                  {checkIn.coords.lat.toFixed(4)}, {checkIn.coords.lng.toFixed(4)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center space-x-4">
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Navigation size={20} />
          <span>Centrar Mapa</span>
        </button>
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <Users size={20} />
          <span>Ver Todos</span>
        </button>
      </div>
    </div>
  );
};

export default LocationMap;
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Check, AlertCircle } from 'lucide-react';

const AttendanceCheck = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          setError('No se pudo obtener la ubicación. Verifica los permisos.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocalización no soportada en este navegador.');
      setLoading(false);
    }
  };

  const handleCheckIn = () => {
    if (!location) {
      getCurrentLocation();
      return;
    }

    setLoading(true);
    // Simular llamada a API
    setTimeout(() => {
      setIsCheckedIn(true);
      setCheckInTime(new Date().toLocaleTimeString());
      setLoading(false);
    }, 1000);
  };

  const handleCheckOut = () => {
    setLoading(true);
    // Simular llamada a API
    setTimeout(() => {
      setIsCheckedIn(false);
      setCheckInTime(null);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Registro de Asistencia</h2>
        <p className="text-gray-600">Registra tu entrada y salida con geolocalización</p>
      </div>

      {/* Current Status */}
      <div className={`rounded-lg p-6 text-center ${
        isCheckedIn 
          ? 'bg-green-50 border-2 border-green-200' 
          : 'bg-gray-50 border-2 border-gray-200'
      }`}>
        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
          isCheckedIn ? 'bg-green-500' : 'bg-gray-400'
        }`}>
          <Check size={32} className="text-white" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">
          {isCheckedIn ? 'Registrado' : 'No Registrado'}
        </h3>
        
        {checkInTime && (
          <p className="text-green-600 font-medium">
            Hora de entrada: {checkInTime}
          </p>
        )}
        
        <p className="text-sm text-gray-600 mt-2">
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Location Status */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <MapPin size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold">Ubicación Actual</h3>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2">
              <AlertCircle size={20} className="text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        {location ? (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">Ubicación obtenida</span>
              </div>
              <p className="text-sm text-gray-600">
                Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 font-medium mb-1">Oficina Principal</p>
              <p className="text-sm text-blue-600">
                Distancia: ~50 metros de la ubicación permitida
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Obteniendo ubicación...</p>
            <button
              onClick={getCurrentLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Obtener Ubicación
            </button>
          </div>
        )}
      </div>

      {/* Check In/Out Buttons */}
      <div className="space-y-4">
        {!isCheckedIn ? (
          <button
            onClick={handleCheckIn}
            disabled={loading || !location}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
              loading || !location
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Registrando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Clock size={20} />
                <span>Registrar Entrada</span>
              </div>
            )}
          </button>
        ) : (
          <button
            onClick={handleCheckOut}
            disabled={loading}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
              loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Registrando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Clock size={20} />
                <span>Registrar Salida</span>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AttendanceCheck;
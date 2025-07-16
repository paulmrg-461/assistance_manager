import React from 'react';
import { Users, Clock, MapPin, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Empleados Presentes', 
      value: '24', 
      total: '30',
      icon: Users, 
      color: 'bg-green-500',
      trend: '+2 desde ayer'
    },
    { 
      title: 'Llegadas Tardías', 
      value: '3', 
      total: '24',
      icon: Clock, 
      color: 'bg-orange-500',
      trend: '-1 desde ayer'
    },
    { 
      title: 'Registros Remotos', 
      value: '8', 
      total: '24',
      icon: MapPin, 
      color: 'bg-blue-500',
      trend: '+5 desde ayer'
    },
    { 
      title: 'Alertas Activas', 
      value: '2', 
      total: '',
      icon: AlertCircle, 
      color: 'bg-red-500',
      trend: 'Revisar ahora'
    },
  ];

  const recentActivity = [
    { name: 'María García', action: 'Entrada', time: '08:45', location: 'Oficina Principal' },
    { name: 'Carlos López', action: 'Salida', time: '17:30', location: 'Trabajo Remoto' },
    { name: 'Ana Martínez', action: 'Entrada', time: '09:15', location: 'Sucursal Norte' },
    { name: 'Pedro Rodríguez', action: 'Entrada', time: '08:30', location: 'Oficina Principal' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">¡Bienvenido al Sistema de Asistencia!</h2>
        <p className="text-blue-100">Gestiona la asistencia de tu equipo con geolocalización en tiempo real</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <TrendingUp size={16} className="text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  {stat.total && <span className="text-sm text-gray-500">/ {stat.total}</span>}
                </div>
                <p className="text-xs text-gray-500">{stat.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">
                    {activity.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{activity.name}</h4>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.action} - {activity.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Registrar Asistencia
            </button>
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Generar Reporte
            </button>
            <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium">
              Configurar Alertas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
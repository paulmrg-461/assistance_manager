import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Download, Filter } from 'lucide-react';

const AttendanceHistory = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedEmployee, setSelectedEmployee] = useState('all');

  const attendanceRecords = [
    {
      id: 1,
      employeeName: 'María García',
      date: '2024-01-15',
      checkIn: '08:45',
      checkOut: '17:30',
      location: 'Oficina Principal',
      status: 'present',
      hoursWorked: 8.75
    },
    {
      id: 2,
      employeeName: 'Carlos López',
      date: '2024-01-15',
      checkIn: '09:00',
      checkOut: '18:00',
      location: 'Trabajo Remoto',
      status: 'remote',
      hoursWorked: 9.0
    },
    {
      id: 3,
      employeeName: 'Ana Martínez',
      date: '2024-01-15',
      checkIn: '08:30',
      checkOut: '17:15',
      location: 'Sucursal Norte',
      status: 'present',
      hoursWorked: 8.75
    },
    {
      id: 4,
      employeeName: 'Pedro Rodríguez',
      date: '2024-01-15',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'absent',
      hoursWorked: 0
    },
    {
      id: 5,
      employeeName: 'Laura Fernández',
      date: '2024-01-15',
      checkIn: '08:15',
      checkOut: '17:00',
      location: 'Oficina Principal',
      status: 'present',
      hoursWorked: 8.75
    },
    {
      id: 6,
      employeeName: 'Diego Sánchez',
      date: '2024-01-15',
      checkIn: '09:45',
      checkOut: '18:30',
      location: 'Oficina Principal',
      status: 'late',
      hoursWorked: 8.75
    },
    {
      id: 7,
      employeeName: 'Carmen Ruiz',
      date: '2024-01-14',
      checkIn: '08:50',
      checkOut: '17:45',
      location: 'Trabajo Remoto',
      status: 'remote',
      hoursWorked: 8.92
    },
    {
      id: 8,
      employeeName: 'Roberto Jiménez',
      date: '2024-01-14',
      checkIn: '08:20',
      checkOut: '17:10',
      location: 'Almacén',
      status: 'present',
      hoursWorked: 8.83
    }
  ];

  const employees = [...new Set(attendanceRecords.map(record => record.employeeName))];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-orange-100 text-orange-800';
      case 'remote':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present':
        return 'Presente';
      case 'absent':
        return 'Ausente';
      case 'late':
        return 'Tardío';
      case 'remote':
        return 'Remoto';
      default:
        return 'Desconocido';
    }
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesEmployee = selectedEmployee === 'all' || record.employeeName === selectedEmployee;
    const matchesDate = !selectedDate || record.date === selectedDate;
    return matchesEmployee && matchesDate;
  });

  const totalHours = filteredRecords.reduce((sum, record) => sum + record.hoursWorked, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Historial de Asistencia</h2>
          <p className="text-gray-600">Revisa los registros de asistencia del equipo</p>
        </div>
        
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={20} />
          <span>Exportar</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <div className="relative">
              <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Empleado
            </label>
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="all">Todos los empleados</option>
                {employees.map(employee => (
                  <option key={employee} value={employee}>{employee}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total de Registros</h3>
          <p className="text-2xl font-bold text-gray-900">{filteredRecords.length}</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Horas Trabajadas</h3>
          <p className="text-2xl font-bold text-gray-900">{totalHours.toFixed(1)}h</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Promedio por Empleado</h3>
          <p className="text-2xl font-bold text-gray-900">
            {filteredRecords.length > 0 ? (totalHours / filteredRecords.length).toFixed(1) : 0}h
          </p>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empleado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entrada
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salida
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horas
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-sm font-medium">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {record.employeeName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkIn ? (
                      <div className="flex items-center space-x-1">
                        <Clock size={14} className="text-green-500" />
                        <span>{record.checkIn}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkOut ? (
                      <div className="flex items-center space-x-1">
                        <Clock size={14} className="text-red-500" />
                        <span>{record.checkOut}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.location ? (
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} className="text-blue-500" />
                        <span>{record.location}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(record.status)}`}>
                      {getStatusLabel(record.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.hoursWorked > 0 ? `${record.hoursWorked}h` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron registros</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;
import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const employees = [
    {
      id: 1,
      name: 'María García',
      department: 'Desarrollo',
      status: 'present',
      checkIn: '08:45',
      location: 'Oficina Principal',
      avatar: 'MG'
    },
    {
      id: 2,
      name: 'Carlos López',
      department: 'Marketing',
      status: 'remote',
      checkIn: '09:00',
      location: 'Trabajo Remoto',
      avatar: 'CL'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      department: 'Ventas',
      status: 'present',
      checkIn: '08:30',
      location: 'Sucursal Norte',
      avatar: 'AM'
    },
    {
      id: 4,
      name: 'Pedro Rodríguez',
      department: 'RRHH',
      status: 'absent',
      checkIn: null,
      location: null,
      avatar: 'PR'
    },
    {
      id: 5,
      name: 'Laura Fernández',
      department: 'Contabilidad',
      status: 'present',
      checkIn: '08:15',
      location: 'Oficina Principal',
      avatar: 'LF'
    },
    {
      id: 6,
      name: 'Diego Sánchez',
      department: 'Desarrollo',
      status: 'late',
      checkIn: '09:45',
      location: 'Oficina Principal',
      avatar: 'DS'
    },
    {
      id: 7,
      name: 'Carmen Ruiz',
      department: 'Diseño',
      status: 'remote',
      checkIn: '08:50',
      location: 'Trabajo Remoto',
      avatar: 'CR'
    },
    {
      id: 8,
      name: 'Roberto Jiménez',
      department: 'Operaciones',
      status: 'present',
      checkIn: '08:20',
      location: 'Almacén',
      avatar: 'RJ'
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'present':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Presente' };
      case 'absent':
        return { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Ausente' };
      case 'late':
        return { color: 'bg-orange-100 text-orange-800', icon: Clock, label: 'Tardío' };
      case 'remote':
        return { color: 'bg-blue-100 text-blue-800', icon: MapPin, label: 'Remoto' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Desconocido' };
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || employee.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: employees.length,
    present: employees.filter(e => e.status === 'present').length,
    absent: employees.filter(e => e.status === 'absent').length,
    late: employees.filter(e => e.status === 'late').length,
    remote: employees.filter(e => e.status === 'remote').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lista de Empleados</h2>
          <p className="text-gray-600">Gestiona el estado de asistencia de tu equipo</p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar empleado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="all">Todos ({statusCounts.all})</option>
              <option value="present">Presentes ({statusCounts.present})</option>
              <option value="absent">Ausentes ({statusCounts.absent})</option>
              <option value="late">Tardíos ({statusCounts.late})</option>
              <option value="remote">Remotos ({statusCounts.remote})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => {
          const statusInfo = getStatusInfo(employee.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <div key={employee.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{employee.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.department}</p>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                  <div className="flex items-center space-x-1">
                    <StatusIcon size={12} />
                    <span>{statusInfo.label}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {employee.checkIn && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock size={14} />
                    <span>Entrada: {employee.checkIn}</span>
                  </div>
                )}
                
                {employee.location && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{employee.location}</span>
                  </div>
                )}
                
                {employee.status === 'absent' && (
                  <div className="text-sm text-red-600 font-medium">
                    No ha registrado asistencia
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron empleados</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
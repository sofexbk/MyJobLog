'use client';

import { Candidature, User } from '@/app/types';

interface Props {
  candidature: Candidature;
  user: User | null;
  onEdit: (candidature: Candidature) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}

export default function CandidatureCard({
  candidature,
  user,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      ENVOYE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      ACCEPTE: 'bg-green-100 text-green-800 border-green-200',
      REFUSE: 'bg-red-100 text-red-800 border-red-200',
      ENTRETIEN: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      ENVOYE: 'En attente',
      ACCEPTE: 'Acceptée',
      REFUSE: 'Refusée',
      ENTRETIEN: 'Entretien',
    };
    return labels[status] || status;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 flex-1">
          {candidature.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(candidature.status)}`}>
          {getStatusLabel(candidature.status)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-gray-700 flex items-center">
          <span className="mr-2">🏢</span>
          <span className="font-medium">{candidature.company}</span>
        </p>
        <p className="text-gray-600 flex items-center text-sm">
          <span className="mr-2">📅</span>
          {new Date(candidature.dateApplied).toLocaleDateString('fr-FR')}
        </p>
      </div>

      {candidature.note && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 bg-gray-50 p-3 rounded">
          {candidature.note}
        </p>
      )}

      {user?.role === 'ADMIN' && (
        <div className="mb-3">
          <label className="block text-xs text-gray-600 mb-1 font-medium">
            Changer le statut (Admin)
          </label>
          <select
            value={candidature.status}
            onChange={(e) => onStatusChange(candidature.id!, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ENVOYE">En attente</option>
            <option value="ENTRETIEN">Entretien</option>
            <option value="ACCEPTE">Acceptée</option>
            <option value="REFUSE">Refusée</option>
          </select>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(candidature)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          ✏️ Modifier
        </button>
        <button
          onClick={() => onDelete(candidature.id!)}
          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
        >
          🗑️ Supprimer
        </button>
      </div>
    </div>
  );
}
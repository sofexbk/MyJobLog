'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import CandidatureModal from '@/app/components/CandidatureModal';
import CandidatureCard from '@/app/components/CandidatureCard';
import { candidatureService } from '@/app/services/candidatureService';
import { authService } from '@/app/services/authService';
import { useAuth } from '@/app/context/AuthContext';
import { Candidature } from '@/app/types';

function DashboardContent() {
  const { user } = useAuth();
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [filteredCandidatures, setFilteredCandidatures] = useState<Candidature[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Candidature>({
    title: '',
    company: '',
    status: 'EN_ATTENTE',
    dateApplied: new Date().toISOString().split('T')[0],
    link: '',
    note: '',
  });

  const loadCandidatures = async () => {
    try {
      setLoading(true);
      const data = user?.role === 'ADMIN' 
        ? await candidatureService.getAll()
        : await candidatureService.getMyCandidatures();
      setCandidatures(data);
      setFilteredCandidatures(data);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidatures();
  }, [user]);

  useEffect(() => {
    let filtered = candidatures;

    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(c => c.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCandidatures(filtered);
  }, [filterStatus, searchTerm, candidatures]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await candidatureService.update(editingId, formData);
      } else {
        await candidatureService.create(formData);
      }
      setShowModal(false);
      resetForm();
      loadCandidatures();
    } catch (err: any) {
      console.error('Erreur:', err);
      alert(err.response?.data || 'Une erreur est survenue');
    }
  };

  const handleEdit = (candidature: Candidature) => {
    setFormData(candidature);
    setEditingId(candidature.id!);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      try {
        await candidatureService.delete(id);
        loadCandidatures();
      } catch (err: any) {
        console.error('Erreur:', err);
        alert(err.response?.data || 'Erreur lors de la suppression');
      }
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await candidatureService.updateStatus(id, status);
      loadCandidatures();
    } catch (err: any) {
      console.error('Erreur:', err);
      alert(err.response?.data || 'Erreur lors de la mise à jour du statut');
    }
  };

  const resetForm = () => {
    setFormData({
    title: '',
    company: '',
    status: 'EN_ATTENTE',
    dateApplied: new Date().toISOString().split('T')[0],
    link: '',
    note: '',
    });
    setEditingId(null);
  };

  const getStats = () => {
    return {
      total: candidatures.length,
      enAttente: candidatures.filter(c => c.status === 'EN_ATTENTE').length,
      entretien: candidatures.filter(c => c.status === 'ENTRETIEN').length,
      acceptees: candidatures.filter(c => c.status === 'ACCEPTEE').length,
      refusees: candidatures.filter(c => c.status === 'REFUSEE').length,
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                📋 Mes Candidatures
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-600">Bienvenue,</span>
                <span className="font-semibold text-gray-900 ml-1">
                  {user?.username}
                </span>
                {user?.role === 'ADMIN' && (
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-semibold">
                    ADMIN
                  </span>
                )}
              </div>
              <button
                onClick={() => authService.logout()}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
              >
                🚪 Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 mb-1">Total</div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="bg-yellow-50 rounded-lg shadow p-4 border border-yellow-200">
              <div className="text-sm text-yellow-800 mb-1">En attente</div>
              <div className="text-2xl font-bold text-yellow-900">{stats.enAttente}</div>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-4 border border-blue-200">
              <div className="text-sm text-blue-800 mb-1">Entretien</div>
              <div className="text-2xl font-bold text-blue-900">{stats.entretien}</div>
            </div>
            <div className="bg-green-50 rounded-lg shadow p-4 border border-green-200">
              <div className="text-sm text-green-800 mb-1">Acceptées</div>
              <div className="text-2xl font-bold text-green-900">{stats.acceptees}</div>
            </div>
            <div className="bg-red-50 rounded-lg shadow p-4 border border-red-200">
              <div className="text-sm text-red-800 mb-1">Refusées</div>
              <div className="text-2xl font-bold text-red-900">{stats.refusees}</div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => { resetForm(); setShowModal(true); }}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium transition-colors flex items-center justify-center"
              >
                ➕ Nouvelle Candidature
              </button>

              <input
                type="text"
                placeholder="🔍 Rechercher (poste, entreprise)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">📊 Tous les statuts</option>
                <option value="EN_ATTENTE">⏳ En attente</option>
                <option value="ENTRETIEN">💼 Entretien</option>
                <option value="ACCEPTEE">✅ Acceptée</option>
                <option value="REFUSEE">❌ Refusée</option>
              </select>
            </div>
          </div>

          {/* Candidatures List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Chargement des candidatures...</p>
            </div>
          ) : filteredCandidatures.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 text-lg font-medium">
                {searchTerm || filterStatus !== 'ALL' 
                  ? 'Aucune candidature ne correspond à vos critères' 
                  : 'Aucune candidature pour le moment'}
              </p>
              {!searchTerm && filterStatus === 'ALL' && (
                <button
                  onClick={() => { resetForm(); setShowModal(true); }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Créer votre première candidature →
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCandidatures.map((candidature) => (
                <CandidatureCard
                  key={candidature.id}
                  candidature={candidature}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <CandidatureModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditing={!!editingId}
      />
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
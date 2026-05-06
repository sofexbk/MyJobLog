'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Candidature } from '@/app/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  formData: Candidature;
  setFormData: (data: Candidature) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

export default function CandidatureModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isEditing,
}: Props) {

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-50 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto animate-fadeIn">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditing ? 'Modifier la candidature' : 'Nouvelle candidature'}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>

            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Poste"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Entreprise"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="EN_ATTENTE">En attente</option>
            <option value="ENTRETIEN">Entretien</option>
            <option value="ACCEPTE">Acceptée</option>
            <option value="REFUSE">Refusée</option>
          </select>
          </div>

          <div>
          <input
            type="date"
            required
            value={formData.dateApplied}
            onChange={(e) => setFormData({ ...formData, dateApplied: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          </div>

          <div>
          <input
            type="url"
            value={formData.link || ''}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="Lien (optionnel)"
            className="w-full px-3 py-2 border rounded-md"
          />

          </div>

          <div>
         <textarea
            value={formData.note || ''}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            placeholder="Notes"
            rows={3}
            className="w-full px-3 py-2 border rounded-md"
          />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-2 rounded-md hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {isEditing ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
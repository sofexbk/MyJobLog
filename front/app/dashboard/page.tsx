"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface Candidature {
  id: number;
  title: string;
  company: string;
  status: string;
  link: string;
  note: string;
}

export default function Dashboard() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);

  useEffect(() => {
    api.get("/candidatures/me").then((res) => setCandidatures(res.data));
  }, []);

  const deleteCandidature = async (id: number) => {
    await api.delete(`/candidatures/${id}`);
    setCandidatures(candidatures.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes candidatures</h1>
      <ul>
        {candidatures.map((c) => (
          <li key={c.id} className="border-b py-2 flex justify-between">
            <div>
              <strong>{c.title}</strong> chez {c.company} — {c.status}
            </div>
            <button
              onClick={() => deleteCandidature(c.id)}
              className="text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

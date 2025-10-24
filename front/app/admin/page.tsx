"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function AdminPage() {
  const [allCandidatures, setAllCandidatures] = useState([]);

  useEffect(() => {
    api.get("/candidatures/all").then((res) => setAllCandidatures(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Toutes les candidatures (Admin)</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Utilisateur</th>
            <th className="p-2 border">Poste</th>
            <th className="p-2 border">Entreprise</th>
            <th className="p-2 border">Statut</th>
          </tr>
        </thead>
        <tbody>
          {allCandidatures.map((c: any) => (
            <tr key={c.id}>
              <td className="p-2 border">{c.userEmail}</td>
              <td className="p-2 border">{c.title}</td>
              <td className="p-2 border">{c.company}</td>
              <td className="p-2 border">{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

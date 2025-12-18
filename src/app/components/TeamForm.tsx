"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Team } from "@/types/Interfaces/ITeam";

interface TeamFormProps {
  initialData: Team;
}

export default function TeamForm({ initialData }: TeamFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData.name,
    city: initialData.city || "",
    state: initialData.state || "",
    foundedYear: initialData.foundedYear || "",
    logoUrl: initialData.logoUrl || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/teams/${initialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          foundedYear: formData.foundedYear ? parseInt(formData.foundedYear.toString()) : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update team");
      }

      router.push("/teams");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
          {error}
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
          Team Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-zinc-800/50 bg-zinc-950/50 px-4 py-3 text-zinc-100 placeholder-zinc-600 backdrop-blur-sm transition-all duration-300 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
        />
      </div>

      {/* City & State */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-zinc-300">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-800/50 bg-zinc-950/50 px-4 py-3 text-zinc-100 placeholder-zinc-600 backdrop-blur-sm transition-all duration-300 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="state" className="block text-sm font-medium text-zinc-300">
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-800/50 bg-zinc-950/50 px-4 py-3 text-zinc-100 placeholder-zinc-600 backdrop-blur-sm transition-all duration-300 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
          />
        </div>
      </div>

      {/* Founded Year */}
      <div className="space-y-2">
        <label htmlFor="foundedYear" className="block text-sm font-medium text-zinc-300">
          Founded Year
        </label>
        <input
          id="foundedYear"
          name="foundedYear"
          type="number"
          value={formData.foundedYear}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-800/50 bg-zinc-950/50 px-4 py-3 text-zinc-100 placeholder-zinc-600 backdrop-blur-sm transition-all duration-300 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
        />
      </div>

      {/* Logo URL */}
      <div className="space-y-2">
        <label htmlFor="logoUrl" className="block text-sm font-medium text-zinc-300">
          Logo URL
        </label>
        <input
          id="logoUrl"
          name="logoUrl"
          type="url"
          value={formData.logoUrl}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-800/50 bg-zinc-950/50 px-4 py-3 text-zinc-100 placeholder-zinc-600 backdrop-blur-sm transition-all duration-300 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-zinc-800 to-zinc-900 px-6 py-3 font-semibold text-zinc-100 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(100,100,100,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-linear-to-r from-zinc-700 via-slate-600 to-zinc-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative z-10">
          {isLoading ? "Saving..." : "Save Changes"}
        </span>
      </button>
    </form>
  );
}

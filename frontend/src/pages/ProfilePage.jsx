import React, { useEffect, useState } from 'react';
import { getStoredProfile, saveStoredProfile } from '../utils/storage';
import PageHeader from '../components/PageHeader';

const ProfilePage = ({ user, onProfileUpdated, onNotify }) => {
  const [profile, setProfile] = useState(getStoredProfile());

  useEffect(() => {
    const storedProfile = getStoredProfile();
    setProfile(storedProfile);
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    saveStoredProfile(profile);
    onProfileUpdated?.(profile);
    onNotify?.('Profile updated successfully.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Profile"
        title="Manage your professional identity"
        description="Update your profile information and keep your workspace aligned with your team identity."
      />

      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-[24px] border border-blue-100 bg-white/80 p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-semibold text-white">
              {profile.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{profile.name || 'Reliability Engineer'}</h3>
              <p className="text-sm text-slate-500">{profile.email || 'profile@company.com'}</p>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-blue-50 p-3">Login time: {profile.loginTime || 'Available after login'}</div>
            <div className="rounded-2xl bg-slate-50 p-3">Total analyses: {user?.analysisCount || 0}</div>
            <div className="rounded-2xl bg-slate-50 p-3">Reports generated: {user?.reportCount || 0}</div>
          </div>
        </div>

        <form onSubmit={handleSave} className="rounded-[24px] border border-blue-100 bg-white/80 p-6 shadow-lg">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <input value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" value={profile.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">Avatar URL</label>
            <input value={profile.avatar || ''} onChange={(e) => setProfile({ ...profile, avatar: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="https://..." />
          </div>
          <button type="submit" className="mt-6 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

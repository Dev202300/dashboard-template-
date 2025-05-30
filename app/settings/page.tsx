"use client";

import { useState } from "react";
import { UserIcon, BellIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 pb-2">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>
        <div className="p-6 space-y-8">
          {/* Profile Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <UserIcon className="h-6 w-6 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="block w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className="block w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Account Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <LockClosedIcon className="h-6 w-6 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Account Security</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={password.current}
                  onChange={e => setPassword({ ...password, current: e.target.value })}
                  className="block w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={password.new}
                  onChange={e => setPassword({ ...password, new: e.target.value })}
                  className="block w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={password.confirm}
                  onChange={e => setPassword({ ...password, confirm: e.target.value })}
                  className="block w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <BellIcon className="h-6 w-6 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={e => setNotifications({ ...notifications, email: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Email Notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={e => setNotifications({ ...notifications, sms: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">SMS Notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={e => setNotifications({ ...notifications, push: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Push Notifications</span>
              </label>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
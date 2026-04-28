/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import OracleDashboard from './components/OracleDashboard';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [view, setView] = useState<'public' | 'admin'>('public');

  return (
    <div className="relative">
      {view === 'public' ? (
        <>
          <OracleDashboard />
          {/* Subtle Dev Admin Entry */}
          <button 
            onClick={() => setView('admin')}
            className="fixed bottom-4 right-4 text-[8px] text-white/5 hover:text-oracle-blue/40 font-mono transition-colors uppercase"
          >
            Terminal_Admin
          </button>
        </>
      ) : (
        <AdminDashboard onBack={() => setView('public')} />
      )}
    </div>
  );
}

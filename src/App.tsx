import { useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import VipPackages from './components/VipPackages';
import Rules from './components/Rules';
import Footer from './components/Footer';
import PurchaseModal from './components/PurchaseModal';
import { VipPackage } from './lib/supabase';

function App() {
  const [selectedPackage, setSelectedPackage] = useState<VipPackage | null>(null);

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <Features />
      <VipPackages onPurchase={setSelectedPackage} />
      <Rules />
      <Footer />

      {selectedPackage && (
        <PurchaseModal
          package={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
}

export default App;

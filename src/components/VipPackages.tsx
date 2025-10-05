import { useState, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { supabase, VipPackage } from '../lib/supabase';

interface VipPackagesProps {
  onPurchase: (pkg: VipPackage) => void;
}

export default function VipPackages({ onPurchase }: VipPackagesProps) {
  const [packages, setPackages] = useState<VipPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('vip_packages')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error loading packages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 py-20" id="vip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Pacotes VIP</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Torne-se VIP
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Aproveite benefícios exclusivos e destaque-se no servidor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const isPopular = index === 1;
            return (
              <div
                key={pkg.id}
                className={`relative bg-slate-900 border-2 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 ${
                  isPopular
                    ? 'border-green-500 shadow-2xl shadow-green-500/20 scale-105'
                    : 'border-slate-700 hover:border-green-500/50'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ backgroundColor: `${pkg.color}20` }}
                  >
                    <Sparkles className="w-8 h-8" style={{ color: pkg.color }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-slate-400 text-xl">R$</span>
                    <span className="text-5xl font-bold text-white">
                      {pkg.price.toFixed(2).split('.')[0]}
                    </span>
                    <span className="text-2xl text-slate-400">
                      ,{pkg.price.toFixed(2).split('.')[1]}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-2">
                    por {pkg.duration_days} dias
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: `${pkg.color}20` }}
                      >
                        <Check className="w-3 h-3" style={{ color: pkg.color }} />
                      </div>
                      <span className="text-slate-300 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onPurchase(pkg)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isPopular
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  Adquirir Agora
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Todos os pagamentos são processados de forma segura. VIP ativado automaticamente após confirmação.
          </p>
        </div>
      </div>
    </div>
  );
}

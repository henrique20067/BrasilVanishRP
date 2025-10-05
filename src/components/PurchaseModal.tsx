import { useState } from 'react';
import { X, CreditCard, Smartphone } from 'lucide-react';
import { supabase, VipPackage } from '../lib/supabase';

interface PurchaseModalProps {
  package: VipPackage | null;
  onClose: () => void;
}

export default function PurchaseModal({ package: pkg, onClose }: PurchaseModalProps) {
  const [playerName, setPlayerName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!pkg) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + pkg.duration_days);

      const { error } = await supabase.from('purchases').insert({
        package_id: pkg.id,
        player_name: playerName,
        email: email,
        amount: pkg.price,
        status: 'pending',
        payment_method: paymentMethod,
        expires_at: expiresAt.toISOString(),
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error creating purchase:', error);
      alert('Erro ao processar compra. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pedido Recebido!</h3>
            <p className="text-slate-400">
              Você receberá as instruções de pagamento no email fornecido.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white mb-6">Finalizar Compra</h3>

            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400">Pacote</span>
                <span className="text-white font-semibold">{pkg.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Valor</span>
                <span className="text-2xl font-bold text-green-400">
                  R$ {pkg.price.toFixed(2)}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Nome no Servidor
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Seu nome RP no servidor"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-3">
                  Método de Pagamento
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-slate-700 bg-slate-800'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="font-semibold">PIX</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-slate-700 bg-slate-800'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="font-semibold">Cartão</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Processando...' : 'Confirmar Compra'}
              </button>
            </form>

            <p className="text-slate-500 text-xs text-center mt-4">
              Ao continuar, você concorda com nossos termos de serviço
            </p>
          </>
        )}
      </div>
    </div>
  );
}

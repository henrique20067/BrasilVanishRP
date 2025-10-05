import { Play, Users, Trophy } from 'lucide-react';

export default function Hero() {
  const connectIP = 'vanishrp.play.srv.br:22023';
  const directIP = 'mtasa://149.56.41.55:22023';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2097628/pexels-photo-2097628.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Servidor Online</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Brasil Vanish
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            Roleplay
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Viva a experiência mais realista de GTA Roleplay no Brasil.
          Construa sua história, faça conexões reais e domine as ruas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => copyToClipboard(connectIP)}
            className="group flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30"
          >
            <Play className="w-6 h-6" />
            Conectar Agora
          </button>
          <button
            onClick={() => window.location.href = directIP}
            className="flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Conexão Direta
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-4 mx-auto">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">200+</h3>
            <p className="text-slate-400">Jogadores Ativos</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-4 mx-auto">
              <Trophy className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">RP Real</h3>
            <p className="text-slate-400">Experiência Autêntica</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-4 mx-auto">
              <Play className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
            <p className="text-slate-400">Sempre Online</p>
          </div>
        </div>

        <div className="mt-12 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-slate-400 text-sm mb-2">IP de Conexão</p>
          <code className="text-green-400 text-lg font-mono">{connectIP}</code>
        </div>
      </div>
    </div>
  );
}

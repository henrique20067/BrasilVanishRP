import { Briefcase, Car, Home, ShieldCheck, Users, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Briefcase,
      title: 'Empregos Realistas',
      description: 'Trabalhe como policial, médico, mecânico, taxista e muito mais. Cada profissão com mecânicas únicas.',
      color: 'text-blue-400'
    },
    {
      icon: Car,
      title: 'Veículos Exclusivos',
      description: 'Mais de 300 veículos customizados. Compre, venda e personalize carros de luxo e motos.',
      color: 'text-purple-400'
    },
    {
      icon: Home,
      title: 'Propriedades',
      description: 'Adquira casas, apartamentos e empresas. Construa seu império imobiliário.',
      color: 'text-orange-400'
    },
    {
      icon: Users,
      title: 'Organizações',
      description: 'Crie ou participe de facções, empresas e grupos. Domine territórios e ganhe influência.',
      color: 'text-green-400'
    },
    {
      icon: ShieldCheck,
      title: 'Staff Ativo',
      description: 'Equipe experiente e dedicada, disponível 24/7 para garantir a melhor experiência.',
      color: 'text-red-400'
    },
    {
      icon: Zap,
      title: 'Atualizações Constantes',
      description: 'Novos conteúdos, eventos e melhorias semanais. Sempre há algo novo para descobrir.',
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Por Que Brasil Vanish?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Oferecemos a experiência mais completa e imersiva de roleplay no Brasil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-slate-900/50 rounded-lg mb-6 ${feature.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

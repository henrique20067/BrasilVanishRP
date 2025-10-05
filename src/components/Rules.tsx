import { Shield, AlertCircle, Users, MessageCircle } from 'lucide-react';

export default function Rules() {
  const rules = [
    {
      icon: Shield,
      title: 'Respeito Sempre',
      description: 'Trate todos os jogadores com respeito. Toxicidade, racismo e discriminação resultam em ban permanente.',
    },
    {
      icon: AlertCircle,
      title: 'RP de Qualidade',
      description: 'Mantenha o roleplay realista. Evite ações sem sentido ou que quebrem a imersão do servidor.',
    },
    {
      icon: Users,
      title: 'Trabalho em Equipe',
      description: 'Valorize a interação com outros jogadores. O servidor é construído pela comunidade.',
    },
    {
      icon: MessageCircle,
      title: 'Suporte Ativo',
      description: 'Dúvidas ou problemas? Nossa equipe está sempre disponível para ajudar no Discord.',
    },
  ];

  return (
    <div className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Regras e Comunidade
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Um ambiente saudável e divertido para todos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {rules.map((rule, index) => {
            const Icon = rule.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {rule.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {rule.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Entrar no Discord
          </a>
        </div>
      </div>
    </div>
  );
}

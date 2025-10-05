import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-slate-400 mb-2">
            © 2025 Brasil Vanish Roleplay. Todos os direitos reservados.
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>para a comunidade brasileira de GTA</span>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-slate-600 text-xs">
              mtasa://149.56.41.55:22023 | vanishrp.play.srv.br:22023
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

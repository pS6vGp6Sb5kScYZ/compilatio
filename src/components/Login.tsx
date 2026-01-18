import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FileCheck2 } from 'lucide-react';

// --- AJOUT : ÉLÉMENTS DE DÉCORATION EN BACKGROUND ---
const BackgroundDecorations = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    {/* Logo Word - Haut Gauche */}
    <i className="fa-solid fa-file-word text-blue-500/10 text-8xl absolute -rotate-12 top-[10%] left-[5%]"></i>
    
    {/* Logo PDF - Milieu Droite */}
    <i className="fa-solid fa-file-pdf text-red-500/10 text-9xl absolute rotate-12 top-[35%] right-[5%]"></i>
    
    {/* Logo Texte - Bas Gauche */}
    <i className="fa-solid fa-file-lines text-gray-500/10 text-7xl absolute -rotate-6 bottom-[10%] left-[8%]"></i>
    
    {/* Logo Excel - Haut Droite */}
    <i className="fa-solid fa-file-excel text-green-500/10 text-8xl absolute rotate-[20deg] top-[5%] right-[12%]"></i>
    
    {/* Logo Code/Doc - Bas Centre/Droit */}
    <i className="fa-solid fa-file-code text-cyan-500/10 text-9xl absolute -rotate-12 bottom-[15%] right-[15%]"></i>
  </div>
);

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4 relative">
      
      {/* BACKGROUND LOGOS */}
      <BackgroundDecorations />

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <FileCheck2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">PlagDetect</h1>
          <p className="text-gray-600 font-medium">Détection de plagiat intelligente</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                !isSignUp
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                isSignUp
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner animate-spin"></i> Chargement...
                </span>
              ) : isSignUp ? "Créer un compte" : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8 font-medium">
          Protégez l'intégrité de vos documents avec notre technologie avancée
        </p>
      </div>
    </div>
  );
}
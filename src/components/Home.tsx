import { useState, useRef } from 'react';
import { Upload, FileText, X, FileCheck2, ChevronDown, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface HomeProps {
  onAnalysisStart: (documentId: string) => void;
}

// --- AJOUT : ÉLÉMENTS DE DÉCORATION EN BACKGROUND ---
const BackgroundDecorations = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    {/* Logo Word - Haut Gauche */}
    <i className="fa-solid fa-file-word text-blue-500/10 text-8xl absolute -rotate-12 top-[15%] left-[5%]"></i>
    
    {/* Logo PDF - Milieu Droite */}
    <i className="fa-solid fa-file-pdf text-red-500/10 text-9xl absolute rotate-12 top-[45%] right-[8%]"></i>
    
    {/* Logo Texte - Bas Gauche */}
    <i className="fa-solid fa-file-lines text-gray-500/10 text-7xl absolute -rotate-6 bottom-[15%] left-[10%]"></i>
    
    {/* Logo Excel - Haut Droite */}
    <i className="fa-solid fa-file-excel text-green-500/10 text-8xl absolute rotate-[20deg] top-[10%] right-[15%]"></i>
    
    {/* Logo Code/Doc - Bas Centre/Droit */}
    <i className="fa-solid fa-file-code text-cyan-500/10 text-9xl absolute -rotate-12 bottom-[10%] right-[20%]"></i>
  </div>
);

// --- COMPOSANT FAQ ---
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons toutes les principales cartes de crédit (Visa, Mastercard, American Express), PayPal, et les virements bancaires pour les entreprises. Tous les paiements sont sécurisés et cryptés selon les normes PCI DSS."
    },
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer: "Oui, absolument ! Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. Il n'y a aucun frais d'annulation et vous conserverez l'accès jusqu'à la fin de votre période de facturation en cours. Vos données seront conservées pendant 30 jours au cas où vous changeriez d'avis."
    },
    {
      question: "Proposez-vous un essai gratuit ?",
      answer: "Oui ! Nous offrons un essai gratuit de 14 jours sans carte de crédit requise. Vous aurez accès à toutes les fonctionnalités premium pendant cette période. À la fin de l'essai, vous pouvez choisir le plan qui vous convient ou continuer avec notre plan gratuit."
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-gray-600 bg-gray-100 rounded-full border border-gray-200">
          Support
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Questions Fréquentes</h2>
        <p className="text-xl text-gray-600">Trouvez rapidement des réponses à vos questions.</p>
      </div>

      <div className="mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all shadow-sm"
          />
          <svg
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- COMPOSANT TÉMOIGNAGES (MODIFIÉ POUR PLEINE LARGEUR) ---
function Testimonials() {
  const testimonials = [
    {
      name: 'Sophie Martin',
      role: 'Étudiante',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'Un outil indispensable pour vérifier mes mémoires avant le rendu final. Très précis !',
      rating: 5,
    },
    {
      name: 'Marc Dubois',
      role: 'Enseignant',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'Interface intuitive et rapports clairs. Cela me fait gagner un temps précieux dans mes corrections.',
      rating: 5,
    },
    {
      name: 'Claire Lemoine',
      role: 'Rédactrice Web',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'La détection de paraphrases est impressionnante. La sécurité de mes documents est aussi un grand plus.',
      rating: 5,
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative z-10 w-screen ml-[50%] -translate-x-1/2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Témoignages</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-4">Ils nous font confiance</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-100" />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">"{t.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- COMPOSANT PRINCIPAL HOME ---
export default function Home({ onAnalysisStart }: HomeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.name.endsWith('.txt')) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Veuillez sélectionner un fichier texte (.txt)');
    }
  };

  const handleAnalyze = async () => {
    if (!file || !user) return;
    setUploading(true);
    try {
      const content = await file.text();
      const { data, error: insertError } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          filename: file.name,
          file_size: file.size,
          content: content,
          status: 'pending'
        })
        .select().single();

      if (insertError) throw insertError;
      onAnalysisStart(data.id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 font-sans relative overflow-x-hidden">
      
      {/* BACKGROUND LOGOS */}
      <BackgroundDecorations />

      {/* 1. BARRE DE NAVIGATION (FIXE ET PLEINE LARGEUR) */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <FileCheck2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">PlagDetect</span>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => onAnalysisStart('')}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-semibold"
              >
                <i className="fa-solid fa-chart-line text-lg"></i>
                <span className="hidden sm:inline">Tableau de bord</span>
              </button>

              <span className="text-gray-200 text-xl font-light">|</span>
              
              <span className="hidden lg:inline text-sm text-gray-500 font-medium">
                {user?.email}
              </span>

              <button
                onClick={() => supabase.auth.signOut()}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="hidden md:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. CONTENU PRINCIPAL */}
      <main className="pt-28 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              Détectez le plagiat en <span className="text-blue-600">quelques secondes</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Téléchargez votre document et obtenez une analyse détaillée instantanément grâce à notre technologie avancée.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-white relative z-20">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragging ? 'border-blue-500 bg-blue-50 scale-[1.01]' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
              }`}
            >
              {!file ? (
                <>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
                    <i className="fa-solid fa-cloud-arrow-up text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Glissez votre fichier ici</h3>
                  <p className="text-gray-500 mb-6 font-medium">Format accepté : .txt uniquement</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all"
                  >
                    Parcourir les fichiers
                  </button>
                  <input ref={fileInputRef} type="file" accept=".txt" onChange={handleFileSelect} className="hidden" />
                </>
              ) : (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-4 bg-blue-50 p-5 rounded-2xl border border-blue-100 text-left">
                    <i className="fa-solid fa-file-lines text-3xl text-blue-600"></i>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{file.name}</p>
                      <p className="text-sm text-gray-500 font-medium">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button onClick={() => setFile(null)} className="ml-4 p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <button 
                    onClick={handleAnalyze} 
                    disabled={uploading}
                    className="block w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-200 transition-all disabled:opacity-50"
                  >
                    {uploading ? <i className="fa-solid fa-spinner animate-spin mr-2"></i> : null}
                    {uploading ? 'Analyse en cours...' : 'Lancer l\'analyse détaillée'}
                  </button>
                </div>
              )}
            </div>
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl font-medium flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation"></i>
                {error}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 relative z-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm">
                <i className="fa-solid fa-bolt text-2xl"></i>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Analyse éclair</h3>
              <p className="text-gray-600 leading-relaxed text-sm">Comparez vos documents contre des millions de sources en quelques secondes.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 text-cyan-600 shadow-sm">
                <i className="fa-solid fa-bullseye text-2xl"></i>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Précision IA</h3>
              <p className="text-gray-600 leading-relaxed text-sm">Détection intelligente des paraphrases et des reformulations complexes.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 shadow-sm">
                <i className="fa-solid fa-shield-halved text-2xl"></i>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Sécurité totale</h3>
              <p className="text-gray-600 leading-relaxed text-sm">Vos données sont strictement confidentielles et jamais partagées avec des tiers.</p>
            </div>
          </div>

          <FAQSection />
          
          <Testimonials />

          <footer className="mt-20 py-12 border-t border-gray-200 relative z-10">
            <div className="flex flex-wrap justify-center gap-8 mb-8 font-semibold text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-blue-600 transition-colors">CGU</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <p className="text-center text-gray-400 text-sm">
              All Rights Reserved 2026 © <span className="font-bold text-gray-500">PlagDetect</span>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
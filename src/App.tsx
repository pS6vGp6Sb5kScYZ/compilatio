import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AnalysisProgress from './components/AnalysisProgress';

// Définition des types pour la navigation
type Page = 'home' | 'analysis' | 'dashboard';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentDocumentId, setCurrentDocumentId] = useState<string>('');

  // Modification : Cette fonction gère maintenant la redirection directe
  const handleAnalysisStart = (documentId: string) => {
    if (documentId === '') {
      // Si l'ID est vide (clic sur le bouton Dashboard), on y va directement
      setCurrentPage('dashboard');
    } else {
      // Si on a un ID, on lance la procédure d'analyse normale
      setCurrentDocumentId(documentId);
      setCurrentPage('analysis');
    }
  };

  const handleAnalysisComplete = () => {
    setCurrentPage('dashboard');
  };

  const handleNewAnalysis = () => {
    setCurrentPage('home');
  };

  // Écran de chargement initial (Auth)
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center font-sans">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre session...</p>
        </div>
      </div>
    );
  }

  // Redirection vers Login si non connecté
  if (!user) {
    return <Login />;
  }

  // LOGIQUE DE ROUTAGE
  
  // 1. Vue Analyse (Barre de progression)
  if (currentPage === 'analysis' && currentDocumentId) {
    return (
      <AnalysisProgress
        documentId={currentDocumentId}
        onComplete={handleAnalysisComplete}
      />
    );
  }

  // 2. Vue Dashboard (Historique et résultats)
  if (currentPage === 'dashboard') {
    return <Dashboard onNewAnalysis={handleNewAnalysis} />;
  }

  // 3. Vue Home (Par défaut : Upload et FAQ)
  return <Home onAnalysisStart={handleAnalysisStart} />;
}

// Composant racine avec le Provider d'Authentification
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
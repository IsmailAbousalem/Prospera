import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

export default function Header({ onToggleLanguage, language }) {
  const [isSpanish, setIsSpanish] = useState(language === 'es');

  // Load the saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setIsSpanish(savedLanguage === 'es');
    onToggleLanguage(savedLanguage);
  }, [onToggleLanguage]);

  const handleLanguageToggle = () => {
    const newLanguage = isSpanish ? 'en' : 'es';
    setIsSpanish(!isSpanish);
    onToggleLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <header className="bg-amber-50 border-b border-amber-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <img src='/src/assets/prosperatitle.png' alt="Prospera Title" style={{ width: '200px', height: 'auto' }} />
        </Link>
        <div className="flex items-center space-x-2 text-amber-700">
          <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={handleLanguageToggle}>
            {isSpanish ? 'Español' : 'English'}
          </Button>
          <span className="hidden sm:inline">{isSpanish ? '¿Tienes preguntas?' : 'Have questions?'}</span>
          <Link to="/chat" className="text-amber-500 hover:text-amber-600 hover:bg-amber-100">
            {isSpanish ? 'Pregúntale a Foxy!' : 'Ask Foxy!'}
          </Link>
          <Link to="/chat">
            <img src='/src/assets/Question.png' alt="Foxy" style={{ width: '40px', height: 'auto' }} />
          </Link>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-display font-bold text-primary transition-all duration-300 hover:opacity-80"
        >
          Concurso<span className="text-foreground">Facilitador</span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors duration-200">
            Início
          </Link>
          <Link to="/concursos" className="text-foreground/80 hover:text-primary transition-colors duration-200">
            Concursos
          </Link>
          <Link to="/sobre" className="text-foreground/80 hover:text-primary transition-colors duration-200">
            Sobre
          </Link>
          <Link to="/contato" className="text-foreground/80 hover:text-primary transition-colors duration-200">
            Contato
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notificações">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
          
          <Link to="/login">
            <Button variant="ghost" size="icon" aria-label="Minha conta">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden glass px-4 py-4 animate-fade-in border-t border-border">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/concursos" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Concursos
            </Link>
            <Link 
              to="/sobre" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              to="/contato" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Contato
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

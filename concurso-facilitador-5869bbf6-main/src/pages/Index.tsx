
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import ConcursoCard, { ConcursoProps } from '@/components/ConcursoCard';
import { Button } from '@/components/ui/button';
import concursosData from '@/data/concursos.json';

const Index: React.FC = () => {
  const [concursos, setConcursos] = useState<ConcursoProps[]>([]);
  const [filteredConcursos, setFilteredConcursos] = useState<ConcursoProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    nivel: [],
    esfera: [],
    area: [],
    situacao: []
  });
  const [distanceRange, setDistanceRange] = useState<number>(50);
  
  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      // Explicitly cast the data to match ConcursoProps
      const loadedConcursos = concursosData.concursos as unknown as ConcursoProps[];
      setConcursos(loadedConcursos);
      setFilteredConcursos(loadedConcursos);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Effect to apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, activeFilters, distanceRange, concursos]);
  
  const applyFilters = () => {
    if (concursos.length === 0) return;
    
    let result = [...concursos];
    
    // Apply search term filter
    if (searchTerm.trim() !== '') {
      const search = searchTerm.toLowerCase();
      result = result.filter(concurso => 
        concurso.titulo.toLowerCase().includes(search) || 
        concurso.orgao.toLowerCase().includes(search) ||
        concurso.local.toLowerCase().includes(search)
      );
    }
    
    // Apply nivel filter
    if (activeFilters.nivel.length > 0) {
      result = result.filter(concurso => 
        concurso.nivel.some(n => activeFilters.nivel.includes(n))
      );
    }
    
    // Apply esfera filter
    if (activeFilters.esfera.length > 0) {
      result = result.filter(concurso => 
        activeFilters.esfera.includes(concurso.esfera)
      );
    }
    
    // Apply area filter
    if (activeFilters.area.length > 0) {
      result = result.filter(concurso => 
        concurso.area.some(a => activeFilters.area.includes(a))
      );
    }
    
    // Apply situacao filter
    if (activeFilters.situacao.length > 0) {
      result = result.filter(concurso => 
        activeFilters.situacao.includes(concurso.situacao)
      );
    }
    
    // Apply distance filter (this would be more sophisticated with actual geolocation)
    // For this example, we'll just use it as a filter presence indicator
    
    setFilteredConcursos(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType: string, values: string[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const handleDistanceChange = (value: number) => {
    setDistanceRange(value);
  };
  
  const concursosPerPage = 5;
  const totalPages = Math.ceil(filteredConcursos.length / concursosPerPage);
  
  const loadMoreConcursos = () => {
    setLoading(true);
    
    // Simular carregamento
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoading(false);
    }, 800);
  };
  
  const displayedConcursos = filteredConcursos.slice(0, currentPage * concursosPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16 px-4 container mx-auto">
        {/* Hero Section */}
        <section className="py-16 mb-6 text-center animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Encontre seu próximo <span className="text-primary">concurso público</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Busque entre milhares de concursos em todo o Brasil e mantenha-se atualizado 
            sobre as melhores oportunidades para a sua carreira
          </p>
          
          <SearchBar onSearch={handleSearchChange} />
        </section>
        
        {/* Filters and Results */}
        <section className="mb-8">
          <FilterPanel 
            onFilterChange={handleFilterChange}
            onDistanceChange={handleDistanceChange}
          />
          
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Concursos Encontrados</h2>
              <span className="text-sm text-muted-foreground">
                Exibindo {displayedConcursos.length} de {filteredConcursos.length} concursos
              </span>
            </div>
            
            {loading && currentPage === 1 ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : displayedConcursos.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 stagger-animation">
                {displayedConcursos.map((concurso, index) => (
                  <ConcursoCard key={`${concurso.id}-${index}`} concurso={concurso} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">
                  Nenhum concurso encontrado com os filtros selecionados.
                </p>
                <Button 
                  onClick={() => {
                    setActiveFilters({
                      nivel: [],
                      esfera: [],
                      area: [],
                      situacao: []
                    });
                    setSearchTerm('');
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Limpar filtros
                </Button>
              </div>
            )}
            
            {currentPage < totalPages && displayedConcursos.length > 0 && (
              <div className="mt-8 text-center">
                <Button 
                  onClick={loadMoreConcursos} 
                  variant="outline"
                  disabled={loading}
                  className="px-8 py-6 border-border bg-white hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                >
                  {loading ? 'Carregando...' : 'Carregar mais concursos'}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ConcursoFacilitador • Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

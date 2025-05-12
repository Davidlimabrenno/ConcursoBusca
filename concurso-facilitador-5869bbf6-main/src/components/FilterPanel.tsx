
import React, { useState, useEffect } from 'react';
import { ChevronDown, Check, MapPin, Briefcase, Calendar, School, Award, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import concursosData from '@/data/concursos.json';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterPanelProps {
  onFilterChange: (filterType: string, values: string[]) => void;
  onDistanceChange: (value: number) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, onDistanceChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [distanceRange, setDistanceRange] = useState<number[]>([50]);

  // Inicializar filtros a partir dos dados do JSON
  const [nivelOptions, setNivelOptions] = useState<FilterOption[]>(
    concursosData.niveis.map(nivel => ({
      id: nivel,
      label: nivel === 'médio' ? 'Ensino Médio' : 
             nivel === 'técnico' ? 'Técnico' : 
             nivel === 'superior' ? 'Superior' : 
             nivel.charAt(0).toUpperCase() + nivel.slice(1),
      checked: false
    }))
  );

  const [esferaOptions, setEsferaOptions] = useState<FilterOption[]>(
    concursosData.esferas.map(esfera => ({
      id: esfera,
      label: esfera.charAt(0).toUpperCase() + esfera.slice(1),
      checked: false
    }))
  );

  const [areaOptions, setAreaOptions] = useState<FilterOption[]>(
    concursosData.areas.map(area => ({
      id: area,
      label: area.charAt(0).toUpperCase() + area.slice(1),
      checked: false
    }))
  );

  const [situacaoOptions, setSituacaoOptions] = useState<FilterOption[]>(
    concursosData.situacoes.map(situacao => ({
      id: situacao,
      label: situacao === 'aberto' ? 'Inscrições Abertas' : 
             situacao === 'proximamente' ? 'Abre Proximamente' : 
             situacao === 'andamento' ? 'Em Andamento' : 
             situacao === 'encerrado' ? 'Encerrado' :
             situacao.charAt(0).toUpperCase() + situacao.slice(1),
      checked: false
    }))
  );

  useEffect(() => {
    // Atualiza os filtros externos sempre que os filtros internos mudarem
    const nivelValues = nivelOptions.filter(opt => opt.checked).map(opt => opt.id);
    const esferaValues = esferaOptions.filter(opt => opt.checked).map(opt => opt.id);
    const areaValues = areaOptions.filter(opt => opt.checked).map(opt => opt.id);
    const situacaoValues = situacaoOptions.filter(opt => opt.checked).map(opt => opt.id);

    onFilterChange('nivel', nivelValues);
    onFilterChange('esfera', esferaValues);
    onFilterChange('area', areaValues);
    onFilterChange('situacao', situacaoValues);
  }, [nivelOptions, esferaOptions, areaOptions, situacaoOptions, onFilterChange]);

  useEffect(() => {
    // Atualiza a distância sempre que o range mudar
    onDistanceChange(distanceRange[0]);
  }, [distanceRange, onDistanceChange]);

  const toggleFilterOption = (options: FilterOption[], id: string) => {
    return options.map(option => 
      option.id === id ? { ...option, checked: !option.checked } : option
    );
  };

  const handleNivelToggle = (id: string) => {
    const updatedOptions = toggleFilterOption(nivelOptions, id);
    setNivelOptions(updatedOptions);
    updateSelectedFilters(updatedOptions, 'nivel');
  };

  const handleEsferaToggle = (id: string) => {
    const updatedOptions = toggleFilterOption(esferaOptions, id);
    setEsferaOptions(updatedOptions);
    updateSelectedFilters(updatedOptions, 'esfera');
  };

  const handleAreaToggle = (id: string) => {
    const updatedOptions = toggleFilterOption(areaOptions, id);
    setAreaOptions(updatedOptions);
    updateSelectedFilters(updatedOptions, 'area');
  };

  const handleSituacaoToggle = (id: string) => {
    const updatedOptions = toggleFilterOption(situacaoOptions, id);
    setSituacaoOptions(updatedOptions);
    updateSelectedFilters(updatedOptions, 'situacao');
  };

  const updateSelectedFilters = (options: FilterOption[], type: string) => {
    // Remove os filtros antigos deste tipo
    const filtered = selectedFilters.filter(filter => !filter.startsWith(`${type}:`));
    
    // Adiciona os novos filtros selecionados
    const newFilters = options
      .filter(option => option.checked)
      .map(option => `${type}:${option.id}`);
    
    setSelectedFilters([...filtered, ...newFilters]);
  };

  const removeFilter = (filter: string) => {
    const [type, id] = filter.split(':');
    
    // Atualiza os estados correspondentes
    if (type === 'nivel') {
      setNivelOptions(prev => prev.map(opt => 
        opt.id === id ? { ...opt, checked: false } : opt
      ));
    } else if (type === 'esfera') {
      setEsferaOptions(prev => prev.map(opt => 
        opt.id === id ? { ...opt, checked: false } : opt
      ));
    } else if (type === 'area') {
      setAreaOptions(prev => prev.map(opt => 
        opt.id === id ? { ...opt, checked: false } : opt
      ));
    } else if (type === 'situacao') {
      setSituacaoOptions(prev => prev.map(opt => 
        opt.id === id ? { ...opt, checked: false } : opt
      ));
    }
    
    // Remove o filtro da lista de selecionados
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setNivelOptions(prev => prev.map(opt => ({ ...opt, checked: false })));
    setEsferaOptions(prev => prev.map(opt => ({ ...opt, checked: false })));
    setAreaOptions(prev => prev.map(opt => ({ ...opt, checked: false })));
    setSituacaoOptions(prev => prev.map(opt => ({ ...opt, checked: false })));
    setDistanceRange([50]);
    setSelectedFilters([]);
  };

  const getFilterLabel = (filter: string): string => {
    const [type, id] = filter.split(':');
    let options: FilterOption[] = [];
    
    switch (type) {
      case 'nivel':
        options = nivelOptions;
        break;
      case 'esfera':
        options = esferaOptions;
        break;
      case 'area':
        options = areaOptions;
        break;
      case 'situacao':
        options = situacaoOptions;
        break;
      default:
        return id;
    }
    
    const option = options.find(opt => opt.id === id);
    return option ? option.label : id;
  };

  return (
    <div className="w-full">
      <div className="p-5 glass rounded-2xl shadow-soft animate-fade-up">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            className="h-10 px-4 flex items-center gap-1 border-border hover:bg-secondary/80 transition-all duration-200"
          >
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </Button>

          {/* Filter Popover - Nível */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="h-10 px-4 flex items-center gap-1 border-border hover:bg-secondary/80 transition-all duration-200"
              >
                <School className="w-4 h-4" />
                <span>Nível</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="start">
              <div className="space-y-2">
                {nivelOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`nivel-${option.id}`} 
                      checked={option.checked}
                      onCheckedChange={() => handleNivelToggle(option.id)}
                    />
                    <label 
                      htmlFor={`nivel-${option.id}`}
                      className="text-sm font-medium cursor-pointer select-none flex-1"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Filter Popover - Esfera */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="h-10 px-4 flex items-center gap-1 border-border hover:bg-secondary/80 transition-all duration-200"
              >
                <Award className="w-4 h-4" />
                <span>Esfera</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="start">
              <div className="space-y-2">
                {esferaOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`esfera-${option.id}`} 
                      checked={option.checked}
                      onCheckedChange={() => handleEsferaToggle(option.id)}
                    />
                    <label 
                      htmlFor={`esfera-${option.id}`}
                      className="text-sm font-medium cursor-pointer select-none flex-1"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Filter Popover - Área */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="h-10 px-4 flex items-center gap-1 border-border hover:bg-secondary/80 transition-all duration-200"
              >
                <Briefcase className="w-4 h-4" />
                <span>Área</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-3" align="start">
              <div className="grid grid-cols-2 gap-2">
                {areaOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`area-${option.id}`} 
                      checked={option.checked}
                      onCheckedChange={() => handleAreaToggle(option.id)}
                    />
                    <label 
                      htmlFor={`area-${option.id}`}
                      className="text-sm font-medium cursor-pointer select-none flex-1"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Filter Popover - Situação */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="h-10 px-4 flex items-center gap-1 border-border hover:bg-secondary/80 transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Situação</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="start">
              <div className="space-y-2">
                {situacaoOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`situacao-${option.id}`} 
                      checked={option.checked}
                      onCheckedChange={() => handleSituacaoToggle(option.id)}
                    />
                    <label 
                      htmlFor={`situacao-${option.id}`}
                      className="text-sm font-medium cursor-pointer select-none flex-1"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Filter Popover - Distância */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="h-10 px-4 flex items-center gap-1 border-border hover:bg-secondary/80 transition-all duration-200"
              >
                <MapPin className="w-4 h-4" />
                <span>Distância</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" align="start">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-4">Raio de busca: {distanceRange[0]} km</p>
                  <Slider
                    value={distanceRange}
                    onValueChange={setDistanceRange}
                    max={100}
                    step={5}
                    className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-4"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 km</span>
                  <span>50 km</span>
                  <span>100 km</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Selected filters */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-3 animate-fade-in">
            <span className="text-sm text-muted-foreground">Filtros ativos:</span>
            
            {selectedFilters.map(filter => (
              <Badge 
                key={filter} 
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1 rounded-full font-normal"
              >
                {getFilterLabel(filter)}
                <X 
                  className="w-3 h-3 ml-1 cursor-pointer" 
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            ))}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs text-muted-foreground"
              onClick={clearAllFilters}
            >
              Limpar todos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;


import React from 'react';
import { MapPin, Calendar, Briefcase, Clock, Award, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface ConcursoProps {
  id: string;
  titulo: string;
  orgao: string;
  esfera: 'federal' | 'estadual' | 'municipal';
  nivel: ('médio' | 'técnico' | 'superior')[];
  area: string[];
  salario: string;
  vagas: number;
  inscricaoInicio: string;
  inscricaoFim: string;
  provaData?: string;
  local: string;
  situacao: 'aberto' | 'proximamente' | 'andamento' | 'encerrado';
  link: string;
}

interface ConcursoCardProps {
  concurso: ConcursoProps;
}

const ConcursoCard: React.FC<ConcursoCardProps> = ({ concurso }) => {
  // Função para formatar data
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  // Função para obter cor do badge de situação
  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'aberto':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'proximamente':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'andamento':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'encerrado':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Função para obter texto de situação
  const getSituacaoText = (situacao: string) => {
    switch (situacao) {
      case 'aberto':
        return 'Inscrições Abertas';
      case 'proximamente':
        return 'Abre Proximamente';
      case 'andamento':
        return 'Em Andamento';
      case 'encerrado':
        return 'Encerrado';
      default:
        return situacao;
    }
  };

  // Calcular dias restantes para inscrição
  const calcularDiasRestantes = () => {
    if (concurso.situacao !== 'aberto') return null;
    
    const hoje = new Date();
    const fimInscricao = new Date(concurso.inscricaoFim);
    const diferenca = Math.ceil((fimInscricao.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    
    return diferenca > 0 ? diferenca : 0;
  };

  const diasRestantes = calcularDiasRestantes();

  return (
    <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] border-border">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                className={`border px-2 py-0.5 rounded-full text-xs font-medium ${getSituacaoColor(concurso.situacao)}`}
              >
                {getSituacaoText(concurso.situacao)}
              </Badge>
              
              {concurso.situacao === 'aberto' && diasRestantes !== null && (
                <span className="text-xs text-red-500 font-medium flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {diasRestantes} {diasRestantes === 1 ? 'dia' : 'dias'} restantes
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold mb-1 leading-tight">{concurso.titulo}</h3>
            <p className="text-muted-foreground mb-3 text-sm">{concurso.orgao}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-4">
              <div className="flex items-center text-sm text-foreground/80">
                <Award className="w-4 h-4 mr-2 text-primary" />
                <span>Esfera {concurso.esfera}</span>
              </div>
              
              <div className="flex items-center text-sm text-foreground/80">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>{concurso.local}</span>
              </div>
              
              <div className="flex items-center text-sm text-foreground/80">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span>Inscrições: {formatDate(concurso.inscricaoInicio)} a {formatDate(concurso.inscricaoFim)}</span>
              </div>
              
              <div className="flex items-center text-sm text-foreground/80">
                <Briefcase className="w-4 h-4 mr-2 text-primary" />
                <span>{concurso.vagas} {concurso.vagas === 1 ? 'vaga' : 'vagas'}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {concurso.nivel.map((n) => (
                <Badge key={n} variant="secondary" className="rounded-full text-xs">
                  {n}
                </Badge>
              ))}
              
              {concurso.area.map((a) => (
                <Badge key={a} variant="outline" className="rounded-full text-xs">
                  {a}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="font-bold text-lg text-primary mb-1">{concurso.salario}</p>
            <p className="text-xs text-muted-foreground mb-4">Salário inicial</p>
            
            {concurso.provaData && (
              <div className="flex items-center text-sm text-foreground/80 mb-4">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span>Prova: {formatDate(concurso.provaData)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-0 border-t border-border">
        <div className="grid grid-cols-2 w-full divide-x divide-border">
          <Button 
            variant="ghost" 
            className="py-3 rounded-none hover:bg-secondary/50 text-sm font-medium text-primary transition-colors"
          >
            Salvar
          </Button>
          <Button 
            variant="ghost" 
            className="py-3 rounded-none hover:bg-secondary/50 text-sm font-medium flex items-center justify-center gap-1 transition-colors"
            onClick={() => window.open(concurso.link, '_blank')}
          >
            Ver Detalhes
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ConcursoCard;

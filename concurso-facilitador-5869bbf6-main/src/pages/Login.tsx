
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de autenticação
    setTimeout(() => {
      if (isLogin) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Você será redirecionado para a página inicial.",
        });
      } else {
        if (password !== confirmPassword) {
          toast({
            title: "Erro ao criar conta",
            description: "As senhas não coincidem. Por favor, tente novamente.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        toast({
          title: "Conta criada com sucesso!",
          description: "Você pode fazer login agora.",
        });
        setIsLogin(true);
      }
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-up">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-display font-bold text-primary mb-2">
              Concurso<span className="text-foreground">Facilitador</span>
            </h2>
          </Link>
          <h1 className="text-2xl font-bold">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin
              ? 'Acesse o portal e acompanhe seus concursos favoritos'
              : 'Cadastre-se e receba alertas de novos concursos'}
          </p>
        </div>

        <div className="glass p-8 rounded-2xl shadow-soft border border-border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/60">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  className="pl-10 py-6 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/60">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  type="password"
                  placeholder="Sua senha"
                  className="pl-10 py-6 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/60">
                    <Check className="h-5 w-5" />
                  </div>
                  <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    className="pl-10 py-6 h-12"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link to="/esqueci-senha" className="text-primary hover:text-primary/90 transition-colors">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-6 h-12 bg-primary hover:bg-primary/90 transition-all"
              disabled={loading}
            >
              {loading
                ? 'Processando...'
                : isLogin
                ? 'Entrar'
                : 'Criar conta'}
            </Button>

            <Separator className="my-6" />

            <div className="flex flex-col space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full py-6 h-12 flex items-center justify-center space-x-2 border-border"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                <span>Continuar com Google</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full py-6 h-12 flex items-center justify-center space-x-2 border-border"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span>Continuar com GitHub</span>
              </Button>
            </div>
          </form>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <button
              type="button"
              className="ml-1 text-primary hover:text-primary/90 font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Criar conta" : "Entrar"}
            </button>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Login attempt with:', { email, password })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-4xl shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-blue-600 text-white flex items-center justify-center p-8 rounded-l-xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Bem-vindo de volta!</h2>
              <p className="text-blue-100">Faça login para acessar sua conta e gerenciar seus projetos.</p>
            </div>
          </div>

          <div className="md:w-1/2 p-8">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold">Login</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar o sistema
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Esconder senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    <Label htmlFor="remember" className="text-sm">Lembrar-me</Label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:underline">Esqueceu a senha?</a>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg" type="submit" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </CardFooter>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta? <a href="#" className="text-blue-600 hover:underline">Registre-se</a>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
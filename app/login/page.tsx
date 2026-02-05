'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      // Ha sikeres, a rendszer automatikusan megkapta a Cookie-t.
      // Átirányítjuk az adminra.
      router.push('/admin');
      router.refresh(); // Frissítünk, hogy a Middleware érzékelje a sütit
    } else {
      setError('Hibás felhasználónév vagy jelszó!');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-sm shadow-xl border-t-4 border-blue-600">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Admin Belépés</CardTitle>
          <p className="text-sm text-gray-500">Csak tulajdonosoknak</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Felhasználónév" 
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  type="password" 
                  placeholder="Jelszó" 
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
              Belépés
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
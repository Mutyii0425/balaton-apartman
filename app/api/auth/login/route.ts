import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  // --- ITT ÁLLÍTSD BE A SAJÁT JELSZAVADAT! ---
  // Most: Felhasználó: admin, Jelszó: Balaton2024
  const VALID_USER = 'csali';
  const VALID_PASS = 'Brumika12'; 

  if (username === VALID_USER && password === VALID_PASS) {
    // Ha helyes, készítünk egy választ
    const response = NextResponse.json({ success: true });
    
    // És rárakunk egy SÜTIT (Cookie), ami 1 napig érvényes
    // Ez a kulcsa a belépésnek!
    response.cookies.set('admin_token', 'titkos-kulcs-123', {
      httpOnly: true, // Biztonságos, JavaScript nem fér hozzá
      path: '/',
      maxAge: 60 * 60 * 24, // 1 nap (másodpercben)
    });

    return response;
  }

  return NextResponse.json({ error: 'Hibás adatok!' }, { status: 401 });
}
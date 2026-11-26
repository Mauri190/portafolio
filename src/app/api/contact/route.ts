import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Lógica para enviar el correo (Web3Forms u otro)
    return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al enviar" }, { status: 500 });
  }
}
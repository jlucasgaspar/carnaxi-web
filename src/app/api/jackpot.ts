export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ message: 'ok', data: body });
}

export async function GET(req: Request) {
  return Response.json({ message: 'ok' });
}
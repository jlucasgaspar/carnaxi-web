import { Jackpot } from "@/models/Jackpot";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const item = await Jackpot.create({
      name: body.name,
      rankedAssociations: body.rankedAssociations,
    });
    return Response.json({ message: 'ok', data: body, item });
  } catch (error: any) {
    return Response.json({ errorMessage: error.message }, {
      status: 400,
    });
  }
}

export async function GET(req: Request) {
  try {
    const items = await Jackpot.find();
    return Response.json(items);
  } catch (error: any) {
    return Response.json({ errorMessage: error.message }, {
      status: 400,
    });
  }
}
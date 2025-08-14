import { dbConnect } from "@/lib/mongodb";
import { Jackpot } from "@/models/Jackpot";

export async function POST(req: Request) {
  try {
    return await _post(req);
  } catch (error: any) {
    return Response.json({ errorMessage: error.message }, { status: 400 });
  }
}

async function _post(req: Request) {
  const [body] = await Promise.all([req.json(), dbConnect()]);

  if (!body.name || !body.rankedAssociations || !Array.isArray(body.rankedAssociations)) {
    throw new Error('Invalid request body');
  }

  if (body.rankedAssociations.length !== 12) {
    throw new Error('You must provide 12 ranked associations');
  }

  // Validate each ranked association
  for (const association of body.rankedAssociations) {
    if (!association.id || !association.name || !association.slug) {
      throw new Error('Each ranked association must have id, name, and slug');
    }
    if (typeof association.id !== 'string' || typeof association.name !== 'string' || typeof association.slug !== 'string') {
      throw new Error('Each ranked association must have id, name, and slug as strings');
    }
    if (association.id.trim() === '' || association.name.trim() === '' || association.slug.trim() === '') {
      throw new Error('Each ranked association must have non-empty id, name, and slug');
    }
  }

  const jackpotCreatorAlreadyExists = await Jackpot.findOne({ name: body.name });
  if (jackpotCreatorAlreadyExists) {
    throw new Error(`Nome "${body.name}" já cadastrado no bolão.`);
  }

  const item = await Jackpot.create({
    name: body.name,
    rankedAssociations: body.rankedAssociations,
  });

  return Response.json(item);
}

export async function GET(req: Request) {
  try {
    return await _get();
  } catch (error: any) {
    return Response.json({ errorMessage: error.message }, { status: 400 });
  }
}

async function _get() {
  await dbConnect();
  const items = await Jackpot.find();
  return Response.json(items);
}

export async function GET() {
    return new Response(process.env.MONGODB_URI, { status: 200 });
  }
  
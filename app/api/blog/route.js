export async function GET() {
  try {
    const res = await fetch(`${process.env.APP_URL}/blog`, {
      cache: "no-store",
    });
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

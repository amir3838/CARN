export default async function handler(req, res) {
  // المفتاح الجديد من صورتك الأخيرة
  const GNEWS_API_KEY = "8e7930c9d2f5838ae01f79c5b443e3a5";
  const query = "\"Gold prices\" OR \"USD exchange rate\"";
  
  try {
    const response = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${GNEWS_API_KEY}`);
    const data = await response.json();

    // تفعيل الكاش لمدة ساعة (علشان المفتاح م يخلصش)
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=60');
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from GNews" });
  }
}

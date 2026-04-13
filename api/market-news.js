export default async function handler(req, res) {
  const GNEWS_API_KEY = "4b151a11970a4b8992ecf756cc4e6a6e";
  const query = "\"Gold prices\" OR \"USD exchange rate\"";
  
  try {
    const response = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=12&apikey=${GNEWS_API_KEY}`);
    const data = await response.json();

    // إعدادات الكاش المجانية لفيرسيل (ساعة كاملة)
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=60');
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}

export default async function handler(req, res) {
  const KEY_GNEWS = "8e7930c9d2f5838ae01f79c5b443e3a5";
  const KEY_NEWSAPI = "4b151a11970a4b8992ecf756cc4e6a6e";

  try {
    // المحاولة الأولى: استخدام GNews (الأدق في الأخبار)
    const gnewsUrl = `https://gnews.io/api/v4/search?q=gold+prices&lang=en&apikey=${KEY_GNEWS}`;
    const response = await fetch(gnewsUrl);
    let data = await response.json();

    // لو المفتاح الأول خلص (Error 429) أو فيه مشكلة
    if (!response.ok || data.errors) {
      console.log("GNews failed, switching to NewsAPI...");
      
      // المحاولة الثانية: استخدام NewsAPI
      const newsApiUrl = `https://newsapi.org/v2/everything?q=gold+prices&language=en&apiKey=${KEY_NEWSAPI}`;
      const fallbackResponse = await fetch(newsApiUrl);
      data = await fallbackResponse.json();
    }

    // إعدادات الكاش عشان نحافظ على المفتاحين لأطول فترة
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=60');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "All keys failed" });
  }
}

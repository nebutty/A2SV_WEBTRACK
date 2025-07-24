export async function fetchJobs() {
  try {
    const res = await fetch('https://akil-backend.onrender.com/opportunities/search', {
      cache: 'no-store',
    });

    const json = await res.json();

    if (!res.ok || !json.data) {
      throw new Error('Invalid response structure');
    }

    return { opportunities: json.data }; // ✅ rename for frontend
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return null;
  }
}

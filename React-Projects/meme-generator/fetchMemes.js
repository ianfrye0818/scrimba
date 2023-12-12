export default async function fetchMemes() {
  const response = await fetch('https://api.imgflip.com/get_memes');
  if (!response.ok) {
    throw new Error(`Error fetching Data ${response.status || ''}`);
  }
  const data = await response.json();
  return data;
}

export function esVideo(ruta: string): boolean {
  return ruta?.toLowerCase().endsWith('.mp4');
}

export function esYoutube(ruta: string): boolean {
  if (!ruta) return false;
  return /youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\//.test(ruta);
}

export function getYoutubeEmbedUrl(ruta: string): string {
  if (!ruta) return '';
  const match = ruta.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : '';
}

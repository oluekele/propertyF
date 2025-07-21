export function getSafeImageUrl(image?: string): string {
  if (!image) return "/placeholder.jpg";

  // If already an absolute URL (Cloudinary or external)
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // Otherwise, prepend your backend base URL
  const relativePath = image.startsWith("/") ? image : `/${image}`;
  return `${process.env.NEXT_PUBLIC_BASE_URL}${relativePath}`;
}

export function generateUniqueSlug(name: string): string {
  // Convert name to lowercase and replace spaces with hyphens
  let slug: string = name.toLowerCase().replace(/\s+/g, "-");

  // Remove special characters
  slug = slug.replace(/[^a-z0-9-]/g, "");

  // Add a unique identifier (timestamp)
  const timestamp: number = new Date().getTime();
  slug = `${slug}-${timestamp}`;

  return slug;
}

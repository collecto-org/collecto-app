export function slugify(text: string): string | undefined{
  if(text){
    return text
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") 
      .replace(/\s+/g, "-"); }
  }
  
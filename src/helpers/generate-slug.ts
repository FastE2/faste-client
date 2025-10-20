export function generateSlug(name: string): string {
  return name
    .toLowerCase() // viết thường
    .normalize('NFD') // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .replace(/[^a-z0-9\s-]/g, '') // xóa ký tự đặc biệt
    .trim() // xóa khoảng trắng đầu/cuối
    .replace(/\s+/g, '-') // thay khoảng trắng bằng gạch nối
    .replace(/-+/g, '-'); // gộp nhiều dấu '-' liên tiếp
}

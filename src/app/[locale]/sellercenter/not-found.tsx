import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-6xl font-bold text-gray-900">Seller 404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Trang quản lý không tồn tại
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        Trang seller bạn đang truy cập không tồn tại hoặc đã bị xóa.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/seller"
          className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
        >
          Seller Dashboard
        </Link>

        <Link
          href="/"
          className="rounded-lg border px-6 py-3 hover:bg-gray-100"
        >
          Trang chủ
        </Link>
      </div>
    </div>
  );
}

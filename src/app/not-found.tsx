import Link from 'next/link';
import "./globals.css";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-7xl font-bold text-gray-900">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Trang không tồn tại
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        Xin lỗi, chúng tôi không tìm thấy trang bạn đang truy cập. Có thể đường
        dẫn đã bị thay đổi hoặc trang đã bị xóa.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          Về trang chủ
        </Link>

        <Link
          href="/shop"
          className="rounded-xl border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-100"
        >
          Tiếp tục mua sắm
        </Link>
      </div>

      <p className="mt-10 text-sm text-gray-400">Error Code: 404</p>
    </div>
  );
}

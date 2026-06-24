import Script from 'next/script';
import type { Metadata } from 'next';
import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import LayoutPublic from '@/views/layouts/LayoutPublic/LayoutPublic';
import { ReactElement } from 'react';
import { faqPageJsonLd } from '@/lib/aeo/schema';

export const metadata: Metadata = {
  title: 'FAQ - Câu hỏi thường gặp | FastE',
  description:
    'Giải đáp các câu hỏi thường gặp về mua hàng, thanh toán, vận chuyển, hoàn tiền và bán hàng trên FastE.',
};

export const revalidate = 3600;

const faqs = [
  {
    question: 'FastE là gì?',
    answer:
      'FastE là nền tảng thương mại điện tử kết nối người mua và người bán với hệ thống quản lý sản phẩm, đơn hàng và thanh toán hiện đại.',
  },
  {
    question: 'Làm thế nào để mua hàng trên FastE?',
    answer:
      'Bạn có thể tìm kiếm sản phẩm, thêm vào giỏ hàng, tiến hành thanh toán và theo dõi trạng thái đơn hàng trong tài khoản của mình.',
  },
  {
    question: 'Tôi có cần tài khoản để đặt hàng không?',
    answer:
      'Có. Bạn cần đăng nhập hoặc tạo tài khoản để quản lý đơn hàng, địa chỉ giao hàng và lịch sử mua sắm.',
  },
  {
    question: 'FastE hỗ trợ những phương thức thanh toán nào?',
    answer:
      'FastE hỗ trợ thanh toán trực tuyến, ví điện tử, chuyển khoản ngân hàng và thanh toán khi nhận hàng tùy theo người bán.',
  },
  {
    question: 'Tôi có thể hủy đơn hàng không?',
    answer:
      'Bạn có thể hủy đơn hàng trước khi người bán xác nhận hoặc trước khi đơn hàng được giao cho đơn vị vận chuyển.',
  },
  {
    question: 'Mất bao lâu để nhận được hàng?',
    answer:
      'Thời gian giao hàng phụ thuộc vào địa chỉ nhận hàng, đơn vị vận chuyển và người bán. Thông tin dự kiến sẽ được hiển thị khi đặt hàng.',
  },
  {
    question: 'Tôi có thể hoàn trả sản phẩm không?',
    answer:
      'Bạn có thể gửi yêu cầu hoàn trả theo chính sách đổi trả của người bán và các điều kiện được hiển thị trên trang sản phẩm.',
  },
  {
    question: 'Làm thế nào để trở thành người bán trên FastE?',
    answer:
      'Bạn có thể đăng ký tài khoản người bán, hoàn tất thông tin cửa hàng và bắt đầu đăng sản phẩm trong Seller Center.',
  },
  {
    question: 'FastE có thu phí người bán không?',
    answer:
      'Các khoản phí áp dụng sẽ được hiển thị minh bạch trong điều khoản dành cho người bán và trong Seller Center.',
  },
  {
    question: 'Làm thế nào để liên hệ hỗ trợ?',
    answer:
      'Bạn có thể liên hệ đội ngũ hỗ trợ thông qua trang Contact hoặc các kênh hỗ trợ được công bố trên website FastE.',
  },
];

export default function FAQPage() {
  const jsonLd = faqPageJsonLd(faqs);

  return (
    <GuardLayoutWrapper
      getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
      authGuard={false}
      guestGuard={false}
    >
      <section className="container mx-auto max-w-4xl px-4 py-12">
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <h1 className="mb-3 text-4xl font-bold">Câu hỏi thường gặp</h1>

        <p className="mb-8 text-muted-foreground">
          Giải đáp những câu hỏi phổ biến về FastE.
        </p>

        <ul className="space-y-4">
          {faqs.map((faq) => (
            <li key={faq.question}>
              <article className="rounded-xl border p-5">
                <h2 className="mb-2 text-lg font-semibold">{faq.question}</h2>

                <p className="text-muted-foreground">{faq.answer}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </GuardLayoutWrapper>
  );
}

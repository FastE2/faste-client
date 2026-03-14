'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Phone,
  Mail,
  Package,
  Truck,
  CreditCard,
  Undo2,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';


export default function SupportPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<string | undefined>('faq-1');

  // FAQ data with translations
  const faqData = useMemo(
    () => [
      {
        id: 'faq-1',
        question: t('support.faq.q1'),
        answer: t('support.faq.a1'),
      },
      {
        id: 'faq-2',
        question: t('support.faq.q2'),
        answer: t('support.faq.a2'),
      },
      {
        id: 'faq-3',
        question: t('support.faq.q3'),
        answer: t('support.faq.a3'),
      },
      {
        id: 'faq-4',
        question: t('support.faq.q4'),
        answer: t('support.faq.a4'),
      },
      {
        id: 'faq-5',
        question: t('support.faq.q5'),
        answer: t('support.faq.a5'),
      },
      {
        id: 'faq-6',
        question: t('support.faq.q6'),
        answer: t('support.faq.a6'),
      },
    ],
    [t],
  );

  // Contact options with translations
  const contactOptions = useMemo(
    () => [
      {
        id: 'live-chat',
        icon: MessageSquare,
        title: t('support.contactOptions.liveChat.title'),
        description: t('support.contactOptions.liveChat.desc'),
        availability: t('support.contactOptions.liveChat.availability'),
      },
      {
        id: 'email',
        icon: Mail,
        title: t('support.contactOptions.email.title'),
        description: t('support.contactOptions.email.desc'),
        availability: t('support.contactOptions.email.availability'),
      },
      {
        id: 'phone',
        icon: Phone,
        title: t('support.contactOptions.phone.title'),
        description: t('support.contactOptions.phone.desc'),
        availability: t('support.contactOptions.phone.availability'),
      },
    ],
    [t],
  );

  // Help topics with translations
  const helpTopics = useMemo(
    () => [
      {
        id: 'orders',
        icon: Package,
        title: t('support.helpTopics.orders.title'),
        description: t('support.helpTopics.orders.desc'),
      },
      {
        id: 'shipping',
        icon: Truck,
        title: t('support.helpTopics.shipping.title'),
        description: t('support.helpTopics.shipping.desc'),
      },
      {
        id: 'payments',
        icon: CreditCard,
        title: t('support.helpTopics.payments.title'),
        description: t('support.helpTopics.payments.desc'),
      },
      {
        id: 'returns',
        icon: Undo2,
        title: t('support.helpTopics.returns.title'),
        description: t('support.helpTopics.returns.desc'),
      },
      {
        id: 'account',
        icon: User,
        title: t('support.helpTopics.account.title'),
        description: t('support.helpTopics.account.desc'),
      },
      {
        id: 'products',
        icon: Package,
        title: t('support.helpTopics.products.title'),
        description: t('support.helpTopics.products.desc'),
      },
    ],
    [t],
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('support.title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('support.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto">
                {t('support.contactSupport')}
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
            >
              {t('support.visitHelpCenter')}
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('support.getInTouch')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('support.getInTouchDesc')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{option.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {option.description}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {option.availability}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Separator />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('support.faqTitle')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('support.faqDesc')}
            </p>
          </div>
          <Accordion
            value={openFaq}
            onValueChange={setOpenFaq}
            type="single"
            collapsible
          >
            {faqData.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b">
                <AccordionTrigger className="py-4 hover:no-underline hover:text-primary transition-colors">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Separator />

      {/* Help Topics Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('support.helpTopicsTitle')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('support.helpTopicsDesc')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {helpTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Card
                  key={topic.id}
                  className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {topic.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl mb-2">
                {t('support.ctaTitle')}
              </CardTitle>
              <CardDescription className="text-base">
                {t('support.ctaDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  {t('support.submitRequest')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

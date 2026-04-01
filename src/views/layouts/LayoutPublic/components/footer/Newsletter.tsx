import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function Newsletter() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-16">
      <div className="max-w-xl">
        <h3 className="text-2xl font-bold mb-3 tracking-tight">
          {t('footer.newsletterTitle')}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {t('footer.newsletterDesc')}
        </p>
      </div>

      <div className="w-full lg:max-w-md">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            placeholder={t('footer.emailPlaceholder')} 
            className="h-12 bg-background border-border"
          />
          <Button className="h-12 px-8 font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            {t('footer.subscribe')}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          {t('footer.termsDesc')}
        </p>
      </div>
    </div>
  );
}

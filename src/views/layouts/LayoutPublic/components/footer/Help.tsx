import { Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Help() {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className="font-semibold mb-4">{t('footer.needHelp')}</h4>
      <p className="text-sm text-muted-foreground">
        {t('footer.helpDesc')}
      </p>

      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4" />
          <span className="font-semibold">0 800 300-353</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4" />
          <span>info@example.com</span>
        </div>
      </div>
    </div>
  );
}

import { useTranslation } from 'react-i18next';

const Copyright = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-muted-foreground/80">
      <p className="text-center lg:text-left leading-loose">
        {t('footer.copyright')}
      </p>
      <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-2 font-medium">
        <a href="#" className="hover:text-foreground transition-colors">
          {t('footer.terms')}
        </a>
        <a href="#" className="hover:text-foreground transition-colors">
          {t('footer.privacy')}
        </a>
        <a href="#" className="hover:text-foreground transition-colors">
          {t('footer.trackOrder')}
        </a>
      </div>
    </div>
  );
};

export default Copyright;
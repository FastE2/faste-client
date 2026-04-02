'use client';

import { useState } from 'react';
import { toastify } from '@/components/ToastNotification';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { changePassword } from '@/services/profile.service';
import { TChangePasswordBody } from '@/types/profile';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';
import { LoadingDialog } from '@/components/loading/LoadingDialog';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const schema = useMemo(
    () =>
      yup.object({
        oldPassword: yup
          .string()
          .min(6, t('profile.changePassword.errors.minChars', { count: 6 }))
          .required(t('profile.changePassword.errors.currentRequired')),

        newPassword: yup
          .string()
          .min(6, t('profile.changePassword.errors.minChars', { count: 6 }))
          .required(t('profile.changePassword.errors.newRequired')),

        confirmNewPassword: yup
          .string()
          .oneOf(
            [yup.ref('newPassword')],
            t('profile.changePassword.errors.mustMatch'),
          )
          .required(t('profile.changePassword.errors.confirmRequired')),
      }),
    [t],
  );

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async (data: TChangePasswordBody) => {
    setLoading(true);
    try {
      const res = await changePassword(data);
      if (res.error) {
        toastify.error(t('profile.changePassword.title'), res.message);
      } else {
        reset({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
        toastify.success(
          t('profile.changePassword.title'),
          t('profile.changePassword.messages.success'),
        );
      }
    } catch (err) {
      toastify.error(
        t('profile.changePassword.title'),
        t('profile.changePassword.messages.somethingWrong'),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      {loading && <LoadingDialog isLoading={loading} />}
      <CardHeader>
        <CardTitle>{t('profile.changePassword.title')}</CardTitle>
        <CardDescription>
          {t('profile.changePassword.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Old Password */}
        <div className="space-y-2">
          <Label htmlFor="oldPassword">
            {t('profile.changePassword.currentPassword')}
          </Label>
          <Input
            {...register('oldPassword')}
            id="oldPassword"
            type="password"
            placeholder={t('profile.changePassword.placeholderCurrent')}
            disabled={loading}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword">
            {t('profile.changePassword.newPassword')}
          </Label>
          <Input
            {...register('newPassword')}
            id="newPassword"
            type="password"
            placeholder={t('profile.changePassword.placeholderNew')}
            disabled={loading}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmNewPassword">
            {t('profile.changePassword.confirmNewPassword')}
          </Label>
          <Input
            {...register('confirmNewPassword')}
            id="confirmNewPassword"
            type="password"
            placeholder={t('profile.changePassword.placeholderConfirm')}
            disabled={loading}
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="w-[141px]"
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              t('profile.changePassword.updateButton')
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

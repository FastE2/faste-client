'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Icon } from '@iconify/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getDetailShopMe } from '@/services/shop';
import { useRouter } from 'next/navigation';
import { ROUTE_CONFIG } from '@/configs/router';
import { LoadingDialog } from '@/components/loading/LoadingDialog';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';

// Mock data
const addressShipOptions = [
  { id: 1, label: 'Hồ Chí Minh' },
  { id: 2, label: 'Hà Nội' },
  { id: 3, label: 'Đà Nẵng' },
];

const deliveryTypes = [
  { id: 1, name: 'Giao Nhanh' },
  { id: 2, name: 'Hoả Tốc' },
  { id: 3, name: 'Tiết Kiệm' },
];

// Validation schema
const registerShopSchema = yup.object().shape({
  name: yup
    .string()
    .required('Tên cửa hàng là bắt buộc')
    .min(3, 'Tên cửa hàng phải có ít nhất 3 ký tự'),
  slug: yup
    .string()
    .required('Slug là bắt buộc')
    .min(3, 'Slug phải có ít nhất 3 ký tự')
    .matches(/^[a-z0-9-]+$/, 'Slug chỉ chứa chữ thường, số và dấu gạch ngang'),
  logo: yup
    .string()
    .required('URL logo là bắt buộc')
    .url('URL logo không hợp lệ'),
  description: yup
    .string()
    .required('Mô tả là bắt buộc')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  addressShipId: yup.number().required('Địa chỉ giao hàng là bắt buộc'),
  businessType: yup
    .string()
    .required('Loại hình kinh doanh là bắt buộc')
    .oneOf(['INDIVIDUAL', 'BUSINESS_HOUSEHOLD', 'COMPANY']),
  taxCode: yup
    .string()
    .required('Mã số thuế là bắt buộc')
    .min(10, 'Mã số thuế phải có ít nhất 10 ký tự'),
  paymentMethods: yup
    .array()
    .of(yup.string().oneOf(['COD', 'SEPAY', 'WEB3']))
    .min(1, 'Chọn ít nhất một phương thức thanh toán'),
  deliveryTypeIds: yup
    .array()
    .of(yup.number())
    .min(1, 'Chọn ít nhất một loại giao hàng'),
});

type RegisterShopFormType = yup.InferType<typeof registerShopSchema>;

export default function RegisterSellerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [slugDebounce, setSlugDebounce] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const form = useForm<RegisterShopFormType>({
    resolver: yupResolver(registerShopSchema) as any,
    defaultValues: {
      name: '',
      slug: '',
      logo: '',
      description: '',
      addressShipId: undefined,
      businessType: '',
      taxCode: '',
      paymentMethods: [],
      deliveryTypeIds: [],
    },
    mode: 'onChange',
  });

  const fetchShopMe = async () => {
    setIsLoading(true);

    try {
      const res = await getDetailShopMe();

      if (res.data && res.status === 'success') {
        return router.replace(ROUTE_CONFIG.SELLER.DASHBOARD);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (slugDebounce) clearTimeout(slugDebounce);

      const timeout = setTimeout(() => {
        if (value.name) {
          const generatedSlug = value.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

          form.setValue('slug', generatedSlug);
        }
      }, 300);

      setSlugDebounce(timeout);
    });

    return () => subscription.unsubscribe();
  }, [form, slugDebounce]);

  useEffect(() => {
    fetchShopMe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateStep = async () => {
    const fieldsToValidate =
      currentStep === 0
        ? ['name', 'slug', 'logo', 'description', 'addressShipId']
        : currentStep === 1
          ? ['businessType', 'taxCode', 'paymentMethods']
          : ['deliveryTypeIds'];

    const isValid = await form.trigger(fieldsToValidate as any);
    return isValid;
  };

  const handleNextStep = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (values: RegisterShopFormType) => {
    console.log('Form Submit:', values);
  };

  const steps = [
    {
      title: 'Thông tin Cửa hàng',
      icon: 'mdi:information-variant',
      description: 'Điền thông tin cơ bản về cửa hàng',
    },
    {
      title: 'Thông tin Kinh doanh',
      icon: 'mdi:briefcase',
      description: 'Loại hình và phương thức thanh toán',
    },
    {
      title: 'Loại Giao Hàng',
      icon: 'mdi:truck-fast',
      description: 'Chọn các loại giao hàng',
    },
  ];
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="mdi:store" width={24} height={24} />
              Đăng ký Cửa hàng
            </CardTitle>
            <CardDescription>
              Hoàn thành các bước để đăng ký cửa hàng của bạn
            </CardDescription>

            <div className="mt-6 w-full flex items-center justify-center gap-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`${steps.length - 1 === index ? '' : 'flex flex-1 items-center gap-2'}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-colors ${
                      index <= currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 transition-colors ${index < currentStep ? 'bg-primary' : 'bg-muted'}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Icon icon={steps[currentStep].icon} width={20} height={20} />
                <h3 className="font-semibold">{steps[currentStep].title}</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên Cửa hàng</FormLabel>
                          <Input placeholder="Nhập tên cửa hàng" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug (Tự động sinh từ tên)</FormLabel>
                          <Input
                            placeholder="slug-tu-dong"
                            {...field}
                            disabled
                          />
                          <FormDescription>
                            Slug sẽ tự động sinh từ tên cửa hàng
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL Logo</FormLabel>
                          <Input
                            placeholder="https://example.com/logo.png"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mô tả</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Mô tả chi tiết về cửa hàng của bạn..."
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="addressShipId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chọn Địa chỉ Giao hàng</FormLabel>
                          <Controller
                            name="addressShipId"
                            control={form.control}
                            render={({ field: controllerField }) => (
                              <Select
                                onValueChange={(value) =>
                                  controllerField.onChange(Number(value))
                                }
                                value={
                                  controllerField.value
                                    ? String(controllerField.value)
                                    : ''
                                }
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn địa chỉ giao hàng" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {addressShipOptions.map((option) => (
                                    <SelectItem
                                      key={option.id}
                                      value={String(option.id)}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loại Hình Kinh doanh</FormLabel>
                          <Controller
                            name="businessType"
                            control={form.control}
                            render={({ field: controllerField }) => (
                              <Select
                                onValueChange={controllerField.onChange}
                                value={controllerField.value || ''}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn loại hình kinh doanh" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="INDIVIDUAL">
                                    Cá nhân
                                  </SelectItem>
                                  <SelectItem value="BUSINESS_HOUSEHOLD">
                                    Hộ kinh doanh
                                  </SelectItem>
                                  <SelectItem value="COMPANY">
                                    Công ty
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="taxCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mã Số Thuế</FormLabel>
                          <Input placeholder="Nhập mã số thuế" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel className="mb-3 block">
                        Phương Thức Thanh Toán
                      </FormLabel>
                      <div className="space-y-3">
                        {['COD', 'SEPAY', 'WEB3'].map((method) => (
                          <Controller
                            key={method}
                            name="paymentMethods"
                            control={form.control}
                            render={({ field }) => {
                              const isChecked = field.value?.includes(method);
                              return (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        const current = field.value || [];
                                        if (checked) {
                                          field.onChange([...current, method]);
                                        } else {
                                          field.onChange(
                                            current.filter(
                                              (item) => item !== method,
                                            ),
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {method === 'COD'
                                      ? 'Thanh toán khi nhận hàng'
                                      : method === 'SEPAY'
                                        ? 'Chuyển khoản ngân hàng'
                                        : 'Web3 / Crypto'}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage>
                        {form.formState.errors.paymentMethods?.message}
                      </FormMessage>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <FormLabel className="mb-3 block">
                        Chọn Loại Giao Hàng
                      </FormLabel>
                      <div className="space-y-3">
                        {deliveryTypes.map((delivery) => (
                          <Controller
                            key={delivery.id}
                            name="deliveryTypeIds"
                            control={form.control}
                            render={({ field }) => {
                              const isChecked = field.value?.includes(
                                delivery.id,
                              );
                              return (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        const current = field.value || [];
                                        if (checked) {
                                          field.onChange([
                                            ...current,
                                            delivery.id,
                                          ]);
                                        } else {
                                          field.onChange(
                                            current.filter(
                                              (id) => id !== delivery.id,
                                            ),
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {delivery.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage>
                        {form.formState.errors.deliveryTypeIds?.message}
                      </FormMessage>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className="flex-1 bg-transparent"
                  >
                    <Icon
                      icon="mdi:chevron-left"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Quay lại
                  </Button>

                  {currentStep < 2 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1"
                    >
                      Tiếp tục
                      <Icon
                        icon="mdi:chevron-right"
                        width={20}
                        height={20}
                        className="ml-2"
                      />
                    </Button>
                  ) : (
                    <Button type="submit" className="flex-1">
                      <Icon
                        icon="mdi:check"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Đăng ký Cửa hàng
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface AddAddressFormProps {
  onSubmit: (address: any) => void;
  onCancel: () => void;
}

export function AddAddressForm({ onSubmit, onCancel }: AddAddressFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    address: '',
    addressType: 'home',
    isDefault: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Họ và tên:
            </Label>
            <Input
              id="name"
              placeholder="Nhập họ và tên"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-foreground"
            >
              Số điện thoại:
            </Label>
            <Input
              id="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Province Field */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Tỉnh/Thành phố:
            </Label>
            <Select
              value={formData.province}
              onValueChange={(value) => handleInputChange('province', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                <SelectItem value="hanoi">Hà Nội</SelectItem>
                <SelectItem value="danang">Đà Nẵng</SelectItem>
                <SelectItem value="cantho">Cần Thơ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* District Field */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Quận huyện:
            </Label>
            <Select
              value={formData.district}
              onValueChange={(value) => handleInputChange('district', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn Quận/Huyện" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1">Quận 1</SelectItem>
                <SelectItem value="q3">Quận 3</SelectItem>
                <SelectItem value="govap">Quận Gò Vấp</SelectItem>
                <SelectItem value="binhthanh">Quận Bình Thạnh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ward Field */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Phường xã:
            </Label>
            <Select
              value={formData.ward}
              onValueChange={(value) => handleInputChange('ward', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn Phường/Xã" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p1">Phường 1</SelectItem>
                <SelectItem value="p2">Phường 2</SelectItem>
                <SelectItem value="p25">Phường 25</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-foreground"
            >
              Địa chỉ:
            </Label>
            <Textarea
              id="address"
              placeholder="Nhập địa chỉ"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full min-h-[100px] resize-none"
            />
          </div>

          {/* Address Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Loại địa chỉ:
            </Label>
            <RadioGroup
              value={formData.addressType}
              onValueChange={(value) => handleInputChange('addressType', value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id="home" />
                <Label
                  htmlFor="home"
                  className="text-sm font-normal cursor-pointer"
                >
                  Nhà riêng / Chung cư
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="office" id="office" />
                <Label
                  htmlFor="office"
                  className="text-sm font-normal cursor-pointer"
                >
                  Cơ quan / Công ty
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Default Address Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="default"
              checked={formData.isDefault}
              onCheckedChange={(checked) =>
                handleInputChange('isDefault', checked as boolean)
              }
            />
            <Label
              htmlFor="default"
              className="text-sm font-normal cursor-pointer"
            >
              Đặt làm địa chỉ mặc định
            </Label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-2"
            >
              Cập nhật
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

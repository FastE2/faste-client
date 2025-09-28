'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Footer = React.memo(
  () => {
    return (
      <footer className="bg-background border-t border-border">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          {/* Main footer content */}
          {/* Newsletter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">
                Join our newsletter for £10 offs
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Register now to get latest updates on promotions & coupons.
                Don&apos;t worry, we not spam!
              </p>
            </div>
            <div className="flex-1">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1"
                />
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                  SEND
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                By subscribing, you agree to our{' '}
                <a href="#" className="text-purple-600 hover:underline">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-600 hover:underline">
                  Privacy & Cookies Policy
                </a>
                .
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Do You Need Help Section */}
            <div>
              <h4 className="font-semibold mb-4">Do You Need Help ?</h4>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Autoseeker car, help desk always help you for create invoice.
                  Need help?
                </p>
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

            {/* Make Money with Us */}
            <div>
              <h4 className="font-semibold mb-4">Make Money with Us</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sell on Gorgon
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sell Your Brand on Gorgon
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sell on Gorgon Business
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sell Your Apps on Gorgon
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Become an Affiliate
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Advertise Your Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sell-Publish with Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Become an Blowwe Vendor
                  </a>
                </li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div>
              <h4 className="font-semibold mb-4">Let Us Help You</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Accessibility Statement
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Your Orders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Shipping Rates & Policies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Gorgon Prime
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Returns & Replacements
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Manage Your Content and Devices
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Your Account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Get to Know Us & Download App */}
            <div>
              <h4 className="font-semibold mb-4">Get to Know Us</h4>
              <ul className="space-y-2 text-sm mb-6">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers for Gorgon
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About Gorgon
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Investor Relations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Gorgon Devices
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Customer reviews
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Social Responsibility
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Store Locations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div>
                <h4 className="font-semibold mb-4">Download our app</h4>
                <div className="space-y-2">
                  <a href="#" className="block">
                    <div className="bg-black text-white rounded-lg px-4 py-2 text-xs flex items-center gap-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center">
                        <Icon
                          icon="logos:google-play-icon"
                          width="24"
                          height="24"
                        />
                      </div>
                      <div>
                        <div className="text-xs opacity-75">GET IT ON</div>
                        <div className="font-semibold">Google Play</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block">
                    <div className="bg-black text-white rounded-lg px-4 py-2 text-xs flex items-center gap-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center">
                        <Icon icon="ic:baseline-apple" width="24" height="24" />
                      </div>
                      <div>
                        <div className="text-xs opacity-75">
                          Download on the
                        </div>
                        <div className="font-semibold">App Store</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-3">
                  Follow us on social media:
                </p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700"
                  >
                    <Icon icon="line-md:facebook" width="24" height="24" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800"
                  >
                    <Icon icon="prime:twitter" width="14" height="14" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white"
                  >
                    <Icon icon="lets-icons:insta" width="24" height="24" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800"
                  >
                    <Icon icon="ri:linkedin-fill" width="24" height="24" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section with payment methods and copyright */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Payment methods */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Image
                    src={'/svgs/visa.svg'}
                    alt="visa"
                    width={50}
                    height={50}
                  />
                  <Image
                    src={'/svgs/List Item SVG.svg'}
                    alt="itemlogo"
                    width={50}
                    height={50}
                  />
                  <Image
                    src={'/svgs/paypal.svg'}
                    alt="paypal"
                    width={50}
                    height={50}
                  />
                  <Image
                    src={'/svgs/klarna.svg'}
                    alt="klarna"
                    width={50}
                    height={50}
                  />
                  <Image
                    src={'/svgs/skrill.svg'}
                    alt="skrill"
                    width={50}
                    height={50}
                  />
                </div>
              </div>

              {/* Copyright and links */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-muted-foreground">
                <p>
                  Copyright 2024 © Blowwe WooCommerce WordPress Theme. All
                  right reserved. Powered by Ecomify Themes.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-foreground">
                    Terms and Conditions
                  </a>
                  <a href="#" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-foreground">
                    Order Tracking
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  },
  () => true,
);

Footer.displayName = 'Footer';

export default Footer;

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Phone, MapPin, Clock, Linkedin, Twitter } from 'lucide-react';

/**
 * Contact Page Component
 *
 * A production-ready contact form with:
 * - Two-column layout (form + company info) on desktop, single column on mobile
 * - React Hook Form validation with inline error messages
 * - Loading and success/error states
 * - Accessible form fields with ARIA attributes
 * - Responsive design with Tailwind CSS
 *
 * Usage: Place in app/contact/page.tsx
 *
 * TODO: Replace the mockSubmitForm function with your actual API call
 * Example: const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
 */

interface ContactFormData {
  fullName: string;
  email: string;
  subject?: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  /**
   * Mock submit function - replace with actual API call
   * Simulates a 2-second network delay
   */
  const mockSubmitForm = async (data: ContactFormData): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo purposes
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Failed to send message. Please try again.'));
        }
      }, 2000);
    });
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // TODO: Replace mockSubmitForm with your actual API endpoint
      await mockSubmitForm(data);

      setSubmitStatus('success');
      reset();

      // Auto-dismiss success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? We&apos;d love to hear
            from you. Send us a message and we&apos;ll respond as soon as
            possible.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Card */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-foreground"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    aria-invalid={errors.fullName ? 'true' : 'false'}
                    aria-describedby={
                      errors.fullName ? 'fullName-error' : undefined
                    }
                    {...register('fullName', {
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Full name must be at least 2 characters',
                      },
                    })}
                  />
                  {errors.fullName && (
                    <p
                      id="fullName-error"
                      className="text-sm text-destructive font-medium"
                      role="alert"
                    >
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground"
                  >
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-sm text-destructive font-medium"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject Field (Optional) */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground"
                  >
                    Subject{' '}
                    <span className="text-muted-foreground text-xs">
                      (Optional)
                    </span>
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    {...register('subject')}
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters',
                      },
                    })}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-sm text-destructive font-medium"
                      role="alert"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Success Alert */}
                {submitStatus === 'success' && (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <AlertDescription>
                      ✓ Your message has been sent successfully! We&apos;ll be
                      in touch soon.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Error Alert */}
                {submitStatus === 'error' && (
                  <Alert className="bg-red-50 border-red-200 text-red-800">
                    <AlertDescription>✗ {errorMessage}</AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⏳</span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Company Info & Map */}
          <div className="space-y-6">
            {/* Company Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Address
                    </h3>
                    <p className="text-muted-foreground">
                      123 Business Street
                      <br />
                      San Francisco, CA 94105
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+14155551234"
                      className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded px-1"
                    >
                      +1 (415) 555-1234
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:hello@example.com"
                      className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded px-1"
                    >
                      hello@example.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-4">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Business Hours
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Monday - Friday: 9:00 AM - 6:00 PM PST
                      <br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="overflow-hidden">
              <div className="w-full h-80 bg-muted flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.41846951726!2d106.36557944642779!3d10.755292848243197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1773160351548!5m2!1svi!2s"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { APOLOGY_REPLIES, THANK_YOU_REPLIES } from '@/constants/replies';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const replySchema = yup
  .object()
  .shape({ content: yup.string().required().min(5) });
export const ReplyModal = ({
  review,
  open,
  onOpenChange,
  onSubmitSuccess,
}: any) => {
  const form = useForm({ resolver: yupResolver(replySchema) });
  const [isLoading, setIsLoading] = useState(false);
  const suggestionsReply = 5 >= 4 ? THANK_YOU_REPLIES : APOLOGY_REPLIES;

  useEffect(() => {
    if (open && review)
      form.reset({ content: review.sellerReply?.content || '' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, review]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // await api.replyReview(review.id, data.content);
    onSubmitSuccess(review.id, data.content);
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Phản hồi đánh giá #{review?.id}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Nhập câu trả lời..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              {suggestionsReply.map((t) => (
                <Badge
                  key={`suggest-${t}`}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => form.setValue('content', t)}
                >
                  {t}
                </Badge>
              ))}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Đang gửi...' : 'Gửi'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

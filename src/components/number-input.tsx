import { cn } from '@/lib/utils';
import { Input } from './ui/input';

export function NumberInput({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <Input
      type="number"
      className={cn(
        'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0',
        className,
      )}
      {...props}
    />
  );
}

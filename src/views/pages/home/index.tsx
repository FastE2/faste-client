import CartProduct from '@/components/CardProduct';
import ExampleClientComponent from '@/components/ExampleClientComponent';
import CardCategory from './partials/CardCategory';

interface TProps {
  data: [];
  totalItem: number;
  page: number;
  limit: number;
  totalPage: number;
}

const HomePage = (props: TProps) => {
  const { data: products, limit, page, totalItem, totalPage } = props;
  return (
    <>
      <div className="container mx-auto max-w-6xl px-4">
        <CardCategory />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {products.map((product, index) => (
            <CartProduct key={index} data={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;

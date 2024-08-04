import Button from '@/components/button';
import Textfield from '@/components/input/Textfield';
import Layout from '@/layout';

interface HomeProps {}

const Home = () => {
  return (
    <Layout>
      <p>Hom</p>
      <Textfield value="123" />
      <Textfield value="123" label labelText="Name" />
      <Button text="123" />
    </Layout>
  );
};

export default Home;

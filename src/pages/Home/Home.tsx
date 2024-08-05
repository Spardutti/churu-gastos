import Form from '@/components/form';
import Layout from '@/layout';

interface HomeProps {}

const inputs = [
  {
    type: 'text',
    value: '',
    label: 'Expense Name',
    name: 'expense',
    placeholder: 'Enter expense name',
  },
];

type FormData = {
  // specify your form fields here

  name: string;
  category: string;
  amount: number;
};

const Home = () => {
  const submit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="shadow-lg p-4 rounded-lg min-w-[400px] bg-main-primary">
          <Form submit={submit} inputs={inputs} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { generateClient } from 'aws-amplify/data';
import Content from './components/Content';
Amplify.configure(outputs);
export default async function Home() {
  const client = generateClient();

  const { data } = await client.models.Tournament.list();

  return <Content data={data}></Content>;
}

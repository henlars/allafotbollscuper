import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { generateClient } from 'aws-amplify/data';
import Content from './components/Content';
Amplify.configure(outputs);
export default async function Home() {
  const client = generateClient();

  let nextToken = null;
  let allData = [];

  do {
    const { data, nextToken: newNextToken } =
      await client.models.Tournament.list({
        nextToken,
      });

    allData = allData.concat(data);
    nextToken = newNextToken;
  } while (nextToken);

  return <Content data={allData}></Content>;
}

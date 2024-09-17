import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
/* import initialData from '../../api/cuper2024.json';
 */
const tableName = 'Tournament-7o6tvbawmba43jgqg5z2xvmysq-NONE';

const ddbClient = new AWS.DynamoDB.DocumentClient({
  region: 'eu-north-1',
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
});

export default function Batch() {
  const batchSize = 25;

  const batchWriteRequests = [];
  /* let data = initialData; */
  let data = [];
  while (data.length > 0) {
    const currentBatch = data.slice(0, batchSize);
    const batchWriteRequest = {
      RequestItems: {
        [tableName]: currentBatch.map((item) => ({
          PutRequest: {
            Item: {
              id: uuidv4(),
              ...item,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          },
        })),
      },
    };
    batchWriteRequests.push(batchWriteRequest);
    data = data.slice(batchSize);
  }

  const runBatch = async () => {
    for (const batchWriteRequest of batchWriteRequests) {
      await new Promise((resolve, reject) => {
        ddbClient.batchWrite(batchWriteRequest, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }
  };

  return (
    <div>
      <button onClick={runBatch}>Run Batch</button>
    </div>
  );
}

import { generateClient } from 'aws-amplify/data';

const client = generateClient();

export default function Create() {
  const createTodo = async () => {
    await client.models.Tournament.create({
      name: 'sdf',
      month: 'a.string()',
      club: 'a.string()',
      date: 'a.string()',
      category: 'a.string()',
      link: 'a.string()',
    });
  };

  return (
    <div>
      <button onClick={createTodo}>Add new todo</button>
    </div>
  );
}

import { useState } from 'react';
import { useLinera } from '@linera/react';
import { encryptMessage, generateKeyPair } from './utils/crypto';
import Inbox from './components/Inbox';
import Compose from './components/Compose';

function App() {
  const { contract } = useLinera();
  const [username, setUsername] = useState('');
  const [pubkey, setPubkey] = useState('');
  const [registered, setRegistered] = useState(false);

  const register = async () => {
    const { pub } = await generateKeyPair();
    await contract.register(username, pub);
    setPubkey(pub);
    setRegistered(true);
    localStorage.setItem('chainmail_user', JSON.stringify({ username, pubkey: pub }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">ChainMail</h1>

      {!registered ? (
        <div className="space-y-4">
          <input
            placeholder="Choose @username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <button onClick={register} className="btn">Register</button>
        </div>
      ) : (
        <>
          <p className="text-sm">Logged in as @{username}</p>
          <Compose username={username} pubkey={pubkey} />
          <Inbox username={username} privkey={pubkey} />
        </>
      )}
    </div>
  );
}

export default App;

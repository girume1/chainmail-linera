import { useState } from 'react';
import { useLinera } from '@linera/react';
import { encryptMessage } from '../utils/crypto';

export default function Compose({ username }: { username: string }) {
  const { contract } = useLinera();
  const [to, setTo] = useState('');
  const [msg, setMsg] = useState('');

  const send = async () => {
    const pubkeyRes = await contract.query(`public_keys(${to})`);
    if (!pubkeyRes) return alert('User not found');

    const { ciphertext, nonce } = encryptMessage(pubkeyRes, msg);
    await contract.send(to, ciphertext, nonce, username);
    setMsg('');
  };

  return (
    <div className="mt-6 space-y-2">
      <input placeholder="@recipient" value={to} onChange={e => setTo(e.target.value)} className="input" />
      <textarea placeholder="Your encrypted message..." value={msg} onChange={e => setMsg(e.target.value)} className="input h-20" />
      <button onClick={send} className="btn">Send</button>
    </div>
  );
}

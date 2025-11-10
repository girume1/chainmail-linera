import { useEffect, useState } from 'react';
import { useLinera } from '@linera/react';
import { decryptMessage } from '../utils/crypto';

export default function Inbox({ username, privkey }: { username: string; privkey: string }) {
  const { contract } = useLinera();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const poll = async () => {
      const inbox = await contract.query(`inboxes(${username})`);
      if (inbox) {
        const decrypted = inbox.map((m: any) => ({
          ...m,
          plaintext: decryptMessage(privkey, m.ciphertext, m.nonce),
        }));
        setMessages(decrypted);
      }
    };
    poll();
    const id = setInterval(poll, 5000);
    return () => clearInterval(id);
  }, [username, privkey]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Inbox</h2>
      {messages.map((m, i) => (
        <div key={i} className="p-3 bg-gray-100 rounded mt-2">
          <p className="text-sm font-mono">From: @{m.sender}</p>
          <p>{m.plaintext}</p>
        </div>
      ))}
    </div>
  );
}

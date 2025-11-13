import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const APP_ID = import.meta.env.VITE_APP_ID;

interface Message {
  from: string;
  msg: string;
}

function App() {
  const [username, setUsername] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [inbox, setInbox] = useState<Message[]>([]);
  const [publicKey, setPublicKey] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem(username);
    if (saved) {
      const { pub, priv } = JSON.parse(saved);
      setPublicKey(pub);
      setPrivateKey(priv);
      pollInbox();
    }
  }, [username]);

  const register = () => {
    const { pub, priv } = generateKeyPair();
    localStorage.setItem(username, JSON.stringify({ pub, priv }));
    setPublicKey(pub);
    setPrivateKey(priv);
    // In real app: publish pubkey to chain
  };

  const generateKeyPair = () => {
    const priv = CryptoJS.lib.WordArray.random(32).toString();
    const pub = CryptoJS.SHA256(priv).toString();
    return { pub, priv };
  };

  const decryptMessage = (encrypted: string, privateKey: string) => {
    const key = CryptoJS.SHA256(privateKey).toString();
    const bytes = CryptoJS.AES.decrypt(encrypted, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const send = async () => {
    const recipientPub = prompt("Paste Bob's public key:");
    if (!recipientPub) return;
    const encrypted = CryptoJS.AES.encrypt(message, recipientPub).toString();
    // In real app: publish to chain
    alert("Sent! (simulated)");
  };

  const pollInbox = () => {
    // In real app: query chain
    setTimeout(() => setInbox([{ from: 'alice', msg: 'encrypted_data' }]), 1000);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">ChainMail</h1>

      {!username ? (
        <div>
          <input
            placeholder="Choose username @..."
            className="input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={register} className="btn">Register</button>
        </div>
      ) : (
        <div>
          <p>Logged in as <strong>@{username}</strong></p>
          <p className="text-sm text-gray-600">Pub: {publicKey.slice(0, 16)}...</p>

          <div className="mt-6">
            <input placeholder="@recipient" onChange={(e) => setRecipient(e.target.value)} className="input" />
            <textarea placeholder="Your message..." onChange={(e) => setMessage(e.target.value)} className="input h-24" />
            <button onClick={send} className="btn">Send</button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">Inbox</h2>
            {inbox.map((m: Message, i: number) => (
              <div key={i} className="p-2 border rounded mt-2">
                <strong>From @{m.from}:</strong> {privateKey ? decryptMessage(m.msg, privateKey) : m.msg}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
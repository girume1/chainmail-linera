use linera_sdk::{
    views::{MapView, ViewStorageContext},
    Contract, ContractRuntime, SimpleStateStorage,
};
use serde::{Deserialize, Serialize};

linera_sdk::contract!(ChainMail);

#[derive(Clone)]
pub struct ChainMail {
    pub public_keys: MapView<String, String>,
    pub inboxes: MapView<String, Vec<EncryptedMessage>>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct EncryptedMessage {
    pub sender: String,
    pub ciphertext: String,
    pub nonce: String,
}

impl Contract for ChainMail {
    type Message = Message;
    type Parameters = ();
    type InstantiationArgument = ();

    async fn instantiate(
        &mut self,
        _runtime: ContractRuntime<Self>,
        _argument: Self::InstantiationArgument,
    ) -> Result<(), anyhow::Error> {
        Ok(())
    }

    async fn execute_message(
        &mut self,
        _runtime: ContractRuntime<Self>,
        message: Self::Message,
    ) -> Result<(), anyhow::Error> {
        match message {
            Message::Register { username, pubkey } => {
                self.public_keys.insert(&username, &pubkey).await?;
            }
            Message::Send {
                to,
                ciphertext,
                nonce,
                sender,
            } => {
                let mut inbox = self.inboxes.get(&to).await?.unwrap_or_default();
                inbox.push(EncryptedMessage {
                    sender: sender.clone(),
                    ciphertext,
                    nonce,
                });
                self.inboxes.insert(&to, &inbox).await?;
            }
        }
        Ok(())
    }
}

#[derive(Serialize, Deserialize)]
pub enum Message {
    Register { username: String, pubkey: String },
    Send {
        to: String,
        ciphertext: String,
        nonce: String,
        sender: String,
    },
}

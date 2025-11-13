use linera_sdk::{
    base::{Amount, ApplicationId, ChainId, Owner},
    contract::system_api,
    views::{MapView, ViewStorageContext},
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Message {
    pub sender: Owner,
    pub recipient: Owner,
    pub content: String,
    pub timestamp: u64,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ChainmailState {
    pub messages: HashMap<Owner, Vec<Message>>,  // Map recipient to their messages
}

impl ChainmailState {
    pub fn new() -> Self {
        Self {
            messages: HashMap::new(),
        }
    }

    pub fn send_message(&mut self, message: Message) {
        self.messages
            .entry(message.recipient.clone())
            .or_insert_with(Vec::new)
            .push(message);
    }

    pub fn get_messages(&self, recipient: &Owner) -> Vec<Message> {
        self.messages.get(recipient).cloned().unwrap_or_default()
    }
}

// Contract struct (implement Linera's Contract trait)
pub struct ChainmailContract {
    pub state: ChainmailState,
}

impl linera_sdk::contract::Contract for ChainmailContract {
    type Parameters = ();
    type InstantiationArgument = ();
    type Operation = Operation;
    type Message = Message;

    async fn instantiate(
        &mut self,
        _argument: Self::InstantiationArgument,
    ) -> Result<(), linera_sdk::contract::ContractError> {
        // Initialize state
        self.state = ChainmailState::new();
        Ok(())
    }

    async fn execute_operation(
        &mut self,
        operation: Self::Operation,
    ) -> Result<(), linera_sdk::contract::ContractError> {
        match operation {
            Operation::SendMessage(message) => {
                self.state.send_message(message);
                Ok(())
            }
            Operation::GetMessages { recipient } => {
                // Note: This is a read-only op; in Linera, queries handle reads
                Ok(())
            }
        }
    }

    async fn execute_message(
        &mut self,
        message: Self::Message,
    ) -> Result<(), linera_sdk::contract::ContractError> {
        self.state.send_message(message);
        Ok(())
    }
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub enum Operation {
    SendMessage(Message),
    GetMessages { recipient: Owner },
}
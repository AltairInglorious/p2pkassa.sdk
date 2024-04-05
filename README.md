# Intro

This is an SDK for P2PKassa for Typescript.

# Usage

## Generating invoice link

```typescript
if(!process.env.PROJECT_ID){
  throw new Error('PROJECT_ID environment variable not found!')
}
if(!process.env.API_TOKEN){
  throw new Error('API_TOKEN environment variable not found!')
}

if(Number.isNaN(Number(process.env.PROJECT_ID))){
  throw new Error("PROJECT_ID environment variable must be a number")
}

const orderId = 100200300; // Must be a number for P2PKassa
const amount = 100;

const sdk = new P2PKassaSDK(Number(process.env.PROJECT_ID), process.env.API_TOKEN);
const invoice = await sdk.createInvoice(orderId, amount, "RUB");
console.log(invoice.link);
```

## Generating invoice link (for uuid)

In this case uuid will be placed inside `data.uuid` property of generated invoice and must be gotten later
from `data.uuid` property

```typescript
import {randomUUID} from "node:crypto";

if (!process.env.PROJECT_ID) {
  throw new Error('PROJECT_ID environment variable not found!')
}
if (!process.env.API_TOKEN) {
  throw new Error('API_TOKEN environment variable not found!')
}

if (Number.isNaN(Number(process.env.PROJECT_ID))) {
  throw new Error("PROJECT_ID environment variable must be a number")
}

const orderId = randomUUID(); // Must be a number for P2PKassa
const amount = 100;

const sdk = new P2PKassaSDK(Number(process.env.PROJECT_ID), process.env.API_TOKEN);
const invoice = await sdk.createInvoiceUuid(orderId, amount, "RUB");
console.log(invoice.link);
```

## Checking webhook

```typescript
if(!process.env.PROJECT_ID){
  throw new Error('PROJECT_ID environment variable not found!')
}
if(!process.env.API_TOKEN){
  throw new Error('API_TOKEN environment variable not found!')
}

if(Number.isNaN(Number(process.env.PROJECT_ID))){
  throw new Error("PROJECT_ID environment variable must be a number")
}

const app = express();
const sdk = new P2PKassaSDK(Number(process.env.PROJECT_ID), process.env.API_TOKEN);

app.post('/p2pkassa/webhook', async (req, res) => {
  const webhookData = await req.json();
  if(!sdk.checkWebhook(webhookData)){
    res.sendStatus(403);
    return;
  }
  
  // Webhook are valid
  console.log(webhookData)
});

app.listen(process.env.PORT || 3000);
```

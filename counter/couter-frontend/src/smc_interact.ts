import { useCurrentAccount, useSuiClientQuery, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
// import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
// import { fromB64 } from '@mysten/sui.js/utils';

// Configuration
const PACKAGE_ID = 'YOUR_PACKAGE_ID'; // Replace with your package ID
const COUNTER_MODULE = 'counter';
const COUNTER_TYPE = `${PACKAGE_ID}::${COUNTER_MODULE}::Counter`;

// // Initialize client
const client = useSuiClient();

// // Load keypair
// const privateKey = 'YOUR_PRIVATE_KEY'; // Replace with your private key
// const keypair = Ed25519Keypair.fromSecretKey(fromB64(privateKey).slice(1));

async function createCounter() {
    const txb = new Transaction();
    txb.moveCall({
        target: `${PACKAGE_ID}::${COUNTER_MODULE}::create`,
    });
    
    const result = await client.signAndExecuteTransaction({
        transaction: txb,
        signer: keypair,
    });
    
    console.log('Counter created:', result);
    return result;
}

async function incrementCounter(counterId: string) {
    const txb = new TransactionBlock();
    txb.moveCall({
        target: `${PACKAGE_ID}::${COUNTER_MODULE}::increment`,
        arguments: [txb.object(counterId)],
    });
    
    const result = await client.signAndExecuteTransactionBlock({
        transactionBlock: txb,
        signer: keypair,
    });
    
    console.log('Counter incremented:', result);
    return result;
}

async function decrementCounter(counterId: string) {
    const txb = new TransactionBlock();
    txb.moveCall({
        target: `${PACKAGE_ID}::${COUNTER_MODULE}::decrement`,
        arguments: [txb.object(counterId)],
    });
    
    const result = await client.signAndExecuteTransactionBlock({
        transactionBlock: txb,
        signer: keypair,
    });
    
    console.log('Counter decremented:', result);
    return result;
}

async function resetCounter(counterId: string) {
    const txb = new TransactionBlock();
    txb.moveCall({
        target: `${PACKAGE_ID}::${COUNTER_MODULE}::reset`,
        arguments: [txb.object(counterId)],
    });
    
    const result = await client.signAndExecuteTransactionBlock({
        transactionBlock: txb,
        signer: keypair,
    });
    
    console.log('Counter reset:', result);
    return result;
}

async function main() {
    try {
        // Create a new counter
        const creationResult = await createCounter();
        const counterId = creationResult.objectChanges?.find(
            (change) => change.type === 'created' && change.objectType === COUNTER_TYPE
        )?.objectId;
        
        if (!counterId) {
            throw new Error('Counter ID not found in creation result');
        }

        // Interact with the counter
        await incrementCounter(counterId);
        await incrementCounter(counterId);
        await decrementCounter(counterId);
        await resetCounter(counterId);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
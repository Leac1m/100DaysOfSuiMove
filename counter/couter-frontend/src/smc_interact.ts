import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

// Configuration
const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID; // Replace with your package ID

if (!PACKAGE_ID) throw Error("Package ID not found");

const COUNTER_MODULE = 'counter';
const COUNTER_TYPE = `${PACKAGE_ID}::${COUNTER_MODULE}::Counter`;

export function useCounter() {
    const account = useCurrentAccount();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();

    async function createCounter() {
        try {
            if (!account) throw new Error('No account connected');
            
            const txb = new Transaction();
            txb.moveCall({
                target: `${PACKAGE_ID}::${COUNTER_MODULE}::create`,
            });
            
            console.log('Creating counter...');
            const result = await signAndExecute({
                transaction: txb,
            });
            console.log('Counter created successfully:', result);
            return result;
        } catch (error) {
            console.error('Error creating counter:', error);
            throw error;
        }
    }

    async function incrementCounter(counterId: string) {
        try {
            if (!account) throw new Error('No account connected');
            
            const txb = new Transaction();
            txb.moveCall({
                target: `${PACKAGE_ID}::${COUNTER_MODULE}::increment`,
                arguments: [txb.object(counterId)],
            });
            
            console.log(`Incrementing counter ${counterId}...`);
            const result = await signAndExecute({
                transaction: txb,
            });
            console.log('Counter incremented successfully:', result);
            return result;
        } catch (error) {
            console.error('Error incrementing counter:', error);
            throw error;
        }
    }

    async function decrementCounter(counterId: string) {
        try {
            if (!account) throw new Error('No account connected');
            
            const txb = new Transaction();
            txb.moveCall({
                target: `${PACKAGE_ID}::${COUNTER_MODULE}::decrement`,
                arguments: [txb.object(counterId)],
            });
            
            console.log(`Decrementing counter ${counterId}...`);
            const result = await signAndExecute({
                transaction: txb,
            });
            console.log('Counter decremented successfully:', result);
            return result;
        } catch (error) {
            console.error('Error decrementing counter:', error);
            throw error;
        }
    }

    async function resetCounter(counterId: string) {
        try {
            if (!account) throw new Error('No account connected');
            
            const txb = new Transaction();
            txb.moveCall({
                target: `${PACKAGE_ID}::${COUNTER_MODULE}::reset`,
                arguments: [txb.object(counterId)],
            });
            
            console.log(`Resetting counter ${counterId}...`);
            const result = await signAndExecute({
                transaction: txb,
            });
            console.log('Counter reset successfully:', result);
            return result;
        } catch (error) {
            console.error('Error resetting counter:', error);
            throw error;
        }
    }

    return {
        createCounter,
        incrementCounter,
        decrementCounter,
        resetCounter,
    };
}
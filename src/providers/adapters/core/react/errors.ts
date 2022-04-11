import { WalletError } from 'providers/adapters/core/base';

export class WalletNotSelectedError extends WalletError {
    name = 'WalletNotSelectedError';
}

import { Storage } from 'appwrite';
import storage from '../appwrite';

describe('appwrite', () => {
    test('should return a storage connection', () => {
        expect(storage).toBeInstanceOf(Storage);
    });
});

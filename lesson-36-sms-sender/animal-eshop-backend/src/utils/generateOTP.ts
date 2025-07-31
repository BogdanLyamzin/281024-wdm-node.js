import { customAlphabet } from 'nanoid';

const numbers = '0123456789';

const generateOTP = customAlphabet(numbers, 6);

export default generateOTP;

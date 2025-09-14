import crypto from 'crypto';


// Generate Hash (Password)
export function generateHash(data){
    return (crypto.createHash('sha256').update(data).digest('hex'));
}

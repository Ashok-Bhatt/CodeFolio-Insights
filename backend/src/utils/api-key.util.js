import { v4 as uuid } from 'uuid';

const generateApiKey = () => {
    return uuid().replace(/-/g, '');
}

export {
    generateApiKey
}
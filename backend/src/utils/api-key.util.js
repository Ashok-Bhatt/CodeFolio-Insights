import { v4 as uuidv4 } from 'uuid';

const generateApiKey = () => {
    return uuidv4().replace(/-/g, '');
}

export {
    generateApiKey
}
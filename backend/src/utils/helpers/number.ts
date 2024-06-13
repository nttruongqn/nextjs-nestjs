export const generateRandom = (length: number) => {
    let string = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        string += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return string;
};

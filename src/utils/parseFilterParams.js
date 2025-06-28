const parseType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isType = (type) => ['work', 'home', 'personal'].includes(type);

    if (isType(type)) return type;
};

const parseIsFavourite = (favourite) => {
    const isString = typeof favourite === 'string';
    if (!isString) return;
    const isFavourite = favourite.toLowerCase();
    if (isFavourite === 'true') return true;
    if (isFavourite === 'false') return false;

    return;
};



export const parseFilterParams = (query) => {
    const { type, favourite } = query;

    const parsedContactType = parseType(type);
    const parsedIsFavourite = parseIsFavourite(favourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite,
    };
};

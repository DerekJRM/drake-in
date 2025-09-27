const utils = {
    getUpdatedFields: (original, updated) => {
        const updatedFields = [];
        for (const key in updated) {
            if (updated.hasOwnProperty(key) && key !== 'id' && key !== 'newItem' && key !== 'updateableFields') {
                if (original[key] !== updated[key]) {
                    updatedFields.push(key);
                }
            }
        }
        return updatedFields;
    }
};

export { utils };
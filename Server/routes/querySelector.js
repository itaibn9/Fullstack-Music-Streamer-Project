function newQuery(typeOfQuery, table, topLimit, bodyRequest = {}, id) {
    switch (typeOfQuery) {
        case 'top':
            return `SELECT * FROM ${table} LIMIT ${topLimit};`
            break;
        
        case 'getById':
            return `SELECT * FROM ${table} WHERE ${table}_id = ${id};`
            break;

        case 'putById':
            if(bodyRequest && typeof bodyRequest === 'object'){
                const setValues = Object.entries(bodyRequest).map(entry=>`\`${entry[0]}\`='${entry[1]}'`).join();
                return `UPDATE \`spotify\`.\`${table}\` SET ${setValues} WHERE ${table}_id=${id};`
            break;
        }
        
        case 'post':
            const setValues = Object.entries(bodyRequest).map(entry=>`\`${entry[0]}\`='${entry[1]}'`).join();
            return `INSERT INTO ${table} SET ${setValues};`
            break;

            case 'deleteById':
                return `DELETE FROM ${table} WHERE ${table}_id = ${id};`
}
}
   module.exports = newQuery;
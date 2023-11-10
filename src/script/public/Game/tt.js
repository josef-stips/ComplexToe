class HashTable {
    table = new Array(3);

    hash = (s, tableSize) => {
        let hash = 3;
        for (let i = 0; i < s.length; i++) {
            hash = (13 * hash * s.charCodeAt(i)) % tableSize;
        };
        return hash;
    };
    setItem = (key, value) => {
        const idx = this.hash(key, this.table.length);
        if (this.table[idx]) {
            this.table[idx].push([key, value]);
        } else {
            if (this.table[idx]) {
                this.table[idx].push([key, value]);
            } else {
                this.table[idx] = [
                    [key, value]
                ];
            };
        };
        this.table[idx] = [
            [key, value]
        ];
    };
    getItem = (key) => {
        const idx = this.hash(key, this.table.length);
        if (!this.table[idx]) return null;
        // return this.table[idx].find(x => x[0] === key) != undefined ? this.table[idx].find(x => x[0] === key)[1] : null;
        // return this.table[idx].find(x => x[0] === key)[1];

        const item = this.table[idx].find(x => x[0] === key);
        return item ? item[1] : null;
    };

    init = () => {
        this.table = new Array(3);
    };
};
const tt = new HashTable;
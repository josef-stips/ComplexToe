const dbmgr = require("./dbmgr");
const db = dbmgr.db;

exports.getNames = () => {
    const sql = "SELECT * FROM userdata";
    let stmt = db.prepare(qry);
    let res = stmt.all();
    return res;
};
const oracledb = require('oracledb');
const isugf_19c=`(DESCRIPTION = 
    (ADDRESS_LIST = 
      (ADDRESS = (PROTOCOL = TCP)(HOST = 10.50.50.144)(PORT = 1521)) 
    ) 
    (CONNECT_DATA = 
      (SID = isugf) 
      (SERVER = DEDICATED) 
    ) 
  ) `;
async  function  setdata(table,  tname, page, sortname ,pagenazad){
    let connection;
    try {
        connection = await oracledb.getConnection({ user: "isugf", password: "isugf", connectionString: isugf_19c });
        console.log("Successfully connected to Oracle Database");
    } catch (err) {
        console.error(err);
    }
    return getdata(connection, table,  tname, page, sortname, pagenazad);
}

async function  getdata(data, table,  n, p, sort, nazad){
    let sql= [`SELECT *   FROM
   (SELECT ${n} , ROWNUM row_no FROM ${table}  ${sort} ) b,
   (select COUNT(*) count  from ${table}) 
   WHERE b.row_no > ${nazad} and b.row_no <=${p}`];
    console.log(sql[0])

    let result  = await data.execute(
      sql[0],
        [],
        { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet;
    let row;
    row =await rs.getRows();
    await rs.close();
    console.log(row)
    return row;
}

module.exports=setdata;

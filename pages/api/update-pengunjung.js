//@ts-check

import { db } from "../../lib/db";   
    
    const handler = async(req,res) => {
        const {Nama, Umur, Alamat, Email, foto} = req.body;

        try {
            if (!Nama || !Umur || !Alamat || !Email) {
                return res 
                .status(400)
                .json({message: 'isian tidak boleh kosong'})
            }
            //const result = await sql query(`
            const result = await db.query(
                `UPDATE pengunjung set Nama = ?, Umur = ?, Alamat = ?, Email = ?, foto = ?
                WHERE Nama = ?` ,[Nama, Umur, Alamat, Email, foto, Nama]
            );

            return res.json(result)
        }catch (e) {
            res.status(500).json({message: e.message});
        }
    };

    export default handler;
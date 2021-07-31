//@ts-check

import { db } from "../../lib/db";

const handler = async(req,res) => {
const {Nama, Umur, Alamat, Email, foto} = req.body;
try {
    if (!Nama || !Umur || !Alamat || !Email){
        return res
            .status(400)
            .json({message: 'Input harus di isi semua ya'})
    }

            const result = await db.query(`
    INSERT INTO pengunjung (Nama, Umur, Alamat, Email, foto) VALUES (?,?,?,?,?)`,[Nama, Umur, Alamat, Email, foto]
    );
        await db.end;

    return res.json(result)
    } catch (e) {
     res.status(500).json({message: e.message});
    }
};

export default handler;
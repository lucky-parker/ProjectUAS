//@ts-check
import { db } from '../../lib/db'

const handler = async (req, res) => {
    const { Nama } = req.query
        try {
             if (!Nama) {
                 return res.status(400).json({ message: '`Nama` tidak ada'})
             }

            const result = await db.query(
            `
            DELETE FROM pengunjung
            WHERE Nama = ?` ,Nama)
            res.json(result)
        }catch (e) {
            res.status(500).json({ message: e.message})
    }
}

export default handler;
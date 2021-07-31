// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.status(200).json(
    {dataMahasiswa:[
        {name: 'Indah Pratiwi',alamat: 'Banyuwangi'},
        {name: 'Indah Kucing',alamat: 'Rogojampi'}, 
        {name: 'Indah Begini',alamat: 'Pakem'}
      ]
    }
  )
}

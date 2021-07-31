//@ts-check
import { useDataPengunjung } from "../../lib/swr-fetch"
import Link from 'next/link'
import {mutate}from 'swr';
import Router from 'next/router'

const DataPengunjung = () => {
    const {data, error} = useDataPengunjung();
    if (error){
        return <div>Error Loading</div>
    }
    if (!data){
        return <div>Loading......</div>
    
    }
    
    //console.log(data);

    async function hapusPengunjung(Nama) {
        //setDeleteing(true)
        let res = await fetch(`/api/hapus-pengunjung?Nama=${Nama}`, {method: 'DELETE'})
        let json = await res.json()
        if (!res.ok) throw Error(json.message)
        mutate('/api/hapus-pengunjung')
        //setDeleting(false)
        alert('Data Telah Terhapus')
        Router.push('/admin/datapengunjung')
    }

    return (
        <div className="container w-75 mx-auto py-4">
        <h3 className="font-bold text-center">Data Pengunjung</h3>
        <table className = "table">
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Umur</th>
                    <th>Alamat</th>
                    <th>Email</th>
                    <th>Foto</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
        
            {data.map((pgj, idx) => (
                <tr key ={idx}>

                        <td>
                            {pgj.Nama}
                        </td>
                        <td>
                            {pgj.Umur}
                        </td>
                        <td>
                            {pgj.Alamat}
                        </td>
                        <td>
                            {pgj.Email}
                        </td>
                        <td>
                            <img 
                                className="rounded-circle"
                                src={pgj.foto}
                                alt="foto"
                                style = {{width:"50px", height:"50px"}} />
                        </td>
                        <td>
                            <div className="d-flex justify-content-between">
                            <Link href={`/admin/updatepengunjung?Nama=${pgj.Nama}
                            &Umur=${pgj.Umur}&Alamat=${pgj.Alamat}&Email=${pgj.Email}`}
                            >
                                <a>Edit</a>
                            </Link>

                            <button 
                            className = "btn btn-danger"
                            value = {pgj.Nama}
                            onClick={(e)=>hapusPengunjung(e.target.value)}>
                                
                                Hapus
                                
                            </button>
                            </div>
                        </td>

                        </tr>
                        ))
                    
                    }
                    </tbody>
                </table>
            
            </div>
    );
}

export default DataPengunjung;
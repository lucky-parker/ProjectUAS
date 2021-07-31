//@ts-check

import { useEffect, useState } from "react";
import  Router , { useRouter } from "next/router";
const UpdatePengunjung = ()=>{
        const [_Nama, setNama] = useState('');
        const [_Umur, setUmur] = useState('');
        const [_Alamat, setAlamat] = useState('');
        const [_Email, setEmail] = useState('');
        const [_foto, setFoto] = useState(null);
        const [selectedFile, setSelectedFile] = useState('');
        const [file, setFile] = useState('');

        const Router = useRouter ();
        const {Nama, Umur, Alamat, Email} = Router.query;

    
    
    useEffect(( ) =>{
        if (typeof Nama == 'string'){
            setNama(Nama);
        }    
        if (typeof Umur == 'string'){
            setUmur(Umur);
        }    
        if (typeof Alamat == 'string'){
            setAlamat(Alamat);
        }    
        if (typeof Email == 'string'){
            setEmail(Email);
        }   

    },[Nama,Umur,Alamat,Email],)

    const onSelectImage = (e) =>{
        if (!e.target.files || e.target.files.length === 0){
            setSelectedFile(undefined)
            return
        }
        const _file = e.target.files[0];
        const reader = new FileReader()
        reader.onload = function(){
            setFile(_file);
            setFoto(reader.result);
        }
        reader.readAsDataURL(_file)
    }

    const submitHandler = async(e) =>{
        e.preventDefault()
        try{
            const res = await fetch('/api/update-pengunjung',{
                method: 'PATCH',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify ({
                    Nama: _Nama,
                    Umur: _Umur,
                    Alamat: _Alamat,
                    Email: _Email,
                    foto: _foto

                }),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            alert("Update Data Sukses")
            Router.push('/admin/datapengunjung')
        }catch (e) {
        throw Error(e.message)
        }
    }
    return (
        <div>
            <div className= "container mt-4"></div>
            <form className = "w-50 mx-auto" onSubmit={submitHandler}>
            <h1 className ="w-100 font-bold text-center mb-3">Edit Pengunjung</h1>

            <div className="w-100 text-center mb-3">

            <div className="w-100"></div>
                <label htmlFor="uploudGambar">
                <img 
                    
                    src ={_foto} alt ="Pilih Foto" 
                    style = {{background : "silver",
                              width : "100px", height : "100px"}} />
                    
                </label>
                <input 
                    id = "uploudGambar"
                    type="file"
                    style = {{display : "none"}}
                    onChange = {onSelectImage}/>
                
            </div>
            <div className = "form-floating">
                <input className="form-control mb-2"
                 id ="Nama"
                 type ="text"
                 placeholder = "Nama"
                 value = {_Nama}
                 onChange = {(e) => setNama(e.target.value)}
                 />
                    <label htmlFor="Nama">NAMA</label>
            </div>

            <div className = "form-floating">
                <input className="form-control mb-2"
                 id ="Umur"
                 type ="text"
                 placeholder = "Umur"
                 value = {_Umur}
                 onChange = {(e) => setUmur(e.target.value)}
                 />
                    <label htmlFor="Umur">UMUR</label>
            </div>

           
            <div className = "form-floating">
                <input className="form-control mb-2"
                 id ="Alamat"
                 type ="text"
                 placeholder ="Alamat"
                 value = {_Alamat}
                 onChange = {(e) => setAlamat(e.target.value)}
                 />
                    <label htmlFor="Alamat">ALAMAT</label>
            </div>

            <div className = "form-floating">
                <input className="form-control mb-2"
                 id ="Email"
                 type ="text"
                 placeholder="Email"
                 value = {_Email}
                 onChange = {(e) => setEmail(e.target.value)}
                 />
                    <label htmlFor="Email">EMAIL</label>
            </div>
            <div className ="d-flex flex-row-reverse">
            <button className = "btn btn-primary "
                        type = "submit"
                >
                Update
            </button>
            </div>
            </form>

        </div>
    );
}

export default UpdatePengunjung;
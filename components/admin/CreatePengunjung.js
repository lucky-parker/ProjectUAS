//@ts-check

import { useState } from "react";

const CreatePengunjung = ()=> {
    const [Nama, setNama] = useState('');
    const [Umur, setUmur] = useState('');
    const [Alamat, setAlamat] = useState('');
    const [Email, setEmail] = useState('');
    const [foto, setFoto] = useState(null);
    const [selectedFile, setSelectedFile] = useState('') ;
    const [file, setFile] =useState('');

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

    async function submitHandler(e){
        e.preventDefault()
        try{
            const res = await fetch("http://localhost:3000/api/create-pengunjung",{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    Nama,
                    Umur,
                    Alamat,
                    Email,
                    foto

                }),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            alert("Penambahan Data Sukses")
        }catch (e){
            throw Error(e.message)
        }
    }

    return (
        <div>
             <div className= "container mt-4"></div>
            <form className = "w-50 mx-auto" onSubmit={submitHandler}>
            <h1 className = "w-100 text-center">tambah pengunjung</h1>
            <div className="w-100 text-center mb-3">
                <label htmlFor="uploudGambar">
                <img 
                    
                    src ={foto} alt ="Pilih Foto" 
                    style = {{background : "gray",
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
                 value = {Nama}
                 onChange = {(e) => setNama(e.target.value)}
                 />
                    <label htmlFor="Nama">NAMA</label>
            </div>

            <div className = "form-floating">
                <input className="form-control mb-2"
                 id ="Umur"
                 type ="text"
                 placeholder = "Umur"
                 value = {Umur}
                 onChange = {(e) => setUmur(e.target.value)}
                 />
                    <label htmlFor="Umur">UMUR</label>
            </div>

           
            <div className = "form-floating">
                <input className="form-control mb-2"
                 id ="Alamat"
                 type ="text"
                 placeholder ="Alamat"
                 value = {Alamat}
                 onChange = {(e) => setAlamat(e.target.value)}
                 />
                    <label htmlFor="Alamat">ALAMAT</label>
            </div>

            
            <div className = "form-floating">
                <input className="form-control mb-2"
                 id ="Email"
                 type ="text"
                 placeholder="Email"
                 value = {Email}
                 onChange = {(e) => setEmail(e.target.value)}
                 />
                    <label htmlFor="Email">EMAIL</label>
            </div>
            <div className ="d-flex flex-row-reverse">
            <button className = "btn btn-primary "
                        type = "submit"
                >
                Simpan
            </button>
            </div>
            </form>
        </div>
    );
}


export default CreatePengunjung ;
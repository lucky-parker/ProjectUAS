//@ts-check
//import {useDataPgj} from "folder"

import DataPengunjung from "../../components/user/DataPengunjung"
import UserLayout from "../../components/user/UserLayout";

const dtpengunjung =()=>{
 
return(
    <div>
        <UserLayout>
            <div className="mb">
                <DataPengunjung/>
            </div>
        </UserLayout>
    </div>
    );

}

export default dtpengunjung ;
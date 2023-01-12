import './App.css';
import { useState, useEffect } from 'react'
import { getDatabase, onValue, ref, set, push } from "firebase/database";

let nextId = 0;
function ViewData() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setDatas] = useState([])
    useEffect(() => {
        if (isLoading) {
            const db = getDatabase();
            const starCountRef = ref(db, 'data');
            onValue(starCountRef, (snapshot) => {
                const articlesArray = []
                snapshot.forEach((childSnapshot) => {
                    const information = childSnapshot.val();
                    articlesArray.push({
                        full_name: information.full_name,
                        email: information.email,
                        country_of_origin: information.country_of_origin,
                        birth_date: information.birth_date
                    })
                    
                    setDatas([...articlesArray]);
                })
            });
            setIsLoading(false);
        }
    }, [isLoading]);

    const info = data.map((info) =>
        <>
            {
                <>
                <tr className='Row'>
                    <td>{info.full_name}</td>
                    <td>{info.email}</td>
                    <td>{info.birth_date}</td>
                    <td>{info.country_of_origin}</td>
                </tr>
                
                </>
            }
        </>
    )    
    
    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <>
            <div className='Header'>
                <h1>DATOS RECIBIDOS</h1>
            </div>
            <div>
                <table className='Table'>
                    <thead>
                    <tr>
                            <th>Nombre Completo</th>
                            <th>Correo Electrónico</th>
                            <th>Fecha de Nacimiento</th>
                            <th>País de Origen</th>
                        </tr>
                    </thead>
                    <tbody>
                    {info}
                    </tbody>
                </table>
                
            </div>
        </>
    )
}

export default ViewData;


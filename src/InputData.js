import './App.css';
import { useState, useEffect } from 'react'
import { getDatabase, onValue, ref, set, push } from "firebase/database";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function InputData() {

    const [isLoading, setIsLoading] = useState(true)
    const [inputs, setInpunts] = useState([])
    const [datos, setDatos] = useState({
        full_name: '',
        email: '',
        birth_date: '',
        country_of_origin: '',
        terms_and_conditions: false
    });
    const MySwal = withReactContent(Swal);
    const handlerInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const sendForm = (event) => {
        event.preventDefault()
        const db = getDatabase();
        const postListRef = ref(db, 'data');
        const newPostRef = push(postListRef);
        if (event.target.terms_and_conditions.checked == true && datos.full_name != "" && datos.email != "" && datos.birth_date != "" && datos.country_of_origin != '') {
            set(newPostRef, {
                full_name: datos.full_name,
                email: datos.email,
                birth_date: datos.birth_date,
                country_of_origin: datos.country_of_origin
            });

            MySwal.fire({
                title: <strong>Challenge greydive.</strong>,
                html: <p>Enviando los datos:<br></br>
                    <ul>
                        <li>Nombre: {datos.full_name}</li>
                        <li>Email: {datos.email}</li>
                        <li>Fecha Nacimiento: {datos.birth_date}</li>
                        <li>País: {datos.country_of_origin}</li>
                    </ul>
                </p>,
                icon: 'success',
                footer: <a href='/views'>Click aquí para ir a ver los datos enviados</a>
            })

            event.target.reset();
        }
    }

    useEffect(() => {
        if (isLoading) {
            const db = getDatabase();
            const starCountRef = ref(db, 'items');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setInpunts(
                    data.map((d) => ({
                        label: d.label,
                        name: d.name,
                        options: d.options,
                        required: d.required,
                        type: d.type
                    }))
                )
            });
            setIsLoading(false);
        }

    }, [])
    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    const formulario = inputs.map((data) =>
    <>
        {
            data.type == "select"
                ?
                <>
                    <label className='Form-info'>{data.label}</label>
                    <select name={data.name} onChange={handlerInputChange}>
                        <option value="">Seleccione un país</option>
                        {
                            data.options.map((option) =>
                                <option value={option.value}>{option.label}</option>
                            )
                        }
                    </select>
                </>
                :
                data.type == "submit" ?
                    <>
                        <input type={data.type} name={data.name} value={data.label} onChange={handlerInputChange} required={data.required} />
                    </>
                    :
                    data.type == "checkbox"
                        ?
                        <>
                            <label className='Form-info'>{data.label}<input type={data.type} name={data.name} onChange={handlerInputChange} required={data.required} /></label>

                        </>
                        :
                        <>
                            <label className='Form-info'>{data.label}</label>
                            <input type={data.type} name={data.name} onChange={handlerInputChange} required={data.required} />
                        </>
        }
    </>
)
    return (
        <>
            <div className='Header'>
                <h1>ENCUESTA EN REACT</h1>
            </div>
            <p className='Form-link'>
                <a id='Link' href='/views'>Ver Encuentas</a>
            </p>
            <form className='Form-body' onSubmit={sendForm}>
                {formulario}
            </form>
        </>
    )
}

export default InputData;


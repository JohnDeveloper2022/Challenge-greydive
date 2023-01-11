import logo from './logo.svg';
import './App.css';
import React from 'react';

class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      email: '',
      birth_date: '',
      country_of_origin: '',
      terms_and_conditions: true
    /*value: ''*/};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    this.setState({[name]: value/*value: event.target.value*/});
  }

  handleSubmit(event) {
    alert('tus respuestas fueron enviadas: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className='Header'>
          <h1>ENCUESTA EN REACT</h1>
        </div>
        <form className='Form-body' onSubmit={this.handleInputSubmit}>
          <label className='Form-info'>
            Nombre completo
          </label>
          <input name='full_name' type='text' placeholder='Nombre' value={this.state.full_name} onChange={this.handleInputChange} required={true} />
          <label className='Form-info'>
            Correo electrónico
          </label>
          <input name='email' type='email' placeholder='Email' value={this.state.email} onChange={this.handleInputChange} required={true} />
          <label className='Form-info'>
            Fecha de nacimiento
          </label>
          <input name='birth_date' type='date' value={this.state.birth_date} onChange={this.handleInputChange} required={true} />
          <label className='Form-info'>
            ¿Cuál es tu país de origen?
          </label>
          <select name='country_of_origin' value={this.state.country_of_origin} onChange={this.handleInputChange} required={true}>
              <option value="argentina">Argentina</option>
              <option value="brasil">Brasil</option>
              <option value="chile">Chile</option>
              <option value="colombia">Colombia</option>
              <option value="mexico">México</option>
              <option value="peru">Perú</option>
              <option value="uruguay">Uruguay</option>
              <option value="venezuela">Venezuela</option>
            </select>
          <label className='Form-info'>
            ¿Acepta los términos y condiciones?
            <input name='terms_and_conditions' type='checkbox' checked={this.state.terms_and_conditions} onChange={this.handleInputChange} required={true} />
          </label>
          <label className='Form-info'>
            <input type='submit' value='Enviar' />
          </label>
        </form>
      </div>
    )
  }
}

export default MainForm;

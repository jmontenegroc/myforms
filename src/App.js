import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';

function App() {
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({ emailState: true, passwordState: true });
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  const clickSubmit = () => {
    // Validar los campos solo cuando se hace clic en "Submit"
    const isValidEmail = formValues.email.includes("@");
    const isValidPassword = formValues.password.length >= 9 && /\d/.test(formValues.password) && /[a-zA-Z]/.test(formValues.password);
    setValidationStates({ emailState: isValidEmail, passwordState: isValidPassword });
    setSubmitted(true); // Establecer submitted en true después de hacer clic en "Submit"

    // Enviar formulario solo si todos los campos son válidos
    if (isValidEmail && isValidPassword) {
      alert(JSON.stringify(formValues));
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  };

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            value={formValues.email}
            style={{ borderColor: submitted && !validationStates.emailState ? "red" : "" }} // Cambiar el borde a rojo si el campo no está bien después de hacer clic en "Submit"
          />
          {!validationStates.emailState && <Form.Text className="text-muted">Please enter a valid email address.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={formValues.password}
            style={{ borderColor: submitted && !validationStates.passwordState ? "red" : "" }} // Cambiar el borde a rojo si el campo no está bien después de hacer clic en "Submit"
          />
          {!validationStates.passwordState && <Form.Text className="text-muted">Your password should have at least 9 characters, including numbers and letters.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologias web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;

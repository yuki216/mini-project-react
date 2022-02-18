import { React } from 'react'
import { Button, Container, FormFeedback, Input } from 'reactstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { authRegister } from '../../services/auth'

const validationSchema = yup.object().shape({
  phone_number: yup.string().required(),
  name: yup.string().min(8).required(),
  password: yup.string().min(8).required(),
  retypePassword: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register = ({setCurrentContainer}) => {
  const current = new Date();
  const formik = useFormik({
    initialValues: {
      phone_number: '',
      name: '',
      password: '',
      retypePassword: '',
      address:'',
      join_date:current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate()
    },
    validationSchema: validationSchema,
    onSubmit: () => handleRegister()
  });

  const handleRegister = async (e) => {
    const {code, msg} = await  authRegister(formik.values)
    if(code === 200){
      setCurrentContainer(false);
      alert(msg)
    }else{
      alert(msg)   
    }
  }

  return (
    <Container className="container-register">
      <form onSubmit={formik.handleSubmit}>
        {
          Object.keys(formik.initialValues).map((key, index) => (
            <div key={index} className="row-input">
              <Input
                type={key === "password" || key === "retypePassword" ?  "password" : "text"}
                id={key}
                name={key}
                placeholder={key}
                value={formik.values[key]}
                onChange={formik.handleChange}
                hidden={key==="join_date"?"hidden":""}
                invalid={formik.touched[key] && Boolean(formik.errors[key])}
              />
              {
                formik.touched[key] && Boolean(formik.errors[key]) &&
                <FormFeedback className="error-feedback">{formik.errors[key]}</FormFeedback>
              }
            </div>
          ))
        }
        <Button className="btn-submit" type="submit">
          Register
        </Button>
      </form>
    </Container >
  )
}

export default Register;
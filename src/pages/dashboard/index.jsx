import  {
  useState,
  useEffect
} from "react";
import {
  Button,
  Table
} from 'reactstrap';
import Modal from "../../component/Modal";
import Form from "./form";
import axios from "axios";

const productApiURL = "http://localhost:3001/products";//process.env.REACT_APP_PRODUCT_API_URL;

const Dashboard = () => {

  const [headers, setHeader] = useState([])
  const [data, setData] = useState([]);
  const [actionForm, setActionForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const handleCreate = () => {
    setActionForm("create");
    setModalVisible(true);
  }

  const handleDelete = async (id) => {
    await axios.delete(`${productApiURL}/${id}`)
    .then(() => {
      const updatedData = data.filter(v => id !== v.id);
      setData(updatedData)
    })
    .catch(err => alert(err))
  }

  const handleEdit = (id) => {
    setUpdateId(id)
    setActionForm("edit")
    setModalVisible(true)
  }

  const logout =()=> {
    sessionStorage.removeItem('logged')
    window.location = "/"
  }

  const getData = async () => {
    await axios.get(`${productApiURL}`)
    .then(({data}) => {
      setData(data)
    })
    .catch(err => alert(err))
  }

  useEffect(() => {
    const header = ['No', 'Name', 'Description', 'Price', 'Stock', 'action']
    setHeader(header)
    getData()
  }, [])
//sessionStorage.removeItem('logged')
  return (
    <div className="dashboard-container">
      <h1 className="text-center"> DAFTAR PRODUK</h1>
      <br />
      <Button color="primary" onClick={() => handleCreate()} > Add Data + </Button> 
      <Button color="danger" onClick={() => logout() } > Logout </Button>
      <br />  <br />
      <Table>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <th scope="row">
                {idx + 1}
              </th>
              <td>{row.name}</td>
              <td>{row.description}</td>
              <td>{row.price}</td>
              <td>{row.stock}</td>
              <td>
                <Button onClick={() => handleEdit(row.id)} > Edit</Button>
                  &nbsp;&nbsp;
                <Button color="danger" onClick={() => handleDelete(row.id)} > Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form */}
      <Modal
        title={`Form ${actionForm} Data`}
        isOpen={modalVisible}
        setOpen={setModalVisible}
        children={
          <Form
            action={actionForm}
            data={data}
            setModalVisible={setModalVisible}
            updateId={updateId}
          />
        }
      />
    </div>
  )
}

export default Dashboard;
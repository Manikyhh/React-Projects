import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const [data, setData] = useState([]);
    const location = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err))

    }, []);

    const handleDelete = (id) => {
        const confirm = window.confirm("Would u like to delete?");
        if (confirm) {
            axios.delete('http://localhost:3001/users/' + id)
                .then(res => {
                    // navigate('/');
                    location.reload();
                }).catch(err => console.log(err))
        }
    }
    return (

        <div className="d-flex flex-column align-items-center bg-light vh-100">
            <div className="container text-center">
                <div className="w-100 rounded border shadow bg-white pt-0">
                    <h1 className="mb-2 mt-4">List of Users</h1>
                    <div className="d-flex justify-content-end">
                        <Link to="/create" className="btn btn-success me-4" title="add" > Add +</Link>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr className="text-center fs-sm">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => (
                                <tr key={i} className="text-center">
                                    <td>{i + 1}</td> {/* Serial number: 1, 2, 3, ... */}
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.phone}</td>
                                    <td>
                                        <Link to={`/read/${d.id}`} className="btn btn-secondary me-2" title="Read">Read</Link>
                                        <Link to={`/update/${d.id}`} className="btn btn-primary me-2" title="Edit">Edit</Link>
                                        <button onClick={() => handleDelete(d.id)} className="btn btn-danger" title="Delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )

}
export default Home
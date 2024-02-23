import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
const TableAction = ({ editUrl, id, deleteAction }) => {
    const handleDelete = (e) => {
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              deleteAction(id)
              
            }
          });
    }
    return (<>
        <NavLink to={editUrl} className={'btn btn-sm btn-success rounded-circle me-1'}>
            <i className="fa fa-pen"></i>
        </NavLink>
        <NavLink onClick={handleDelete} to={id} className={'btn btn-sm btn-danger rounded-circle me-1'}>
            <i className="fa fa-trash"></i>
        </NavLink>
    </>)
}
export default TableAction
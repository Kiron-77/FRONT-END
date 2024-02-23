import { Badge } from "react-bootstrap"
const TableStatusComponent = ({ status }) => {
    return (<>
        <Badge bg={`${status === 'active' ? 'success' : 'danger'}`}>
            {
                status === 'active' ? 'Publish' : 'Un-Publish'
            }
        </Badge>
    </>)
}
export default TableStatusComponent
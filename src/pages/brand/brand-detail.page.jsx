import { useParams, useSearchParams } from "react-router-dom"

const BrandDetailPage = () => {
    const params = useParams()
    const [query, setQuery] = useSearchParams()
    console.log(query.get('q'))
    return (<>

    </>)
}
export default BrandDetailPage
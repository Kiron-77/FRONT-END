const TableImage = ({ image }) => {
    const showPlaceholder = (e) => {
      e.target.src ='https://placehold.co/75x50'   
    }
    return (<>
        <img onError={showPlaceholder} src={`${import.meta.env.VITE_IMAGE_URL}/${image}`} alt="" className="img img-fluid banner-small" />
    </>)
}
export default TableImage

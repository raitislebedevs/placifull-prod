
const SubPageHeading = (props) => {
  const { className, children } = props
  return (
    <h3 className={`${className ? className : ''} sub-page-heading`}>
      {children}
    </h3>
  )
}

export default SubPageHeading

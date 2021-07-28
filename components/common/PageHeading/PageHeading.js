
const PageHeading = (props) => {
  const { className, children } = props
  return (
    <h2 className={`${className ? className : ''} page-heading`}>
      {children}
    </h2>
  )
}

export default PageHeading

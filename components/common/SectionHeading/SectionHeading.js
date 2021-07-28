
const SectionHeading = (props) => {
  const { className, children } = props
  return (
    <h4 className={`${className ? className : ''} section-heading`}>
      {children}
    </h4>
  )
}

export default SectionHeading

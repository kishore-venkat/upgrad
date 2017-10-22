export const checkPage = (props, page) => {
  if (props.login) {
    if (props.login !== page) {
      props.history.replace(`/${props.login}`)
    }
  }
}

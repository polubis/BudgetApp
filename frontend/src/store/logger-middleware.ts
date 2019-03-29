
export default ({ getState }: any) => {
  return (next: any) => (action: any) => {


    next(action);


    // if (action.type) {
    //   return returnValue;
    // }



    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    // return returnValue
  }
}
import DrawerLayout from '@/layout/DrawerLayout'

const LoggedInLayout = ({Children : ReactComponent} : any) => {
  return (
    <div>
        <DrawerLayout/>
        <ReactComponent/>
    </div>
  )
}

export default LoggedInLayout
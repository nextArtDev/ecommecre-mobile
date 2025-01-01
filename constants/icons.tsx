import { Feather } from '@expo/vector-icons'

export const icon = {
  index: (props: any) => <Feather name="home" size={24} {...props} />,
  explore: (props: any) => <Feather name="search" size={24} {...props} />,
  notifications: (props: any) => <Feather name="bell" size={24} {...props} />,
  cart: (props: any) => <Feather name="shopping-cart" size={24} {...props} />,
  profile: (props: any) => <Feather name="user" size={24} {...props} />,
}
